import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DragDropModule} from 'primeng/dragdrop';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ImageModule} from 'primeng/image';
/* import { TablonTareasComponent } from './tablon-tareas/tablon-tareas.component'; */

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { MantenimientoUsuariosComponent } from './usuario/mantenimiento-usuarios/mantenimiento-usuarios.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import FormularioTareasComponent from './formularioTareas/formulario-tareas/formulario-tareas.component';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    /* TablonTareasComponent, */
    MantenimientoUsuariosComponent,
    FormularioTareasComponent
  ],
  imports: [
    BrowserModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    ImageModule,
    ConfirmDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    DragDropModule,
    FormsModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
