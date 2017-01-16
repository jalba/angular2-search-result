import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HotelsService } from '../hotels.service';

@Component({
  selector: 'app-hotel-details',
  template: `
    <h3>{{ details.HotelName }}</h3>
    <div class="image-container">
      <img (click)="changeImage('forward') "[src]="displayImage" />
      <div class="arrows">
        <span class="back" (click)="changeImage('back')"> < </span>
        <span class="forward" (click)="changeImage('forward')"> > </span>
      </div>
    </div>
    <div class="hotel-details">
     <div class="stars">
       <img src="../../assets/img/star.png" class="star" *ngFor="let star of stars"/>
     </div>
     <div *ngFor="let addressLine of address">{{ addressLine }}</div>
     <div>Telephone: {{ details.Phone }}</div>
     <div>Fax: {{ details.Fax }}</div>
    </div>
    <div class="description" [innerHtml]="details.HotelDescription"></div>
  `,
  styles: [`
    .image-container {
      float: left;
      margin-right: 20px;
    }
    .hotel-details {
      float: left;
      width: 30%;
    }
    .description {
      clear: both;
      width: 100%;
    }
    .arrows {
      bottom: 23px;
      color: white;
      cursor: pointer;
      left: 91%;
      position: relative;
    }
    .star {
      width: 5%;
      display: inline;
      float: left;
    }
    .stars {
      width: 100%;
      float: inherit;
    }
  `]
})
export class HotelDetailsComponent implements OnInit {
  details: Object = {};
  displayImage: string = '';
  stars: Array<any> = Array(5);
  address: Array<any> = [];
  constructor(public route: ActivatedRoute, public hotels: HotelsService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hotels.getHotelDetails(params['id']).subscribe(data => {
        this.details = data;
        this.displayImage = data.Images[0];
        this.stars = Array(data.StarRating);
        this.address = data.AddressLines;
      });
    });
  }
  
  changeImage(direction) {
    const images = this.details['Images'];
    const currentIdx = images.indexOf(this.displayImage);
    const idxForward = currentIdx === images.length - 1 ? 0 : currentIdx + 1;
    const idxBack = currentIdx ? currentIdx - 1 : images.length - 1;
    const nextIdx = direction === 'forward' ? idxForward : idxBack;
    this.displayImage = images[nextIdx];
  }

}
