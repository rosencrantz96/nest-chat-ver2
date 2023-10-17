import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' }) // 웹소켓 서버 설정 데코레이터
export class ChatGateway {
    @WebSocketServer() server: Server; // 웹소켓 서버 인스턴스 선언

    @SubscribeMessage('message') // message 이벤트 구독
    handleMessage(socket: Socket, data: any): void {
        const { message, nickname } = data; // 메시지와 닉네임을 데이터에서 추출
        // 닉네임을 포함한 메시지 전송
        socket.broadcast.emit('message', `${nickname}: ${message}`);
    }
}