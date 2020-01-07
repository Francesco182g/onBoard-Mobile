import {Injectable} from '@angular/core';
import { Storage} from '@ionic/storage';


@Injectable()
export class StorageService {
  public storage: Storage;

  constructor() {
  }
}
