import { Component, OnInit } from '@angular/core';
import { Utente } from '../login/login.page';
import { Storage} from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Announce } from '../tab1/tab1.page';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {


    // bean User
    utente: Utente = {
      email: '',
      nome: '',
      cognome: '',
      datanascita: '',
      codice_fiscale: '',
      sesso: '',
      cittàNascita: '',
      indirizzo: '',
      path: '',
    };

    unpairedDevices: any;
    pairedDevices: any;
    gettingDevices: boolean;

    annonunceCollection: AngularFirestoreCollection<Announce>;
    announces: Observable<Announce[]>;

    turno: boolean;

  constructor(private storage: Storage, public alertCtrl: AlertController ,
              public router: Router, private database: AngularFirestore,
              private bluetoothSerial: BluetoothSerial
              ) {
    this.getUserInfo();
    this.annonunceCollection = database.collection<Announce>('annunci', ref => ref.orderBy('titolo', 'asc'));
    this.announces = this.annonunceCollection.valueChanges();
    bluetoothSerial.enable();
    this.turno = false;
  }

  ngOnInit() {
  }

  getUserInfo() {
    this.storage.get('TOKEN_USER').then( res => {
      if (res) {
        console.log('Token user get');
        console.log(res);
        this.utente = res;
        console.log(this.utente);
      }
    });
  }

  async showAnnounce(nome, descrizione) {
    const alert = await this.alertCtrl.create({
      header: nome,
      message: descrizione,
      buttons: ['Conferma']
    });
    alert.present();
  }

  openSettings() {
    this.router.navigate(['tabs/settings']);
  }



  onBadge() {
    this.bluetoothSerial.write('x');
    this.turno = true;
  }

  offBadge() {
    this.bluetoothSerial.write('y');
    this.turno = false;
  }

  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.forEach(element => {
        // alert(element.name);
      });
    },
      (err) => {
        console.log(err);
      });

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    },
      (err) => {

      });
  }
  success = (data) => alert(data);
  fail = (error) => alert(error);

  async selectDevice(address: any) {

    const alert = await this.alertCtrl.create({
      header: 'Connessione',
      message: 'Vuoi Collegarti al Badge System?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connetti',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
          }
        }
      ]
    });
    alert.present();

  }

  async disconnect() {
    // tslint:disable-next-line: prefer-const
    let alert = await this.alertCtrl.create({
      header: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    alert.present();
  }

}
