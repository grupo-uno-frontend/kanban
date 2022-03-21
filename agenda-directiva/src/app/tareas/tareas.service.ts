import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, limit, orderBy, query } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ITarea } from '../tablon-tareas/tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  firestore: any;

  constructor(firestore: Firestore) { }
  getTareas(): Observable<ITarea[]> {
    const tareas = collection(this.firestore, 'tareas');
    const realizadas = query(tareas, orderBy('fechaHora', 'desc'), limit(20));
    return collectionData(realizadas, { idField: 'id' }) as Observable<ITarea[]>;
}
