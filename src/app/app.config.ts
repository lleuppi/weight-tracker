import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { RequireAuthentication } from './auth/RequireAuthentication';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-yy0af44mmmff05v3.eu.auth0.com',
      clientId: 'Gel6XjnsCkl6ad0Oi786JZZFnKlPUvHD',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-yy0af44mmmff05v3.eu.auth0.com/api/v2/'
      }
    }),
    RequireAuthentication
  ]
};
