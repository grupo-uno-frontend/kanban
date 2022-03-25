import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ITarea } from '../tablon-tareas/tarea.interface';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  constructor(private firestore: Firestore) {}
  getTareas(usuario: string): Observable<ITarea[]> {
    const tareas = collection(this.firestore, 'tareas');
    const tareasUsuario = query(tareas, where('usuario', '==', usuario));
    const tareasDisponibles = query(
      tareasUsuario,
      where('realizado', '==', false)
    );
    /* const realizadas = query(tareas, orderBy('fechaHora', 'asc'), limit(20));//desc */
    return collectionData(tareasDisponibles, { idField: 'id' }) as Observable<
      ITarea[]
    >;
  }

  getTareasFinalizadas(usuario: string): Observable<ITarea[]> {
    const tareas = collection(this.firestore, 'tareas');
    const tareasUsuario = query(tareas, where('usuario', '==', usuario));
    const tareasDisponibles = query(
      tareasUsuario,
      where('realizado', '==', true)
    );
    /* const realizadas = query(tareas, orderBy('fechaHora', 'asc'), limit(20));//desc */
    return collectionData(tareasDisponibles, { idField: 'id' }) as Observable<
      ITarea[]
    >;
  }

  updateTarea(tarea: ITarea) {
    const tareaActualizar = doc(this.firestore, `tareas/${tarea.id}`);
    return setDoc(tareaActualizar, tarea);
  }

  addTarea(tarea: ITarea) {
    const tareas = collection(this.firestore, 'tareas');
    return addDoc(tareas, tarea);
  }

  deleteTarea(tarea: ITarea) {
    const tareaEliminar = doc(this.firestore, `tareas/${tarea.id}`);
    return deleteDoc(tareaEliminar);
  }
}
