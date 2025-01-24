import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect base URL to login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'not-found', component: NotFoundComponent }, // Separate NotFound route
  { path: '**', redirectTo: 'not-found' }, // Catch-all for unknown routes
];
