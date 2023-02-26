import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  emittedValue = new Subject<string>()

  constructor() { }

  setupSocketConnection() {
    this.socket = io('http://localhost:3000');
    this.broadCastListener();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  broadCastListener() {
    this.socket.on('my broadcast', (data: string) => {
      console.log(data)
      this.emittedValue.next(data);
    });
  }

  broadCastEmit(data: string) {
    this.socket.emit('my broadcast', data);
  }
}
