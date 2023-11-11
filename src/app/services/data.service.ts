//Felix Andres Almonte P. 2021-2030
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';

export interface Calls
{
  id?: string;
  title: string;
  description: string;
  image?: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private firestore: Firestore) { }

  getCalls(): Observable<Calls[]>
  {
    const callsRef= collection(this.firestore, 'calls');
    return collectionData(callsRef, {idField: 'id'}) as Observable<Calls[]>;
  }

  getCallById(id: any): Observable<Calls>
  {
    const callRef= doc(this.firestore, `calls/${id}`);
    return docData(callRef, {idField: 'id'}) as Observable<Calls>;
  }

  addCall(call: Calls)
  {
    const callDocRef= collection(this.firestore, 'calls');
    return addDoc(callDocRef, call);
  }

  updateCall(call: Calls)
  {
    const callDocRef= doc(this.firestore, `calls/${call.id}`);
    return updateDoc(callDocRef, {
      title: call.title, description: call.description, image: call.image, date: call.date
    });
  }

  deleteCall(call: Calls)
  {
    const callDocRef= doc(this.firestore, `calls/${call.id}`);
    return deleteDoc(callDocRef);
  }
}
