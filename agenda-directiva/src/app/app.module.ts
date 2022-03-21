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
import { TablonTareasComponent } from './tablon-tareas/tablon-tareas.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { MantenimientoUsuariosComponent } from './usuario/mantenimiento-usuarios/mantenimiento-usuarios.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import FormularioTareasComponent from './formularioTareas/formulario-tareas/formulario-tareas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TablonTareasComponent,
    MantenimientoUsuariosComponent,
    FormularioTareasComponent
  ],
  imports: [
    BrowserModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    ImageModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    DragDropModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
