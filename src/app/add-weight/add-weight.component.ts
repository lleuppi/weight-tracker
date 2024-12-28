import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { WeightTrackingStore } from '../services/WeightTrackingStore';
import { TrackedWeight } from '../../types/TrackedWeight';

@Component({
  selector: 'app-add-weight',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-weight.component.html',
  styleUrl: './add-weight.component.css'
})
export class AddWeightComponent {
  // Used for setting default when creating and as max value
  currentDate = '';
  addWeightForm: FormGroup = new FormGroup({
    weight: new FormControl('', [Validators.required, Validators.min(0.0), Validators.max(100.0)]),
    trackedAt: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private weighTrackingStore: WeightTrackingStore) {
    const date = new Date();
    this.currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    this.weighTrackingStore
      .getLatest()
      .subscribe(trackedWeight => {
        const weight: number = trackedWeight === undefined ? 0 : trackedWeight.weight;
        this.addWeightForm.setValue({ 'weight': weight, 'trackedAt': this.currentDate })
      });
  }

  handleSubmit() {
    const trackedWeight = new TrackedWeight(this.addWeightForm.value.weight, this.addWeightForm.value.trackedAt);
    this.weighTrackingStore
      .add(trackedWeight)
      .subscribe({
        complete: () => this.router.navigate(['']),
        error: (error: Error) => alert(error.message)
      });
  }
}