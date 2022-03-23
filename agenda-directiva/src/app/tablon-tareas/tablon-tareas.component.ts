import { Component, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
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

  tareasFinalizadas: ITarea[] = [];

  draggedTarea!: ITarea | null;

  display: boolean = false;

  constructor(private tareasService: TareasService, private confirmationService: ConfirmationService, private fireAuth: Auth, private router: Router) {

  }

  ngOnInit(): void {
    this.usuario = this.fireAuth.currentUser!;
    /* if (!this.usuario) {
      this.router.navigateByUrl('login');
    } */
    this.tareasDisponibles = [];
        this.tareasService.getTareas(this.usuario.displayName).subscribe((tareas:ITarea[])=>{
          console.log(tareas);
          this.tareasDisponibles = tareas;
        })
        this.tareasFinalizadas = [];
        this.tareasService.getTareasFinalizadas(this.usuario.displayName).subscribe((tareas:ITarea[])=>{
          console.log(tareas);
          this.tareasFinalizadas = tareas;
        })
      }
      //De tareas disponibles a tareas finalizadas.
 dragStart(event:any,tarea: ITarea) {
    this.draggedTarea = tarea;
}

 drop(event:any) {
    if (this.draggedTarea) {
        /* let draggedTareaIndex = this.findIndex(this.draggedTarea);
        this.tareasFinalizadas = [...this.tareasFinalizadas, this.draggedTarea];
        this.tareasDisponibles = this.tareasDisponibles.filter((val,i) => i!=draggedTareaIndex);
        this.draggedTarea = null; */
        this.draggedTarea.realizado = true;
        this.tareasService.updateTarea(this.draggedTarea);
        console.log(this.draggedTarea);
        this.draggedTarea = null;
    }
}
dragEnd(event:any) {
  this.draggedTarea = null;
}

//de finalizadas a en curso
redragStart(event:any,tarea: ITarea) {
  this.draggedTarea = tarea;
  console.log(this.draggedTarea);
}

redrop(event:any) {
  if (this.draggedTarea) {
      /* let draggedTareaIndex = this.findIndex(this.draggedTarea);
      this.tareasFinalizadas = [...this.tareasFinalizadas, this.draggedTarea];
      this.tareasDisponibles = this.tareasDisponibles.filter((val,i) => i!=draggedTareaIndex);
      this.draggedTarea = null; */
      this.draggedTarea.realizado = false;
      this.tareasService.updateTarea(this.draggedTarea);
      console.log(this.draggedTarea)
      this.draggedTarea = null;

  }
}
redragEnd(event:any) {
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
console.log(tarea);
tarea.usuario = this.usuario.displayName;
this.tareasService.addTarea(tarea);
this.display=false; //para quitar la pantalla modal
}
modificarTareaFirebase(tarea: ITarea){

}


}
