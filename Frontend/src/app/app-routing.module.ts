import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { LoginComponent } from './views/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
      {
        path: 'dashboard',
        loadChildren: () => import('../app/views/dashboard/dashboard.module').then(m => m.DashboardModule),
        // canActivate: [RoleGuard],
        // data: {roles: [Role.Admin,Role.Inspector,Role.Customer]},
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
