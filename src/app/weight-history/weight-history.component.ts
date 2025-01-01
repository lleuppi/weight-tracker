import { Component } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TrackedWeight } from '../../types/TrackedWeight';
import { WeightTrackingStore } from '../services/WeightTrackingStore'
import { Router } from '@angular/router';
import { neon } from '@neondatabase/serverless';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-weight-history',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './weight-history.component.html',
  styleUrl: './weight-history.component.css'
})
export class WeightHistoryComponent {
  trackedWeights: TrackedWeight[] = [];
  isAuthenticated: boolean = false;
  user: User = null!;

  #listTrackedWeights() {
    this.weightTrackingStore
      .list()
      .subscribe((trackedWeights) => this.trackedWeights = trackedWeights);
  }

  constructor(private weightTrackingStore: WeightTrackingStore, private router: Router, private auth: AuthService) {
    auth.isAuthenticated$
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated
        if (this.isAuthenticated) {
          auth.getAccessTokenSilently().subscribe(accessToken => {
            // this.authtest(accessToken);
          });
          auth.user$.subscribe(user => {
            if (user != null) {
              this.user = user;
            }
          });
        }
      });
    this.#listTrackedWeights();
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout();
  }

  authtest(accessToken: string) {
    let db_authenticated_url = 'postgresql://authenticated@ep-shy-river-a2phnrvi.eu-central-1.aws.neon.tech/neondb?sslmode=require'
    const sql = neon(db_authenticated_url, {
      authToken: accessToken
    });

    console.log('Requesting')
    sql('select * from mytable').then(response => {
      console.log(response)
    });
  }

  handleEdit(id: number) {
    this.router.navigate([`edit-weight/${id}`]);
  }

  sortByDate() {
    const isAscending = this.trackedWeights[0].trackedAt > this.trackedWeights[1].trackedAt;
    this.trackedWeights.sort((first, second) => {
      const firstDate = new Date(first.trackedAt);
      const secondDate = new Date(second.trackedAt);
      const firstDateValue = firstDate.getFullYear() + firstDate.getMonth() + firstDate.getDate();
      const secondDateValue = secondDate.getFullYear() + secondDate.getMonth() + secondDate.getDate();

      if (isAscending) {
        return firstDateValue - secondDateValue;
      }
      else {
        return secondDateValue - firstDateValue;
      }
    })
  }

  sortByWeight() {
    const isAscending = this.trackedWeights[0].weight > this.trackedWeights[1].weight;
    this.trackedWeights.sort((first, second) => {
      if (isAscending) {
        return first.weight - second.weight;
      }
      else {
        return second.weight - first.weight;
      }
    });
  }

  handleDelete(id: number) {
    this.weightTrackingStore
      .delete(id)
      .subscribe(() => this.#listTrackedWeights());
  }
}
class tabletan {
  id: number = 0;
  column_1: string = ''
}