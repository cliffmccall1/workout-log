import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from '../app/users/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { LogsModule } from './logs/logs.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile-view/profile.component';
import { TimerComponent } from './timer/timer.component';
import { BenchmarkCreateComponent } from './benchmarks/benchmark-create/benchmark-create.component';
import { BenchmarkListComponent } from './benchmarks/benchmark-list/benchmark-list.component';
import { TechniquesComponent } from './techniques/techniques.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { MapComponent } from './map/map.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomepageComponent,
    TimerComponent,
    ProfileComponent,
    AboutComponent,
    BenchmarkCreateComponent,
    BenchmarkListComponent,
    TechniquesComponent,
    ProfileEditComponent,
    MapComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    LogsModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCR6A98I0bE8U9YEyMgetFaHAIuqBLQme0'
    }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
