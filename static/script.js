const socket = io('http://localhost:3000/chat'); // 네임스페이스 추가
const nickname = prompt('닉네임을 입력해주세요.'); // 닉네임 입력받기
socket.on('connect', () => {
  console.log('connected');
});

function sendMessage() {
  const message = $('#message').val();
  $('#chat').append(`<div>나 : ${message}</div>`); // 내가 보낸 메시지 바로 추가
  socket.emit('message', { message, nickname }); // 메시지 보낼 때 닉네임 같이 전송
}

socket.on('message', (message) => {
  $('#chat').append(`<div>${message}</div>`);
});
