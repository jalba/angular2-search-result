import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-hotel-info-window',
  template: `
    <div>
      <img class="thumbnail" [src]="hotel.ThumbnailUrl" />
      <div>
        <div class="line">
          <a routerLink="/hotel/{{ hotel.HotelId }}" routerLinkActive="active">{{ hotel.HotelName }}</a>
        </div>
        <img src="../../assets/img/star.png" class="stars line" *ngFor="let star of stars"/>
        <div class="line">
          Address: {{ hotel.Address }}
        </div>
        <div class="line">
          price: {{ getCurrency() }} {{ hotel.Price }}
        </div>
        <div class="line">
          Breakfast: {{ areMealsAvailable(hotel.BreakfastAvailable) }}
        </div>
        <div class="line">
          Dinner: {{ areMealsAvailable(hotel.DinnerAvailable) }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    img {
      width: 20%;
    }
    .thumbnail {
      float: left;
      width: 28%;
    }
    .line {
      margin-bottom: 5px;
    }
    .stars {
      width: 3%;
    }
  `]
})
export class HotelInfoWindowComponent implements OnInit {
  @Input() hotel: Object;
  stars: Array<any> = Array(5);
  getCurrency() {
    const currencies = {
      EUR: '€',
      GBP: '£',
      USD: '$'
    };
    return currencies[this.hotel['CurrencyCode']];
  }
  areMealsAvailable(isMealAvailable) {
    return isMealAvailable ? 'available' : 'not available';
  }
  ngOnInit() {
    this.stars = Array(this.hotel['StarRating']);
  }
}
