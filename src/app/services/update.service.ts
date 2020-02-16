import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private database: AngularFirestore;
  private userCollection: AngularFirestoreCollection;

  private user: string;

  constructor(
    private authService: AuthenticationService,
    private storage: Storage,
    database: AngularFirestore,
  ) {

   }


}
