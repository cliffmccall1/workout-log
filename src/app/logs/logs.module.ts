import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LogCreateComponent } from './log-create/log-create.component';
import { LogListComponent } from './log-list/log-list.component';
import { AngularMaterialModule } from '../angular-material.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [LogCreateComponent, LogListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    BrowserModule
  ],
  exports: [LogListComponent]
})
export class LogsModule {}
