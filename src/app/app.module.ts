import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/authentication.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgCalendarModule  } from 'ionic2-calendar';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { StorageService } from './services/storage.service';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import * as firebase from 'firebase';
import { RecordOpService } from './services/record-op.service';

import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

import * as Phaser from 'phaser-ce';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBY5n7Tn4bgV_LXKcQszmq8ovrpIwV2XIw'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgCalendarModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    StorageService,
    AngularFirestore,
    RecordOpService,
    InAppBrowser,
    EmailComposer,
    LocalNotifications,
    BluetoothSerial,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
