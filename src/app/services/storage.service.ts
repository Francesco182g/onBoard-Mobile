import {Injectable} from '@angular/core';
import { Storage} from '@ionic/storage';
import { User } from 'firebase';
import { Utente } from '../login/login.page';


@Injectable()
export class StorageService {
  public storage: Storage;

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

    };

  constructor() {
  }

  checkToken(token) {
    this.storage.get(token).then( res => {
      if (res) {
        console.log('AutoLogin');
        return true;
      } else {
        return false;
      }
    });
  }

  getUserInfo() {
    this.storage.get('TOKEN_USER').then( res => {
      if (res) {
        console.log('Token user get');
        this.utente = res;
        return res;
      }
    });
    return this.utente;
  }


}
