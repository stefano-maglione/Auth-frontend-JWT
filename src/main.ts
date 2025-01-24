import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './app/auth/jwt.interceptor';

// Bootstrap the app with all necessary providers and imports
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withHashLocation()),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
