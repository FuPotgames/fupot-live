import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private storage: Storage, private navController: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar) {
    this.initializeApp();
  }

  initializeApp() {
    setTimeout(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }, 3000);
  }

  /*
    Clears out the user by changing token to null value and logout the user
  */
  signout() {
    this.storage.set('token', null);
    this.navController.navigateRoot('/signup');
  }
}
