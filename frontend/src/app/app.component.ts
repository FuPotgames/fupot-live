import { Router } from '@angular/router';
import { AuthDataService } from './services/auth-services/auth-data.service';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { NavController, Platform, IonRouterOutlet, MenuController } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';


import {
  Plugins,
  StatusBarStyle,
  Capacitor,
} from '@capacitor/core';

const { StatusBar } = Plugins;
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isStatusBarLight = true;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private authDataService:AuthDataService,
    private navController: NavController,
    private platform: Platform,
    private menuController:MenuController,
    private router:Router
    ) {
    
    this.initializeApp();
    this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.changeStatusBar();
        SplashScreen.hide();
      }, 3000);
    });
    defineCustomElements(window);
  }

  /*
    Clears out the user by changing token to null value and logout the user
  */
  async signout() {
    await this.authDataService.set_token(null);
    await this.authDataService.clear_token();
    await this.menuController.toggle();
    //this.router.navigateByUrl('/signin', { replaceUrl: true });
    this.navController.navigateRoot('/signin');
  }
  /*
    Handles back button specially hardware back button
  */
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {

        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
            if (outlet && outlet.canGoBack()) {
                outlet.pop();
            } else  {
                 navigator['app'].exitApp();
            }
        });
    });
  }
  /*
    Status Bar Config
  */
  changeStatusBar() {
    if (Capacitor.isNative && Capacitor.platform == 'android') {
      StatusBar.setStyle({
        style: this.isStatusBarLight ? StatusBarStyle.Dark : StatusBarStyle.Light
      });
      this.isStatusBarLight = !this.isStatusBarLight;
  
      // Display content under transparent status bar (Android only)
      // StatusBar.setOverlaysWebView({
      //   overlay: true
      // });
    }
    
  }

}
