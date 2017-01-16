import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { AppComponent } from './app.component';
import { HotelsService } from './hotels.service';
import { HotelInfoWindowComponent } from './hotel-info-window/hotel-info-window.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';

const appRoutes: Routes = [{ path: 'hotel/:id',      component: HotelDetailsComponent }];

@NgModule({
  declarations: [
    AppComponent,
    HotelInfoWindowComponent,
    HotelDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyATnphgY2CdJOUsEKBg7WdmTQ3zkhDo_KQ'
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HotelsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
