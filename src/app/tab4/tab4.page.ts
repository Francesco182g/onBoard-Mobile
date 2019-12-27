import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Announce {
  title: string;
  description: string;
}

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page {

  private annonunceCollection: AngularFirestoreCollection<Announce>;
  announces: Observable<Announce[]>;
  UploadedFileURL: Observable<string>;

  constructor(private database: AngularFirestore) {
    this.annonunceCollection = database.collection<Announce>('annunci');
    this.announces = this.annonunceCollection.valueChanges();
    
  }

}
