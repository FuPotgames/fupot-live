import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.page.html',
  styleUrls: ['./owner-profile.page.scss'],
})
export class OwnerProfilePage implements OnInit {

  showMe: boolean;
  constructor() { }

  ngOnInit() {
  }

  show() {
    this.showMe = !this.showMe;
  }

}
