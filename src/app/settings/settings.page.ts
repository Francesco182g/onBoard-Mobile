import { Component } from '@angular/core';
import { ThemeService } from '../theme/theme.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  constructor(private themeService: ThemeService) {}

  toggle() {
    const active = this.themeService.getActiveTheme() ;
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }
}
