import { Injectable } from '@angular/core';


@Injectable()
export class LocalStor {
  // key: string;
  // value: any;
  // user: any;

  set(key, value) {
    console.log('Storage set key', key);
    console.log('Storage set value', value);
    localStorage.setItem( key, JSON.stringify(value));

  }

  get(key) {
    console.log('Storage get key', key);
    return JSON.parse(localStorage.getItem(key));
  }
}
