import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EditComponent } from './components/edit/edit.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { 
    path: 'users', 
    loadComponent: () => import('./components/users/users.component').then(m => m.UsersComponent) 
  },
  { 
    path: 'user/:id',
    loadComponent: () => import('./components/user-profile/user-profile.component').then(m => m.UserProfileComponent)
  },
  { path: 'login', component: LoginComponent },
  { 
    path: 'create', 
    loadComponent: () => import('./components/create/create.component').then(m => m.CreateComponent)
  },
  { 
    path: 'edit',
    loadComponent: () => import('./components/edit/edit.component').then(m => m.EditComponent)
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
