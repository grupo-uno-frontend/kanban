import { Component, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { ConfirmationService, MenuItem } from 'primeng/api';
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
    realizado: false
  }
  items: MenuItem[];


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
      //dragStart -> almacenamos la info de la tarea que queremos mover
 dragStart(event:any,tarea: ITarea) {
    this.draggedTarea = tarea;
}

//el drop -> primero cambiamos el estado de realizado, lo actualizamos y se borran los datos guardados para poder guardar otros. (Otra tarea)
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
//aquí se "formatea" la info guardada en la variable. Uso: soltamos una tarea sin que se guarde en otro contenedor, como si me hubiera equivocado. No se actualiza la tarea pero se deja libre la variable.
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

modificarTarea(tarea: ITarea) {
  this.nueva = false;
  this.tarea = tarea;
    }

async modificarTareaFirebase(tarea: ITarea) {
      await this.tareasService.updateTarea(tarea);
      alert(this.tarea.nombre + ' ha sido modificado');
    }


async borrarTarea(tarea: ITarea) {
  this.tarea = delete.tarea

}
async eliminarTareaFirebase(tarea: ITarea) {
  if (confirm(`¿Estás seguro de eliminar a ${tarea.nombre}?`)) {
    await this.tareasService.deleteTarea(tarea);
    alert(this.tarea.nombre + ' ha sido eliminado');
    this.agregarTarea(this.tarea);
  }


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
    this.display = true;//Esto saca la ventana modal
    this.tarea = {//con this.tarea es una tarea vacía para pasarsela al formulario
      nombre: '',
      especificacion: '',
      estado: '',
      realizado: false
    }
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
cerrarSesion(){
  // El método signOut cierra sesión
  this.fireAuth.signOut();
  // Después de cerrar sesión, dirigimos al usuario a la pantalla de login
  this.router.navigateByUrl('/login');

}

}
