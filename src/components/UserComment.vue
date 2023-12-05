<template>
  <div class="col-12 container">
    <h2 class="header">실시간 댓글</h2>
    <div class="col-12 chat_container">
      <TransitionGroup name="list" id="chat-messages" tag="ul">
        <li v-for="message in messages" :key="message.id" class="col-12 chating" :class="{ 'active': message.active }">
          <strong>{{ message.username }}:</strong> {{ message.message }}
        </li>
      </TransitionGroup>
    </div>
    <form @submit.prevent="enterUsername" class="input_form">
      <input v-model="usernameInput" type="text" autocomplete="off" class="form-control" id="user_name" placeholder="Username" aria-label="Username">
      <input v-model="messageInput" type="text" id="user_message" autocomplete="off" class="form-control" placeholder="Usermessage" aria-label="Usermessage">
      <button class="btn btn-primary submit" type="submit"></button>
    </form>
  </div>
</template>
  
<script>
import io from 'socket.io-client';
export default {
  data() {
    return {
      messages: [],
      messageInput: '',
      usernameInput: '',
      username: '',
      socket: null
    };
  },
  methods: {
    beforeMessages() {
      this.socket = io('http://localhost:3000');

      this.socket.on('before messages', (beforeMessages) => {
        this.messages = beforeMessages.map((message) => ({ ...message, active: true, id: uniqueId() }));
      });
    },
    enterUsername() {
      if (this.usernameInput.trim() != '') {
        this.username = this.usernameInput;
        // 최초 한 번만 리스너 등록
        if (!this.chatMessageListener) {
          this.chatMessageListener = (data) => {
            this.messages.unshift({ ...data, active: true, id: uniqueId() });
            this.msgBottom();
          };

          this.socket.on('chat message', this.chatMessageListener);
        }
        this.socket.emit('new user', this.username);
        this.sendMessage();
      } else if (this.usernameInput.trim() == '') {
        alert("닉네임을 입력해주세요.");
      }
    },
    sendMessage() {
      if (this.messageInput.trim() != '' && this.username.trim() != '') {
        this.socket.emit('chat message', { message: this.messageInput, username: this.username, id: uniqueId() });
        this.messageInput = '';
        this.usernameInput = '';
      } else if (this.messageInput.trim() == '') {
        alert("내용을 입력해주세요.");
      }

    },
    msgBottom() {
      let div = document.getElementById("chat-messages");
      div.scrollTop = div.scrollHeight;
    },
  },
  mounted() {
    this.beforeMessages();
  }
};

function uniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
</script>
  
   
<style>
.list-move,
/* 움직이는 엘리먼트에 트랜지션 적용 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
.container{
  margin-top: 100px;
}
.header {
  text-align: center;
  margin-bottom: 30px;
}

#chat-messages::-webkit-scrollbar {
  width: 10px;
}

#chat-messages::-webkit-scrollbar-thumb {
  background: rgb(6, 46, 156);
  /* 스크롤바 색상 */
  border-radius: 10px;
  /* 스크롤바 둥근 테두리 */
}

#chat-messages::-webkit-scrollbar-track {
  background: rgba(220, 20, 60, .1);
  /*스크롤바 뒷 배경 색상*/
}

.chat_container {
  height: 250px;
  position: relative;
}

#chat-messages {
  width: 100%;
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-direction: column-reverse;
  list-style-type: none;
  overflow-y: auto;
  height: 250px;
  transition: transform 0.3s ease-in-out;
}
.chat_container:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 50%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  z-index: 1; /* 내용 위에 적용되도록 */
}
#chat-messages li {
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.input_form{
  display: flex;

}

#user_name{
  width: 20%;
}
#user_message{
  width: 75%;
}
.chating {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.submit{
  width: 50px;
  height: 50px;
  background-image: url("/src/assets/arrow-line.png");
  background-repeat : no-repeat;
  background-position : center;
  
}
.chating.active {
  opacity: 1;
  transform: translateY(0);
}
</style>