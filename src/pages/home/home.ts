import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { MenuPage } from "../menu/menu";
import { TestServices } from "../../services/services";
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';


@IonicPage({
  name: 'HomePage',
  segment: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email: string;
  password: string;
  result: any;
  statusLogin:boolean;


  title = 'Angular Form Validation Tutorial';
  angForm: FormGroup;

  constructor(public navCtrl: NavController,
              private alertController: AlertController,
              public http: HttpClient,
              public TestSer: TestServices,
              private fb: FormBuilder

  ) {

    this.email = "";
    this.password= "";
    this.statusLogin = true;
    // this.createForm();

  }

  // createForm() {
  //   this.angForm = this.fb.group({
  //     email: ['', Validators.required ],
  //     password: ['', Validators.required ]
  //   });
  // }


  login() {

    if (this.email.length == 0) {
      let wrongEmail = this.alertController.create({
        title: "email",
        message: "put info",
        buttons: [
          {
            text: "Ok"
          }
        ]
      });
      wrongEmail.present()
    }

    else if (this.password.length == 0) {
      let wrongPassword = this.alertController.create({
        title: "password",
        message: "put info",
        buttons: [
          {
            text: "Ok"
          }
        ]
      });
      wrongPassword.present()
    }

    else if (this.email.length != 0 && this.password.length != 0) {

      this.TestSer.postReq(this.email, this.password).subscribe((response: any) => {
          this.result = response;
          console.log('response', response);

          if( response != null ) {
            this.navCtrl.push(MenuPage,
              {
              userData: this.result
            }
            );
            console.log('Approved');
          }
          else {
            this.statusLogin = false;

            // let wrongPutInfo = this.alertController.create({
            //   title: "Field is not correct info",
            //   message: "put correct info",
            //   buttons: [
            //     {
            //       text: "Ok"
            //     }
            //   ]
            // });
            // wrongPutInfo.present()
          }
        },

        err => {
          console.log('3',"Error");
        }
      );
    }

  }








}
