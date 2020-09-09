import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { RouteGuardProtectedService } from './service/guards/route-guard-protected.service';
import { RouteGuardPublicService } from './service/guards/route-guard-public.service';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [RouteGuardPublicService] },
  { path: 'login', component: LoginComponent, canActivate: [RouteGuardPublicService] },
  { path: 'home', component: HomeComponent, canActivate: [RouteGuardProtectedService] },
  { path: 'profile', component: HomeComponent, canActivate: [RouteGuardProtectedService] },
  { path: 'orders', component: HomeComponent, canActivate: [RouteGuardProtectedService] },
  { path: 'checkout', component: HomeComponent, canActivate: [RouteGuardProtectedService] },
  { path: 'sign-up', component: RegisterComponent, canActivate: [RouteGuardPublicService] },
  
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
