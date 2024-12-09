import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './main/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './shared/interceptor/auth.interceptor';
import {NoteComponent} from './main/notes/note.component';
import {NoteDialogComponent} from './main/notes/dialog/note-dialog.component';
import {MatDialogActions, MatDialogContent} from '@angular/material/dialog';
import {MatCellDef, MatHeaderCellDef, MatTable, MatTableModule} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ToolbarComponent} from './shared/components/toolbar/toolbar.component';
import {ConfirmDialogComponent} from './shared/components/confirm-dialog/confirm-dialog.component';
import {NgxEditorModule} from 'ngx-editor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoteComponent,
    NoteDialogComponent,
    ToolbarComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogContent,
    MatDialogActions,
    MatTable,
    MatIcon,
    MatHeaderCellDef,
    MatCellDef,
    MatTableModule,
    MatToolbarModule,
    NgxEditorModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
