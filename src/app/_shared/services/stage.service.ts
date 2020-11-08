import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Stage } from '../models/stage.model';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  stagesCollectionName = 'stages';

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAll(): Observable<any> {
    return this.firestore.collection(this.stagesCollectionName, ref => ref.orderBy('pos', 'asc')).snapshotChanges();
  }

  create(stage: Stage): Promise<any> {
    return this.firestore.collection(this.stagesCollectionName).add(stage);
  }

  get(id: string): Observable<any> {
    return this.firestore.collection(this.stagesCollectionName).doc(id).get();
  }

  update(stage: Stage): Promise<any> {
    return this.firestore.doc(this.stagesCollectionName + '/' + stage.id).update(stage);
  }

  delete(id: string): Promise<any> {
    return this.firestore.doc(this.stagesCollectionName + '/' + id).delete();
  }
}
