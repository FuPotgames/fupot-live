import { GroupDataService } from './services/owner-services/group-data.service';
import { TokenInterceptorService } from './services/general-services/token-interceptor.service';
import { GroupService } from './services/owner-services/group.service';
import { NotificationService} from './services/general-services/notification.service';
import { AuthDataService } from './services/auth-services/auth-data.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IonicStorageModule } from '@ionic/storage';
import { QuestionDataService } from './services/owner-services/question-data.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({swipeBackEnabled: false}), AppRoutingModule,HttpClientModule,FormsModule,IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    AuthDataService,
    GroupService,
    NotificationService,
    GroupDataService,
    QuestionDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
