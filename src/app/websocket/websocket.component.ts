import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from './socket.service';
import { WebsocketValueComponent } from './websocket-value/websocket-value.component';

@Component({
  selector: 'app-websocket',
  standalone: true,
  imports: [CommonModule, WebsocketValueComponent],
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent implements OnInit {
  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>;

  constructor(private socketService: SocketService) {}
  
  ngOnInit() {
    this.socketService.setupSocketConnection();
  }

  broadCast(value: string) {
    if(value) {
      this.socketService.broadCastEmit(value)
      this.inputRef.nativeElement.value = ''
    }
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
