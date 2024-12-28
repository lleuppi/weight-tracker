import { Routes } from '@angular/router';
import { AddWeightComponent } from './add-weight/add-weight.component';
import { WeightMainComponent } from './weight-main/weight-main.component';
import { EditWeightComponent } from './edit-weight/edit-weight.component';

export const routes: Routes = [
    {
        title: 'Home',
        path: '',
        component: WeightMainComponent
    },
    {
        title: 'Add weight',
        path: 'add-weight',
        component: AddWeightComponent
    },
    {
        title: 'Edit weight',
        path: 'edit-weight/:id',
        component: EditWeightComponent
    }
];
