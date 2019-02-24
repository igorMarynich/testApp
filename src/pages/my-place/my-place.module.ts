import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPlacePage } from './my-place';

@NgModule({
  declarations: [
    MyPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(MyPlacePage),
  ],
})
export class MyPlacePageModule {}
