import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/ngsw-worker.js').then(() => {
    console.log('Service worker registered successfully!');
  }).catch(error => {
    console.log(error);
  });
}