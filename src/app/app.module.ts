import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import { CameraOriginal} from '@ionic-native/camera';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MyProfilePage } from "../pages/my-profile/my-profile";
import { HttpClientModule } from "@angular/common/http";
import { TestServices } from "../services/services";
import { MenuPage } from "../pages/menu/menu";
import { MyPlacePage } from "../pages/my-place/my-place";
import { StarRatingModule } from 'ionic3-star-rating';

import {GoogleMaps} from "@ionic-native/google-maps";
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation';
import { ReactiveFormsModule } from '@angular/forms';
import {IonicStorageModule} from "@ionic/storage";
import {LocalStor} from "../services/localStor"

class CameraMock extends Camera {
  getPicture(options) {
    return new Promise((resolve, reject) => {
      resolve("BASE_64_ENCODED_DATA_GOES_HERE");
    })
  }
}



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MyProfilePage,
    MenuPage,
    MyPlacePage
  ],
  imports: [
    BrowserModule,
    StarRatingModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp, {}, {links: [
        {component: MenuPage, name: 'MenuPage', segment: 'menu'},
        {component: MyPlacePage, name: 'MyPlacePage', segment: 'my-place'},
        {component: MyProfilePage, name: 'MyProfilePage', segment: 'my-profile'},
        {component: HomePage, name: 'HomePage', segment: 'home'}

        ]
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MyProfilePage,
    MenuPage,
    MyPlacePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: Camera, useClass: CameraMock },
    LocalStor,
    TestServices,
    // CameraOriginal,
    Camera,
    // Geolocation,
    GoogleMaps,
    Geolocation
  ]
})
export class AppModule {}
