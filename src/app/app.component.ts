import { Component } from '@angular/core';


import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './theme.service';

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
      title: 'Calendario',
      url: '/tabs/tab5',
      icon: 'calendar'
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
    private themeSwitcher: ThemeService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ThemeSwitcher() {
    // 0 = day mode
    // 1 = night mode
    if (this.themeSwitcher.currentTheme === 0) {
      this.themeSwitcher.setTheme('night');
      this.themeSwitcher.currentTheme = 1;
    } else {
      this.themeSwitcher.setTheme('day');
      this.themeSwitcher.currentTheme = 0;
    }
  }

}
