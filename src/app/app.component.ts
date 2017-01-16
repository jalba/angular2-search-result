import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { HotelsService } from './hotels.service';


@Component({
  selector: 'app-root',
  template: `
    <div class="container" [style.display]="showDetails ? 'none' : 'block'">
      <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
        <sebm-google-map-marker 
          *ngFor="let hotel of hotelsList; let i = index"
          [iconUrl]="iconUrl" [latitude]="hotelsList[i].GeoCode.Latitude" 
          [longitude]="hotelsList[i].GeoCode.Longitude">
          <sebm-google-map-info-window [disableAutoPan]="true">
            <app-hotel-info-window [hotel]="hotel">
            </app-hotel-info-window>
          </sebm-google-map-info-window>
        </sebm-google-map-marker>
      </sebm-google-map>
    </div>
    <div [style.display]="showDetails ? 'block' : 'none'">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host, .container, .sebm-google-map-container {
   	  width: 100%;
   	  height: 100%;
    }
  `]
})
export class AppComponent implements OnInit {
  lat: number = 53.34; 
  lng: number = -6.26;
  zoom: number = 12;
  iconUrl: string = '../assets/img/icons/building-front-white.png';
  hotelsList: Array<any>;
  showDetails: boolean = false;

  constructor(private hotels:HotelsService, private router: Router) {}

  ngOnInit() {
    this.hotels.getHotelsList().subscribe(data => {
      this.hotelsList = data.HotelPricingSummaries.map(hotel => {
        hotel.GeoCode.Latitude = parseFloat(hotel.GeoCode.Latitude);
        hotel.GeoCode.Longitude = parseFloat(hotel.GeoCode.Longitude); 
        return hotel; 
      });
    });
    this.router.events.subscribe((event: any): void => {
      this.navigationInterceptor(event);
    });
  }
  navigationInterceptor(event) {
      if(event.url === '/') {
        this.showDetails = false;
      }
      if(event.url.indexOf('hotel') > -1) {
        this.showDetails = true;
      }
  }
}
