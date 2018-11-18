import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './users/auth.guard';

import { LogListComponent } from './logs/log-list/log-list.component';
import { LogCreateComponent } from './logs/log-create/log-create.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile-view/profile.component';
import { AboutComponent } from './about/about.component';
import { TimerComponent } from './timer/timer.component';
import { BenchmarkCreateComponent } from './benchmarks/benchmark-create/benchmark-create.component';
import { TechniquesComponent } from './techniques/techniques.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'log', component: LogListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/benchmarkcreate', component: BenchmarkCreateComponent },
  { path: 'create', component: LogCreateComponent, canActivate: [AuthGuard] },
  {
    path: 'profile-edit',
    component: ProfileEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'techniques',
    component: TechniquesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'timer',
    component: TimerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'map',
    component: MapComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'edit-profile/:profileId',
    component: ProfileEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-log/:logId',
    component: LogCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-benchmark/:benchmarkId',
    component: BenchmarkCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: 'auth', loadChildren: './users/auth.module#AuthModule' },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
