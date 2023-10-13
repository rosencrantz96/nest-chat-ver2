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
        // 접속한 클라이언트들에 메시지 전송 
        this.server.emit('message', `client-${socket.id.substring(0,4)} : ${data}`,);
    }
}