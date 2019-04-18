import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { MyProfilePage } from "../my-profile/my-profile";
import { TestServices } from "../../services/services";
import { MyPlacePage } from "../my-place/my-place";
import { HomePage } from "../home/home";
import { Events } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'MenuPage',
  segment: 'menu'
  })
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  results: any;
  results2: any;
  result: any;
  resultPlace: any;
  conditionDiv: boolean=true;
  names: string[];
  photo: string;


  search: boolean;
  range: boolean;

  data:string = "";

  myPosition: any;
  // objectPosition: any;

  distance: any;

  arraySplit: any;
  array: [];
  max: number;
  myArr = [];
  saturation: number;




  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public TestSer: TestServices,
              public events: Events,
              public geolocation: Geolocation
  ) {


    events.subscribe('star-rating:changed', (starRating) => {console.log(starRating)});

    this.result = this.navParams.get('userData');
    this.search = false;
    this.range = false;
    this.photo = "data:image/jpeg;base64,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";
    this.myPosition = {
      // lat: "",
      // lon: ""
    };
    // this.objectPosition = [];
    this.distance = [];
    this.myArr = [];
    this.saturation = 0;


  }



  ionViewDidLoad() {
    this.getLocation();
  }


  myProfile() {

    this.result = this.navParams.get('userData')
    console.log('menu userData result', this.result )

      this.navCtrl.push(MyProfilePage,
        {
          userData: this.result
        }
      );
      console.log('Approved');
  }

  myPlace() {
    this.resultPlace = this.navParams.get('placeData')
    console.log('place result', this.resultPlace);

    this.result = this.navParams.get('userData');
    console.log('user result', this.result);

    // this.navCtrl.push(MyPlacePage,
    //   {
    //     placeData: this.resultPlace
    //   }
    // );

    this.navCtrl.push(MyPlacePage,
      {
        userData: this.result
      }
    );


  }

  home() {
    this.navCtrl.push(HomePage);
    console.log('Approved');

  }

  toggle(){
    this.conditionDiv=!this.conditionDiv;
  }

  getTopics(ev: any) {
    let serVal = ev.target.value;
    console.log(serVal);
    if (serVal && serVal.trim() != '') {
      this.results = this.results2.filter((result) => {
        // console.log('this.results',this.results);
        // console.log('this.results2', this.results2);
        // console.log('result.name', (result.name.toLowerCase().indexOf(serVal.toLowerCase()) > -1) ||);
        this.search = result.name.toLowerCase().indexOf(serVal.toLowerCase()) > -1 || result.type.toLowerCase().indexOf(serVal.toLowerCase()) > -1 || result.country.toLowerCase().indexOf(serVal.toLowerCase()) > -1 || result.city.toLowerCase().indexOf(serVal.toLowerCase()) > -1;
        return this.search;
      })
    } else {
      this.results = this.results2;
    }
  }

  change(saturation) {
    if (saturation) {
      this.results = this.results2.filter((result) => {
        // console.log('this.results',this.results);
        // console.log('this.results2', this.results2);
        // console.log('result.name', (result.name.toLowerCase().indexOf(serVal.toLowerCase()) > -1) ||);
        this.range  = result.distance <= saturation;
        return this.range;
      })
    } else {
      this.results = this.results2;
    }

  }

  sortResultsLow(){
    this.results.sort((a,b) => {
      if(a.rate > b.rate) {
        return 1;
      } else if(a.rate < b.rate) {
        return -1;
      }
    })
  }

  sortResultsHeight(){
    this.results.sort((a,b) => {
      if(a.rate > b.rate) {
        return -1;
      } else if(a.rate < b.rate) {
        return 1;
      }
    })
  }

  sortResultsNear() {
    this.results.sort((a,b) => {
      if(a.distance > b.distance) {
        return 1;
      } else if(a.distance < b.distance) {
        return -1;
      }
    })
  }

  sortResultsFar() {
    this.results.sort((a,b) => {
      if(a.distance > b.distance) {
        return -1;
      } else if(a.distance < b.distance) {
        return 1;
      }
    })
  }

  async getLocation(){
    await this.geolocation.getCurrentPosition().then((res) => {
      // resp.coords.latitude
      // resp.coords.longitude
      //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
     // let location='lat '+res.coords.latitude+' lang '+res.coords.longitude;
      this.myPosition.lon = res.coords.latitude;
      this.myPosition.lat = res.coords.longitude;

      console.log('coordinate',this.myPosition);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.TestSer.getReq().subscribe(

      (results:any) => {
        this.results = results;
        this.results2 = results;

        console.log('this.results', this.results)
        results.map((result:any) => {
          if(result.googleMap.length <= 1) {
            this.arraySplit = result.googleMap[0].split(',');

            result.googleMap.pop();
            result.googleMap.push(eval("(" + this.arraySplit[0] + ")"));
            result.googleMap.push(eval("(" + this.arraySplit[1] + ")"));

            // console.log('result.googleMap', result.googleMap);
          }
          // this.objectPosition.push(result.googleMap);
        });

        console.log('this.results[i].googleMap[1].widthlatitude', this.results[0].googleMap[1].widthlatitude);
        console.log('this.results[i].googleMap[1].widthlatitude', this.results[3].googleMap[0].longlatitude);

        let p = 0.017453292519943295;    // Math.PI / 180
        let c = Math.cos;
        let a = 0;
        for (let i = 0; i <= this.results.length - 1; ++i) {
          a = 0.5 - c((this.myPosition.lat - this.results[i].googleMap[1].widthlatitude) * p) / 2 + c(this.results[i].googleMap[1].widthlatitude * p) * c((this.myPosition.lat) * p) * (1 - c(((this.myPosition.lon - this.results[i].googleMap[0].longlatitude) * p))) / 2;
          console.log('a', a);
          this.results[i].distance = Math.floor((12742 * Math.asin(Math.sqrt(a))) * 1000); // 2 * R; R = 6371 km

          this.myArr.push(this.results[i].distance);
          this.myArr.sort(function(a, b) {
            return b - a;
          });

          this.max = this.myArr[0];
          // this.myArr.sort();
          console.log('this.myArr.sort', this.myArr);
          console.log('this.max', this.max);

          // this.max =  Math.max(this.results[i].distance);
          // console.log('this.distance', this.results[i].distance);

        }

      },

      err => {
        console.log('this.result',"Error");
      }
    );
  }


}



