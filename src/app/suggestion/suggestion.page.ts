import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.page.html',
  styleUrls: ['./suggestion.page.scss'],
})
export class SuggestionPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  openSuggestion() {
    this.router.navigate(['tabs/suggestion']);
  }

}
