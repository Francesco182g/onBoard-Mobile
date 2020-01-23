import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ThemeService } from '../theme.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  user: string;
  prefTheme: boolean;

  constructor(public router: Router,
              public auth: AuthenticationService,  private themeSwitcher: ThemeService,
              public alertCtrl: AlertController
    ) {
    this.user = this.auth.userDetails().email;
  }

  async notActive(message) {
    const alert = await this.alertCtrl.create({
      header: message + ' Non attiva',
      message: 'Questa funzionalità non è ancora attiva, la implementeremo a breve',
      buttons: ['Conferma']
    });
    alert.present();
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
    // this.storage.setBooleanElement('prefTheme', this.prefTheme);
  }

  logout() {
    this.auth.logoutUser()
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
  }

  openGuide() {
    this.router.navigate(['guide']);
  }

  openRecord() {
    this.router.navigate(['tabs/record']);
  }

  openMail() {
    this.router.navigate(['tabs/mail']);
  }
}
