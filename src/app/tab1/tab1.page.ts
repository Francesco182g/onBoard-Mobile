import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  userEmail: string;

  constructor(public router: Router, private authService: AuthenticationService) {}

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

  openTab2() {
    this.router.navigate(['tab2']);
  }
}
