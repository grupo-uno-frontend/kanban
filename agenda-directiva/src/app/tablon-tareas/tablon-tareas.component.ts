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

  draggedTarea!: ITarea;

  constructor(private tareasService: TareasService) {

  }

  ngOnInit(): void {
    this.tareasSeleccionadas = [];
        this.tareasService.getTareasSmall().then((tarea: ITarea[]) => this.tareasDisponibles = tarea);
  }
 /*LO DE ARRASTRAR dragStart(event,product: Product) {
    this.draggedProduct = product;
}

 drop(event) {
    if (this.draggedProduct) {
        let draggedProductIndex = this.findIndex(this.draggedProduct);
        this.selectedProducts = [...this.selectedProducts, this.draggedProduct];
        this.availableProducts = this.availableProducts.filter((val,i) => i!=draggedProductIndex);
        this.draggedProduct = null;
    }
}
dragEnd(event) {
  this.draggedProduct = null;
}

findIndex(product: Product) {
  let index = -1;
  for(let i = 0; i < this.availableProducts.length; i++) {
      if (product.id === this.availableProducts[i].id) {
          index = i;
          break;
      }
  }
  return index;
}
*/

}

