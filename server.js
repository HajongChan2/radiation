const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*', // 클라이언트 주소
        methods: ['GET', 'POST'],
    },
});
const mysql = require('mysql2');
require('dotenv').config()

const PORT = process.env.PORT;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

app.use(express.static(path.join(__dirname, 'dist')));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});
app.get('/login', (req, res) => {
    const filePath = __dirname + '/src/login.html';
    res.sendFile(filePath);
});
const users = {};
let before_messages = {};



io.on('connection', (socket) => {
    console.log('클라이언트가 소켓에 연결되었습니다.');
    connection.connect((err) => {
        if (err) {
            console.error('MySQL 연결 오류:', err);
            return;
        }

        // 서버 시작 시 실행할 초기화 쿼리
        connection.query('SELECT * FROM messages ORDER BY num DESC', (err, results) => {
            if (err) {
                console.error('SELECT 쿼리 실행 중 오류:', err);
            } else {
                // 쿼리 결과를 before_messages에 저장 후 새로운 사용자에게 이전 메시지를 전송
                before_messages = results;
                socket.emit('before messages', before_messages);
            }
        });
    });
    socket.on('new user', (username) => {
        users[socket.id] = username;
        console.log(username + ' 사용자가 연결되었습니다.');
    });


    socket.on('disconnect', () => {
        console.log('사용자가 연결을 끊었습니다.');
        delete users[socket.id];
    });

    // 클라이언트에서 보낸 채팅 메시지 수신
    socket.on('chat message', (data) => {
        // 채팅 기록을 MariaDB에 저장
        connection.execute(
            'INSERT INTO messages (username, message) VALUES (?, ?)',
            [users[socket.id], data.message],
            (err, results) => {
                if (err) {
                    console.error('Error saving message to database:', err);
                } else {
                    console.log(users[socket.id] + ' 사용자가 채팅을 시작');
                    io.emit('chat message', { username: users[socket.id], message: data.message });
                }
            }
        );
    });
});
io.on('error', (err) => {
    console.error(`[${new Date()}] [MySQL] Connection error: ${err.message}`);
});
http.listen(PORT, () => {
    console.log(`${PORT}`);
});
