import {Injectable} from '@angular/core';
import { Storage} from '@ionic/storage';


@Injectable()
export class StorageService {
  public storage: Storage;

  constructor() {
  }

  // tslint:disable-next-line: whitespace
  addElement(key: string, value: string) {
    // set a key/value
    this.storage.set(key, value);
  }

  getElement(tag: string) {
  // Or to get a key/value pair
  this.storage.get(tag).then((val) => {
    const element = val;
    console.log('Element: ', val);
    return element;
  });
  }

  removeElement(tag: string) {

  }


}
