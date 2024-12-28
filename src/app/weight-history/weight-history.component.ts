import { Component } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TrackedWeight } from '../../types/TrackedWeight';
import { WeightTrackingStore } from '../services/WeightTrackingStore'
import { Router } from '@angular/router';

@Component({
  selector: 'app-weight-history',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './weight-history.component.html',
  styleUrl: './weight-history.component.css'
})
export class WeightHistoryComponent {
  trackedWeights: TrackedWeight[] = [];

  #listTrackedWeights() {
    this.weightTrackingStore
      .list()
      .subscribe((trackedWeights) => this.trackedWeights = trackedWeights);
  }

  constructor(private weightTrackingStore: WeightTrackingStore, private router: Router) {
    this.#listTrackedWeights();
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
