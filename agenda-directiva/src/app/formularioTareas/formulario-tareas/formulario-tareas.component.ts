import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITarea } from 'src/app/tablon-tareas/tarea.interface';


@Component({
  selector: 'app-formulario-tareas',
  templateUrl: './formulario-tareas.component.html',
  styleUrls: ['./formulario-tareas.component.css']
})
export default class FormularioTareasComponent implements OnInit {
  @Input() tarea!: ITarea;
  @Input() nueva!: boolean;
  @Output() tareaNueva = new EventEmitter<ITarea>();
  @Output() tareaModificada = new EventEmitter<ITarea>();


  constructor() {this.tarea = {
      nombre: '',
      especificacion: '',
      estado: '',
      porcentaje: 0,
      realizado: false,
    } }

  ngOnInit(): void {}
  guardarTarea() {

    if (this.nueva) {
      this.tareaNueva.emit(this.tarea);
    } else {
      this.tareaModificada.emit(this.tarea);
    }}

  }
}
