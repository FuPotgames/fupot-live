import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';


const { PushNotifications } = Plugins;
const { Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  saveNotificationInfo: any;
  deviceInfo: any;

  constructor(private http: HttpClient) {}

  // setup the headers for requesting
  // initHeaders() {
  //   const headers = {
  //     Authorization: 'Token cc770567bf47d32f8ad0587cd4f581cbca794368',
  //     'Content-Type': 'application/json'
  //   };
  //   return headers;
  // }

  // This function saves the token to the backend server
  setupToken(platform, token) {
    this.saveNotificationInfo = {
      name: '',
      registration_id: token.value,
      type: platform
    };
    // this.saveTokenAndroid(this.saveNotificationInfo);
    this.saveToken(this.saveNotificationInfo).subscribe(r => {
        console.log(r);
    },
    e => {
        console.log(e);
    });

  }
  /*
    Initiates the post request with our backend
    Note: Later on, the link needs to be change to aws host server address
  */
  saveToken(notificationData): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders(this.initHeaders())
    // };
    return this.http.post(environment.BASE_API_URL + '/api/fupot/notification', notificationData);
  }

  /*
    Setup Notification for IOS and Android
  */
  async setupNotification() {
    this.deviceInfo = await Device.getInfo().then(value => {
      console.log(value);
      if (value.platform !== 'web') {
        console.log('Initializing Notification');

        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        PushNotifications.requestPermission().then(async result => {
          if (result.granted) {
            // Register with Apple / Google to receive push via APNS/FCM
            PushNotifications.register();
          } else {
            alert('notification denied')
          }
        });

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
          (token: PushNotificationToken) => {
            if (value.platform === 'ios') {
              this.setupToken('ios', token);
            } else if (value.platform === 'android') {
              this.setupToken('android', token);
            }
            //alert('Push registration success, token: ' + token.value);
          }
        );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
          () => {
            //alert('Error on registration: ' + JSON.stringify(error));
          }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
          () => {
            //alert('Push received: ' + JSON.stringify(notification));
          }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
          () => {
            //alert('Push action performed: ' + JSON.stringify(notification));
          }
        );

      }
    });
  }

  // Send a post request to send group messages
  sendGroupMessages(group_id,messageData): Observable<any> {
    return this.http.post(environment.BASE_API_URL + '/api/fupot/notify-group/'+group_id,messageData);
  }

  // Send a post request to send group messages
  getGroupMessages(group_id,paginated_index): Observable<any> {
    return this.http.get(environment.BASE_API_URL + '/api/fupot/get-group-messages?'+'group='+group_id+'&page='+paginated_index);
  }
}
