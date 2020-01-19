import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
})
export class GuidePage implements OnInit {

  constructor(public router: Router) {
  }


  ngOnInit() {
  }

  openSettings() {
    this.router.navigate(['tabs/settings']);
  }

  openSuggestion() {
    this.router.navigate(['tabs/suggestion']);
  }

}
