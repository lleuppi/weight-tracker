import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ConnectionStatusComponent } from "./connection-status/connection-status.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConnectionStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weight-tracker';

  constructor(private auth: AuthService) {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (!isAuthenticated){
        auth.loginWithRedirect();
      }
    });
  }
}
