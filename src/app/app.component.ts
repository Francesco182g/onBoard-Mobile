import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './theme.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  userEmail: string;

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
      icon: 'person-outline'
    },
    {
      title: 'Impostazioni',
      url: '/tabs/settings',
      icon: 'settings'
    },
    {
      title: 'Suggerimenti',
      url: '/tabs/suggestion',
      icon: 'chatbubbles'
    },
    {
      title: 'Logout',
      icon: 'exit'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private themeSwitcher: ThemeService,
    public router: Router,
    private authService: AuthenticationService,
  ) {
    console.log('ok');
    /*
    if (this.authService.userDetails() !== 'undefined') {
      console.log('nonok');
      this.userEmail = this.authService.userDetails().email;
    }
    */
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

  logout() {
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
  }


}
