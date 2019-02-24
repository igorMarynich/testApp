import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomeModule' },
  { path: 'menu', loadChildren: './pages/about/menu.module#MenuModule' },
  { path: 'my-place', loadChildren: './pages/about/my-place.module#MyPlaceModule' },
  { path: 'my-profile', loadChildren: './pages/about/menu.module#MyProfileModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
