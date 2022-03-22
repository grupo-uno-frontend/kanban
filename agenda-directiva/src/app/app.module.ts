import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DragDropModule} from 'primeng/dragdrop';
import {TableModule} from 'primeng/table';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ImageModule} from 'primeng/image';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { MantenimientoUsuariosComponent } from './usuario/mantenimiento-usuarios/mantenimiento-usuarios.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TablonTareasComponent } from './tablon-tareas/tablon-tareas.component';
import FormularioTareasComponent from './formularioTareas/formulario-tareas/formulario-tareas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';
import {DialogModule} from 'primeng/dialog';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TablonTareasComponent,
    MantenimientoUsuariosComponent,
    FormularioTareasComponent,
  ],
  imports: [
    BrowserModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    ImageModule,
    DialogModule,
    FormsModule,
    TableModule,//borrar si no se utiliza
    ConfirmDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    DragDropModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
