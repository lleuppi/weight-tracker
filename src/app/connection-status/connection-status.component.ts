import { Component } from '@angular/core';
import { ConnectionCheckingService } from '../services/ConnectionCheckingService';

@Component({
  selector: 'app-connection-status',
  imports: [],
  templateUrl: './connection-status.component.html',
  styleUrl: './connection-status.component.css'
})
export class ConnectionStatusComponent {
  isOnline: Boolean = true;

  constructor(private connectionCheckingService: ConnectionCheckingService) {
    connectionCheckingService
      .IsOnline()
      .subscribe(isOnline => this.isOnline = isOnline);
  }
}
