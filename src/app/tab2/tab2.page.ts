import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

export interface Incontro {
  id?: string;
  emailUtente: string;
  emailReferente: string;
  data: string;
  ora: string;
  indirizzo: string;
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  title = 'InSella';
  lat = 45.5642404;
  lng = 8.0551731;

  incontro: Incontro = {
    emailUtente: '',
    emailReferente: '',
    data: '',
    ora: '',
    indirizzo: '',
  };

  itemsCollections: AngularFirestoreCollection<Incontro>;
  user: string;
  items: Observable<Incontro[]>;

  public incontri: AngularFireList<Incontro>;

  constructor(public database: AngularFirestore, public afs: AngularFireDatabase,
              private authService: AuthenticationService, private platform: Platform,
              private inAppBrowser: InAppBrowser) {
    this.itemsCollections = database.collection<Incontro>('incontro', ref => ref.orderBy('data', 'asc'));
    this.user = this.authService.userDetails().email;
    this.getIncontri();
  }

  goTo(address) {
    const browser = this.inAppBrowser.create('geo://0,0?q=' + address, '_system', 'location=yes');
    browser.on('loadstop').subscribe(event => {
    browser.insertCSS({ code: 'body{color: red;'});
  });
  }

  saveInCalendar(mail, data, ora, indirizzo) {
    const browser = this.inAppBrowser.create('geo://0,0?q=' + mail, '_system', 'location=yes');
    browser.on('loadstop').subscribe(event => {
    browser.insertCSS({ code: 'body{color: red;'});
  });
  }

  getIncontri() {
    this.items = this.database.collection('users').doc(this.user).collection('incontro').snapshotChanges().pipe( map (changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Incontro;
        data.id = a.payload.doc.id;
        console.log('Ecco il valore della a che mi serve: ' + data.indirizzo);
        return data;
      });
    })
  );
    return this.items;
  }
  /*
  getIncontroInfo() {
    this.database.collection('users').doc(this.user).collection('incontro').get().toPromise()
    .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          if (this.incontro.emailUtente === doc.get('')) {
            this.incontro.emailReferente = doc.get('');
            this.incontro.emailUtente = doc.get('');
            this.incontro.indirizzo = doc.get('');
            this.incontro.data = doc.get('');
            this.incontro.ora = doc.get('');
            console.log(this.incontro);
        }
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
   }
*/

}
