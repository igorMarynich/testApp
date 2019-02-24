import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the TestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TestServices {

  email: string;
  password: string;


  constructor(public http: HttpClient) {
    this.email = "";
    this.password = "";


  }

  postReq(email, password){
    this.email = email;
    this.password = password;

    return this.http.post("http://localhost:3000/users/find", {
      email: this.email,
      password: this.password,
    })

  }

  getReq(){
    return this.http.get("http://localhost:3000/places/")
  }


}
