import { Component, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
import { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent';
import { TareasService } from '../services/tareas.service';
import { ITarea } from './tarea.interface';

@Component({
  selector: 'app-tablon-tareas',
  templateUrl: './tablon-tareas.component.html',
  styleUrls: ['./tablon-tareas.component.css']
})
export class TablonTareasComponent implements OnInit {
  usuario!: User;
  tarea: ITarea = {
    nombre: '',
    especificacion: '',
    estado: '',
    porcentaje: 0,
    realizado: false,
  }


  nueva: boolean = true;

  tareasDisponibles: ITarea[] = [];

  tareasSeleccionadas: ITarea[] = [];

  draggedTarea!: ITarea | null;

  display: boolean = false;

  constructor(private tareasService: TareasService, private confirmationService: ConfirmationService, private fireAuth: Auth, private router: Router) {

  }

  ngOnInit(): void {
    this.usuario = this.fireAuth.currentUser!;
    if (!this.usuario) {
      this.router.navigateByUrl('login');
    }
    this.tareasSeleccionadas = [];
        this.tareasService.getTareas().subscribe((tareas:ITarea[])=>{
          console.log(tareas);
          this.tareasDisponibles = tareas;
        })
      }
 dragStart(event:any,tarea: ITarea) {
    this.draggedTarea = tarea;
}

 drop(event:any) {
    if (this.draggedTarea) {
        let draggedTareaIndex = this.findIndex(this.draggedTarea);
        this.tareasSeleccionadas = [...this.tareasSeleccionadas, this.draggedTarea];
        this.tareasDisponibles = this.tareasDisponibles.filter((val,i) => i!=draggedTareaIndex);
        this.draggedTarea = null;
    }
}
dragEnd(event:any) {
  this.draggedTarea = null;
}

async agregarTarea(tarea: ITarea) {
  tarea.usuario=this.fireAuth.currentUser.email
  await this.tareasService.addTarea(tarea)
  this.confirmationService.confirm({
    message: 'Tarea creada correctamente',
    header: 'OK',
    icon: 'pi pi-check'});
}

async modificarTarea(tarea: ITarea) {}

findIndex(tarea: ITarea) {
  let index = -1;
  for(let i = 0; i < this.tareasDisponibles.length; i++) {
      if (tarea.id === this.tareasDisponibles[i].id) {
          index = i;
          break;
      }
  }
  return index;
}

showDialog() {
    this.display = true;
}

//DAR FUNCIONALIDAD PARA QUE COJA LAS TAREAS Y LAS AGRUEGUE/MODIFIQUE
agregarTareaFirebase(tarea: ITarea){


}
modificarTareaFirebase(tarea: ITarea){

}


}
