import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyProfilePage} from "../my-profile/my-profile";
import {MenuPage} from "../menu/menu";
import {HomePage} from "../home/home";

/**
 * Generated class for the MyPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'MyPlacePage',
  segment: 'my-place'
})
@Component({
  selector: 'page-my-place',
  templateUrl: 'my-place.html',
})
export class MyPlacePage {

  results: any;
  result: any;
  resultPlace: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    // this.result = this.navParams.get('userData');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPlacePage');
    // this.result = this.navParams.get('userData')
  }

  myProfile() {

    // this.result = this.navParams.get('userData')
    console.log('menu result', this.result )

    this.navCtrl.push(MyProfilePage
      // ,
      // {
      //   userData: this.result
      // }
    );
    console.log('Approved');
  }

  places() {
    // this.resultPlace = this.navParams.get('placeData')
    // console.log('place result', this.resultPlace);
    //
    // this.result = this.navParams.get('userData');
    // console.log('user result', this.result);
    //
    // this.navCtrl.push(MenuPage,
    //   {
    //     placeData: this.resultPlace
    //   }
    // );

    this.navCtrl.push(MenuPage
      // ,
      // {
      //   userData: this.result
      // }
    );

  }

  home() {
    this.navCtrl.push(HomePage);


  }

}
