import { EditProfileComponent } from './profile/edit-profile.component';
import { WedPhotographerComponent } from './photographers/wed-photographer/wed-photographer.component';
import { PhotogrpherNavComponent } from './photogrpher-nav/photogrpher-nav.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RegisterComponent} from "./register/register.component";
import {PhotographersComponent} from "./photographers/photographers.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {PhotographerRegisterComponent} from "./register/photographer-register/photographer-register.component";
import {UserRegisterComponent} from "./register/user-register/user-register.component";
import {PhotographerLoginComponent} from "./login/photographer-login/photographer-login.component";
import {UserLoginComponent} from "./login/user-login/user-login.component";
import {ProProfileComponent} from "./photographers/pro-profile/pro-profile.component";
import { EventPhotographerComponent } from './photographers/event-photographer/event-photographer.component';
import { ModelPhotographerComponent } from './photographers/model-photographer/model-photographer.component';
import { ProdPhotographerComponent } from './photographers/prod-photographer/prod-photographer.component';
import { FashionPhotographerComponent } from './photographers/fashion-photographer/fashion-photographer.component';
import { SportPhotographerComponent } from './photographers/sport-photographer/sport-photographer.component';
import { ArchiPhotographerComponent } from './photographers/archi-photographer/archi-photographer.component';
import { TravelPhotographerComponent } from './photographers/travel-photographer/travel-photographer.component';
import {ViewProfileComponent} from './profile/view-profile.component';
import { PhotographersAdComponent } from './photographers/photographers-ad/photographers-ad.component';

const routes: Routes = [

  { path: 'welcome',pathMatch: 'full', component: HomeComponent },
  { path: 'register', component: RegisterComponent,
    children: [
      {path: 'photographer-register', component: PhotographerRegisterComponent},
      {path: 'user-register', component: UserRegisterComponent}
    ]
  },
  { path: 'photographers', component: PhotogrpherNavComponent,
  children: [
    {path: 'all', component: PhotographersComponent},
    {path: 'wedding-photographers', component: WedPhotographerComponent},
    {path: 'event-photographers', component: EventPhotographerComponent},
    {path: 'model-photographers', component: ModelPhotographerComponent},
    {path: 'product-photographers', component: ProdPhotographerComponent},
    {path: 'fashion-photographers', component: FashionPhotographerComponent},
    {path: 'sports-photographers', component: SportPhotographerComponent},
    {path: 'archi-photographers', component: ArchiPhotographerComponent},
    {path: 'travel-photographers', component: TravelPhotographerComponent},
    {path: 'advanced-photographers', component: PhotographersAdComponent}

  ]},

  {path: 'pro-profile/:id', component: ProProfileComponent},
  { path: 'login', component: LoginComponent,
    children: [
      {path: 'photographer-login', component: PhotographerLoginComponent},
      {path: 'user-login', component: UserLoginComponent}
    ]
  },
  {path: 'view-profile', component: ViewProfileComponent},
  {path: 'profile', component: EditProfileComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
 