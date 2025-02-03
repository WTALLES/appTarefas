import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';


import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  // src/app/app.module.ts

    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      ReactiveFormsModule,
      MatCardModule,
      MatTableModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      MatSelectModule,
      CdkDropListGroup,
      CdkDropList,
      CdkDrag,
      AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
export class AppModule { }
