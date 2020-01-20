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
  const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
  const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
  return new Promise<any>((resolve, reject) => {
    this.afs.collection('record-' + mail).add({
      email: mail,
      info: value,
      date: localISOTime,
    })
    .then(
      res => resolve(res),
      err => reject(err)
    );
  });
}

}
