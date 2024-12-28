import { Component } from '@angular/core';
import { WeightHistoryComponent } from '../weight-history/weight-history.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-weight-main',
  imports: [WeightHistoryComponent, RouterLink],
  templateUrl: './weight-main.component.html',
  styleUrl: './weight-main.component.css'
})
export class WeightMainComponent {

}
