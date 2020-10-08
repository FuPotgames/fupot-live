import { Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  
  constructor() {}
  
  ngOnInit() {
    this.logo_animation();
  }
  logo_animation(){
    var logo = document.querySelector('#signup_logo_animation');
    var animate_logo = logo.animate({
      opacity: [0.5, 1],
      transform: ['scale(0.7)', 'scale(1)'],
    }, {
    direction: 'alternate',
    duration: 1000,
    iterations: Infinity,
  });
  }

}
