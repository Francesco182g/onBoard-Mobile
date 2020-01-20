import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

export interface Recordop {
  email: string;
  info: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RecordOpService {

  userEmail: string;

  recordCollection: AngularFirestoreCollection<Recordop>;
  records: Observable<Recordop[]>;

  constructor(public afs: AngularFirestore, public afDatabase: AngularFireDatabase,
              private authService: AuthenticationService, public alertCtrl: AlertController) {
}

addRecord(mail, value) {
  return new Promise<any>((resolve, reject) => {
    this.afs.collection('record-' + mail).add({
      email: mail,
      info: value,
      date: new Date().toISOString(),
    })
    .then(
      res => resolve(res),
      err => reject(err)
    );
  });
}

}
