import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { RecordOpService } from '../services/record-op.service';

export interface Utente {
  id?: string;
  email: string;
  nome?: string;
  cognome?: string;
  datanascita?: string;
  codice_fiscale?: string;
  sesso?: string;
  cittàNascita?: string;
  indirizzo?: string;
  stato?: boolean;
  path?: string;
  caricamenti?: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
    caricamenti: false,
  };

  firstAccess: boolean;

private database: AngularFirestore;
private userCollection: AngularFirestoreCollection;

private user: string;

  constructor(
    private navCtrl: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private platform: Platform,
    private recordService: RecordOpService,
    database: AngularFirestore,
  ) {
    this.platform.ready().then( _ => {
      this.checkToken();
    });
    this.userCollection = database.collection('users');
    this.firstAccess = false;
    this.checkFirstAccess();
  }

   // tslint:disable-next-line: variable-name
   validations_form: FormGroup;
   errorMessage = '';

 // tslint:disable-next-line: variable-name
 validation_messages = {
   email: [
     { type: 'required', message: 'Inserire Email.' },
     { type: 'pattern', message: 'Inserire Email in formato corretto.' }
   ],
   password: [
     { type: 'required', message: 'Password Richiesta!' },
     { type: 'minlength', message: 'Password Minimo 5 Caratteri.' }
   ]
 };

 ngOnInit() {

   this.validations_form = this.formBuilder.group({
     email: new FormControl('', Validators.compose([
       Validators.required,
       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
     ])),
     password: new FormControl('', Validators.compose([
       Validators.minLength(5),
       Validators.required
     ])),
   });
 }

 checkFirstAccess() {
  this.storage.get('TOKEN_ONE').then( res => {
    if (res === true) {
      console.log('Access');
      this.firstAccess = res;
    }
  });
}


 checkToken() {
  this.storage.get('TOKEN_FIRE').then( res => {
    if (res) {
      console.log('AutoLogin');
      this.loginUser(res);
    }
  });
}

setFirstAccess() {
  console.log('first access true');
  this.storage.set('TOKEN_ONE', true);
}

 loginUser(value) {
   this.authService.loginUser(value)
   .then(res => {
      console.log(res);
      this.errorMessage = '';
      this.navCtrl.navigate(['tabs']);
      this.storage.set('TOKEN_FIRE', value);
      this.user = this.authService.userDetails().email;
      this.getUserInfo();
      this.setFirstAccess();
     }, err => {
     this.errorMessage = err.message;
   });
 }

 setUserInfo(value) {
   console.log(value);
   this.storage.set('TOKEN_USER', value);
 }

 getUserInfo() {
  this.userCollection.doc(this.user).get().toPromise()
  .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        this.recordService.addRecord(this.user, 'login');
        // console.log('Document data:', doc.data());
        this.utente.email = this.user;
        this.utente.nome = doc.get('nome');
        this.utente.cognome = doc.get('cognome');
        this.utente.stato = doc.get('stato');
        this.utente.sesso = doc.get('sesso');
        this.utente.datanascita = doc.get('datanascita');
        this.utente.indirizzo = doc.get('indirizzo');
        this.utente.codice_fiscale = doc.get('codice_fiscale');
        this.setUserInfo(this.utente);
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
 }
}
