# 공식적인 Node.js 런타임을 부모 이미지로 사용
FROM node:18

# 작업 디렉토리를 /socketio으로 설정
WORKDIR /radiation

# package.json 및 package-lock.json을 작업 디렉토리로 복사
COPY package*.json ./

# 어플리케이션 종속성 설치
RUN npm install

# 어플리케이션 소스를 번들로 복사
COPY . .

# 어플리케이션이 실행 중인 포트를 노출
EXPOSE 3000

# 어플리케이션 시작
CMD ["node", "server.js"]
