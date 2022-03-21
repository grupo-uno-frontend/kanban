import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, limit, orderBy, query } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ITarea } from '../tablon-tareas/tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private firestore: Firestore) { }
  getTareas(): Observable<ITarea[]> {
    const tareas = collection(this.firestore, 'tareas');
    const realizadas = query(tareas, orderBy('fechaHora', 'asc'), limit(20));//desc
    return collectionData(realizadas, { idField: 'id' }) as Observable<ITarea[]>;}

  addTarea(tarea: ITarea) {
    const tareas = collection(this.firestore, 'tareas');
      return addDoc(tareas, tarea);}

  deleteTarea(tarea: ITarea) {
    const tareaEliminar = doc(this.firestore, `tareas/${tarea.id}`);
      return deleteDoc(tareaEliminar);}




  }
