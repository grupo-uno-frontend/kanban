import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ITarea } from 'src/app/tablon-tareas/tarea.interface';

@Component({
  selector: 'app-formulario-tareas',
  templateUrl: './formulario-tareas.component.html',
  styleUrls: ['./formulario-tareas.component.css'],
})
export default class FormularioTareasComponent implements OnInit {
  @Input() tarea!: ITarea; //ahí estamos pasándole la tarea vacía
  @Input() nueva!: boolean;
  @Output() tareaNueva = new EventEmitter<ITarea>();
  @Output() tareaModificada = new EventEmitter<ITarea>();

  constructor(private confirmationService: ConfirmationService) {
    this.tarea = {
      nombre: '',
      especificacion: '',
      estado: '',
      realizado: false,
      fecha: new Date(),
    };
  }

  ngOnInit(): void {}
  guardarTarea(f: NgForm) {
    if (f.valid) {
      if (this.nueva) {
        this.tareaNueva.emit(this.tarea);
      } else {
        this.tareaModificada.emit(this.tarea);
      }
      f.reset();
    }
  }
}
