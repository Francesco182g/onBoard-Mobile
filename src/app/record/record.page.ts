import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Recordop } from '../services/record-op.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {

  userEmail: string;

  recordCollection: AngularFirestoreCollection<Recordop>;
  records: Observable<Recordop[]>;

  constructor(public afs: AngularFirestore, public afDatabase: AngularFireDatabase,
              private authService: AuthenticationService, public alertCtrl: AlertController) {
                // this.afs.collection('');
                this.userEmail = this.authService.userDetails().email;
                // tslint:disable-next-line: max-line-length
                this.recordCollection = afs.collection<Recordop>('record-' + this.userEmail, ref => ref.orderBy('record-' + this.userEmail, 'asc'));
                this.records = this.recordCollection.valueChanges();
                console.log('record-' + this.userEmail);
}
  ngOnInit() {
  }

  async showAnnounce(data, messaggio) {
    const alert = await this.alertCtrl.create({
      header: data,
      message: messaggio,
      buttons: ['Conferma']
    });
    alert.present();
  }

}
