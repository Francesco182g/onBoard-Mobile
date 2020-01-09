import {Component} from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController } from '@ionic/angular';
import { PreferencesService } from '../services/preferences.service';
import { LoginPage } from '../login/login.page';
import { AuthenticationService } from '../services/authentication.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  public preferences: any;
  public PREF_DISCOVERABLE: string;
  public PREF_NOTIFY_MESSAGES: string;
  public PREF_NOTIFY_INVITES: string;
  authService: any;
  router: any;

  user: string;

  constructor(public nav: NavController, public preferencesService: PreferencesService,
              public auth: AuthenticationService,  private themeSwitcher: ThemeService,
    ) {
    this.preferences = {};
    this.user = this.auth.userDetails().email;
    this.PREF_DISCOVERABLE = PreferencesService.PREF_DISCOVERABLE;
    this.PREF_NOTIFY_MESSAGES = PreferencesService.PREF_NOTIFY_MESSAGES;
    this.PREF_NOTIFY_INVITES = PreferencesService.PREF_NOTIFY_INVITES;
  }

  public ionViewWillEnter() {
    this.preferences[PreferencesService.PREF_DISCOVERABLE]
      = this.preferencesService.getPreference(PreferencesService.PREF_DISCOVERABLE);
    this.preferences[PreferencesService.PREF_NOTIFY_MESSAGES]
      = this.preferencesService.getPreference(PreferencesService.PREF_NOTIFY_MESSAGES);
    this.preferences[PreferencesService.PREF_NOTIFY_INVITES]
      = this.preferencesService.getPreference(PreferencesService.PREF_NOTIFY_INVITES);
  }

  public changePreference(event, key) {
    this.preferencesService.setPreference(key, event.checked);
    if (key === this.PREF_DISCOVERABLE) {
    }
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
      this.router.navigate(['login']);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
