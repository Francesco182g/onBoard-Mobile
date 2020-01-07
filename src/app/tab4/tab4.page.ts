import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


export interface Announce {
  descrizione: string;
  titolo: string;
}

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page {

  annonunceCollection: AngularFirestoreCollection<Announce>;
  announces: Observable<Announce[]>;

  constructor(private database: AngularFirestore, private localNotifications: LocalNotifications) {
    this.annonunceCollection = database.collection<Announce>('annunci', ref => ref.orderBy('titolo', 'asc'));
    this.announces = this.annonunceCollection.valueChanges();
    console.log(this.announces);
  }
  single_notification() {
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      sound: 'file://sound.mp3',
      data: { secret: 'key_data' }
    });
  }


  multi_notification() {
    // Schedule multiple notifications
    this.localNotifications.schedule([{
      id: 1,
      text: 'Multi ILocalNotification 1',
      sound: 'file://sound.mp3',
      data: { secret: 'key_data' }
    }, {
      id: 2,
      title: 'Local ILocalNotification Example',
      text: 'Multi ILocalNotification 2',
      icon: 'http://example.com/icon.png'
    }]);
  }

  delayed_notification() {
    // Schedule delayed notification
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      trigger: { at: new Date(new Date().getTime() + 3600) },
      led: 'FF0000',
      sound: null
    });
  }

}
