import { AuthInterceptor } from './services/auth-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PhotographersComponent } from './photographers/photographers.component';
import { FooterComponent } from './footer/footer.component';
import { IntroComponent } from './home/intro/intro.component';
import { PhotographersService } from './services/photographers.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { from } from 'rxjs';
import { UserRegisterComponent } from './register/user-register/user-register.component';
import { PhotographerRegisterComponent } from './register/photographer-register/photographer-register.component';
import {AppRoutingModule} from "./app-routing.module";
import { UserLoginComponent } from './login/user-login/user-login.component';
import { PhotographerLoginComponent } from './login/photographer-login/photographer-login.component';
import { ProProfileComponent } from './photographers/pro-profile/pro-profile.component';
import { PhotogrpherNavComponent } from './photogrpher-nav/photogrpher-nav.component';
import { WedPhotographerComponent } from './photographers/wed-photographer/wed-photographer.component';
import { EventPhotographerComponent } from './photographers/event-photographer/event-photographer.component';
import { ModelPhotographerComponent } from './photographers/model-photographer/model-photographer.component';
import { ProdPhotographerComponent } from './photographers/prod-photographer/prod-photographer.component';
import { FashionPhotographerComponent } from './photographers/fashion-photographer/fashion-photographer.component';
import { SportPhotographerComponent } from './photographers/sport-photographer/sport-photographer.component';
import { ArchiPhotographerComponent } from './photographers/archi-photographer/archi-photographer.component';
import { TravelPhotographerComponent } from './photographers/travel-photographer/travel-photographer.component';
import { EditProfileComponent } from './profile/edit-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ViewProfileComponent} from './profile/view-profile.component';
import { PageNumComponent } from './photographers/page-num/page-num.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PhotographersComponent,
    FooterComponent,
    IntroComponent,
    UserRegisterComponent,
    PhotographerRegisterComponent,
    UserLoginComponent,
    PhotographerLoginComponent,
    ProProfileComponent,
    PhotogrpherNavComponent,
    WedPhotographerComponent,
    EventPhotographerComponent,
    ModelPhotographerComponent,
    ProdPhotographerComponent,
    FashionPhotographerComponent,
    SportPhotographerComponent,
    ArchiPhotographerComponent,
    TravelPhotographerComponent,
    EditProfileComponent,
    ViewProfileComponent,
    PageNumComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  //   RouterModule.forRoot([
  //     { path: 'register', component: RegisterComponent },
  //     { path: 'photographers', component: PhotographersComponent },
  //     { path: 'photographerlogin', component: LoginComponent },
  //     // { path: 'products/:id',
  //     //   canActivate:[ProductDetailsGuard],
  //     //   component: ProductDetailComponent },
  //
  //     { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  //     { path: '**', redirectTo: 'welcome', pathMatch: 'full' }//404 not found page route
  //   ]
  // )
    AppRoutingModule
  ],
  providers: [
    PhotographersService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
