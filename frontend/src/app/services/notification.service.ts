import { Injectable, OnInit } from '@angular/core';
import { UserService } from './user.service';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import {HTTP} from '@ionic-native/http/ngx';


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

  constructor(private userService: UserService, private http: HTTP) {}

  // setup the header for requesting
  initHeaders() {
    const headers = {
      'Authorization': 'Token cc770567bf47d32f8ad0587cd4f581cbca794368',
      'Content-Type': 'application/json'
    };
    return headers;
  }

  // This function prepares our token to save it to our server
  setupToken(platform, token) {
    this.saveNotificationInfo = {
      name: '',
      registration_id: token.value,
      type: platform
    };
    this.saveToken(this.saveNotificationInfo);
  }
  /*
    Initiates the post request with our backend
    Note: Later on, the link needs to be change to aws host server address
  */
  saveToken(notificationData) {
    this.http.post('http://192.168.1.221:8000/api/fupot/notification', notificationData, this.initHeaders())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*
    Setup Notification for ios and android
    TODO: Work on IOS for this matter sending notification with this backend system and after signup retrival of the token
  */
  async setupNotification() {
    this.deviceInfo = await Device.getInfo().then(value => {
      console.log(value);
      if (value['platform'] !== 'web') {
        console.log('Initializing Notification');

        // Request permission to use push notifications
        // iOS will prompt user and return if they granted permission or not
        // Android will just grant without prompting
        PushNotifications.requestPermission().then(result => {
          if (result.granted) {
            // Register with Apple / Google to receive push via APNS/FCM
            PushNotifications.register();
          } else {
            // Show some error
          }
        });

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
          (token: PushNotificationToken) => {
            if (value['platform'] === 'ios') {
              alert('ios')
              this.setupToken('ios', token);
            } else if (value['platform'] === 'android') {
              alert('android');
              this.setupToken('android', token);
            } else {
              alert('web');
            }
            alert('Push registration success, token: ' + token.value);
          }
        );

        // Some issue with our setup and push will not work
        PushNotifications.addListener('registrationError',
          (error: any) => {
            alert('Error on registration: ' + JSON.stringify(error));
          }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
          (notification: PushNotification) => {
            alert('Push received: ' + JSON.stringify(notification));
          }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
          (notification: PushNotificationActionPerformed) => {
            alert('Push action performed: ' + JSON.stringify(notification));
          }
        );

      }
    });
  }
}
