import {Injectable} from '@angular/core';
import { Storage} from '@ionic/storage';
import { User } from 'firebase';


@Injectable()
export class StorageService {
  public storage: Storage;

  constructor() {
  }

  setStringElement(key: string, value: string) {
    // set a key/value
    this.storage.set(key, value);
  }

  setElement(key: string, value: User) {
    // set a key/value
    this.storage.set(key, value);
  }

  setBooleanElement(key: string, value: boolean) {
    // set a key/value
    this.storage.set(key, value);
  }

  getElement(tag: string) {
  // Or to get a key/value pair
  console.log(this.storage.get(tag));
  this.storage.get(tag).then((val) => {
    console.log('Element: ', val);
    return val;
  });
  }

  remove(key: string) {
    this.storage.remove(key)
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }


}
