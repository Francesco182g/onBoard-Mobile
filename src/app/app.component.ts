import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'SellaMap';
  lat = 51.678418;
  lng = 7.809007;
  public appPages = [
    {
      title: 'Home',
      url: '/tabs/tab1',
      icon: 'home'
    },
    {
      title: 'Mappa',
      url: '/tabs/tab2',
      icon: 'map'
    },
    {
      title: 'Documenti',
      url: '/tabs/tab3',
      icon: 'document'
    },
    {
      title: 'Notifiche',
      url: '/tabs/tab4',
      icon: 'notifications'
    },
    {
      title: 'Profilo',
      url: '/tabs/tab5',
      icon: 'person'
    },
    {
      title: 'Impostazioni',
      url: '/tabs/settings',
      icon: 'settings'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private themeService: ThemeService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
