import { AuthDataService } from './services/auth-services/auth-data.service';
import { Component } from '@angular/core';
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
    private authDataService:AuthDataService,
    private navController: NavController,
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
  async signout() {
    await this.authDataService.set_token(null);
    await this.authDataService.clear_token();
    this.navController.navigateRoot('/signup');
  }
}
