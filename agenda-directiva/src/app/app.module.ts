import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DragDropModule} from 'primeng/dragdrop';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { TablonTareasComponent } from './tablon-tareas/tablon-tareas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TablonTareasComponent
  ],
  imports: [
    BrowserModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
