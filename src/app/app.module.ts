import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ProductModule } from './products/product.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './shared/pagenotfound.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'welcome', component: WelcomeComponent},
      {path:'', redirectTo: 'welcome', pathMatch: 'full'},
      {path:'**', component: PagenotfoundComponent}
    ]),
    ProductModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PagenotfoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
