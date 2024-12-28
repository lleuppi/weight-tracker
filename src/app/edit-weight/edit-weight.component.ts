import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WeightTrackingStore } from '../services/WeightTrackingStore';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-weight',
  imports: [RouterLink, ReactiveFormsModule, DatePipe],
  templateUrl: './edit-weight.component.html',
  styleUrl: './edit-weight.component.css'
})
export class EditWeightComponent {
  id: number = 0;
  date: Date = null!;
  editWeightForm: FormGroup = new FormGroup({
    weight: new FormControl('', [Validators.required, Validators.min(0.0), Validators.max(100.0)]),
  });

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private weightTrackingStore: WeightTrackingStore) {
    const idReceived = activatedRoute.snapshot.paramMap.get('id');
    if (idReceived === null) {
      router.navigate(['']);
    }

    this.id = Number.parseInt(idReceived!);
    weightTrackingStore.get(this.id).subscribe({
      next: trackedWeight => {
        this.editWeightForm.disable();
        this.editWeightForm.setValue({ weight: trackedWeight.weight })
        this.date = trackedWeight.trackedAt;
        this.editWeightForm.enable();
      },
      error: () => router.navigate([''])
    });
  }

  handleSubmit() {
    this.editWeightForm.disable();

    // Check if object with this id exists
    this.weightTrackingStore.get(this.id).subscribe({
      next: trackedWeight => {
        trackedWeight.weight = this.editWeightForm.value.weight;
        this.weightTrackingStore
        .update(trackedWeight)
        .subscribe({
          next: () => {
            this.editWeightForm.enable();
            this.router.navigate([`edit-weight/${this.id}`]);
          },
          error: () => {
            alert('Unexpected error, please try again.');
            this.editWeightForm.enable();
            this.router.navigate([`edit-weight/${this.id}`]);
          }
        });
      },
      error: () => {
        alert('This item does not exist. Click ok to be redirected.')
        this.router.navigate(['']);
      }
    });
  }
}
