import { Component, OnInit} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  userEmail: string;

  constructor(private menu: MenuController, public router: Router, private authService: AuthenticationService
    ) { }

    ngOnInit() {
      if (this.authService.userDetails()) {
        this.userEmail = this.authService.userDetails().email;
      } else {
        this.router.navigate(['login']);
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

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
