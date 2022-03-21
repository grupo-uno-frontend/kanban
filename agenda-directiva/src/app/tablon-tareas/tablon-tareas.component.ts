import { Component, OnInit } from '@angular/core';
import { TareasService } from '../services/tareas.service';
import { ITarea } from './tarea.interface';

@Component({
  selector: 'app-tablon-tareas',
  templateUrl: './tablon-tareas.component.html',
  styleUrls: ['./tablon-tareas.component.css']
})
export class TablonTareasComponent implements OnInit {
  tarea: ITarea = {
    nombre: '',
    especificacion: '',
    estado: '',
    porcentaje: 0,
    realizado: false,
  }
  tareasDisponibles: ITarea[] = [];

  tareasSeleccionadas: ITarea[] = [];

  draggedTarea!: ITarea | null;

  constructor(private tareasService: TareasService) {

  }

  ngOnInit(): void {
    this.tareasSeleccionadas = [];
        this.tareasService.getTareas().subscribe((tareas:ITarea[])=>{
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
}


