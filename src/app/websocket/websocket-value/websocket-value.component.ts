import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-websocket-value',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './websocket-value.component.html',
  styleUrls: ['./websocket-value.component.scss']
})
export class WebsocketValueComponent {

  LatestVals:string[] = []
  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.emittedValue.subscribe((data: string) => {
      this.LatestVals.push(data)
    })
  }

}
