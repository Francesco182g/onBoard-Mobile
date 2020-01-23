import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  openGame1() {
    this.router.navigate(['game1']);
  }

}
