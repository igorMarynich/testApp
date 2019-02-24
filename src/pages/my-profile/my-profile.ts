import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,AlertController  } from 'ionic-angular';
// import { CameraOptions, CameraOriginal } from '@ionic-native/camera';
import { HttpClient } from "@angular/common/http";
import { MenuPage } from "../menu/menu";
import { MyPlacePage } from "../my-place/my-place";
import { HomePage } from "../home/home";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from "@ionic/storage";


/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/compone5.2.11nts/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'MyProfilePage',
  segment: 'my-profile'
})
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  firstName: string;
  lastName: string;
  email: string;
  password: string;

  condition: boolean;
  myState: boolean;

  image: string;

  result: any;
  results: any;
  key: string = 'user';





  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              // private camera: CameraOriginal,
              public actionSheetCtrl: ActionSheetController,
              public http: HttpClient,
              private alertController: AlertController,
              private camera: Camera,
              public storage: Storage ) {


      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.image = "";
      this.condition = false;

    //   this.storage.set('userData', this.result);
    //   this.storage.get('userData').then((data) => {
    //   console.log('data', data);
    // });

    this.result = this.navParams.get('userData');


    this.storage.set(this.key, JSON.stringify(this.result));
    this.storage.get(this.key).then((val) => {
      if(val != null && val != undefined) {
        console.log('ok storage');
        this.result = JSON.parse(val);

        console.log('this.result storage', this.result);

        this.firstName = this.result.firstName;
        this.lastName = this.result.lastName;
        this.email = this.result.email;
        this.password = this.result.password;

      } else {
        console.log('error storage');
      }
    });

    // console.log('this.result ', this.result )
    // console.log('this.result.email', this.result.email);


  }


  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      //title: 'Modify your album',
      buttons: [
        {
          icon: 'camera',
          role: 'destructive',
          handler: () => {
            const options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              correctOrientation: true,
              saveToPhotoAlbum: true,
            }

            this.camera.getPicture(options).then((imageData) => {
              // imageData is either a base64 encoded string or a file URI
              // If it's base64 (DATA_URL):
              this.image = 'data:image/jpeg;base64,' + imageData;
              console.log('img', this.image);
            }, (err) => {
              // Handle error
            });
          }
        },
        {
          icon: 'folder',
          handler: () => {
            const options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
              mediaType: this.camera.MediaType.PICTURE,
              correctOrientation: true,
              saveToPhotoAlbum: true,
            }

            this.camera.getPicture(options).then((imageData) => {
              // imageData is either a base64 encoded string or a file URI
              // If it's base64 (DATA_URL):
              this.image = 'data:image/jpeg;base64,' + imageData;
            }, (err) => {
              // Handle error
            });
          }
        },
      ]
    });
    actionSheet.present();
  }

  myEnable() {
    this.myState = false;
    this.condition = true;
    console.log('edit');
  }

  myDisable() {

    // if (this.result.firstName.length == 0) {
    //   let wrongPassword = this.alertController.create({
    //     title: "firstName",
    //     message: "put info",
    //     buttons: [
    //       {
    //         text: "Ok"
    //       }
    //     ]
    //   });
    //   wrongPassword.present()
    // }
    //
    // else if (this.result.lastName.length == 0) {
    //   let wrongPassword = this.alertController.create({
    //     title: "lastName",
    //     message: "put info",
    //     buttons: [
    //       {
    //         text: "Ok"
    //       }
    //     ]
    //   });
    //   wrongPassword.present()
    // }
    //
    // else if (this.result.email.length == 0) {
    //   let wrongPassword = this.alertController.create({
    //     title: "Email",
    //     message: "put info",
    //     buttons: [
    //       {
    //         text: "Ok"
    //       }
    //     ]
    //   });
    //   wrongPassword.present()
    // }
    //
    // else if (this.result.password.length == 0) {
    //   let wrongPassword = this.alertController.create({
    //     title: "password",
    //     message: "put info",
    //     buttons: [
    //       {
    //         text: "Ok"
    //       }
    //     ]
    //   });
    //   wrongPassword.present()
    // }

    // else if (this.result.firstName.length !== 0 && this.result.lastName.length !== 0 && this.result.email.length !== 0 && this.result.password.length !== 0) {
      this.myState = true;
      this.condition = false;
      console.log(this.result);
      console.log('save');
    // }


  }

  places() {
    // this.resultPlace = this.navParams.get('placeData')
    // console.log('place result', this.resultPlace);
    //
    // this.navCtrl.push(MenuPage,
    //   {
    //     placeData: this.resultPlace
    //   }
    // );
    // console.log('Approved');

    this.navCtrl.push(MenuPage,
      {
        userData: this.result
      });

  }

  myPlace() {
    this.navCtrl.push(MyPlacePage,
      {
        userData: this.result
      });
  }

  home() {
    this.navCtrl.push(HomePage);
  }



}
