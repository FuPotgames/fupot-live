import { UserAuthService } from './../services/user-auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']

})
export class HomePage implements OnInit{

  constructor(private userAuthService: UserAuthService, private storage: Storage, private navController: NavController) {}
  ngOnInit() {
  }
  signout(){
    this.storage.set('token','');
    this.navController.navigateRoot('/signup');
  }



}

