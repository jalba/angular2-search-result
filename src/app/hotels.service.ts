import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'; 
import 'rxjs/add/operator/map';

@Injectable()
export class HotelsService {

  constructor(private http: Http) { }

  getHotelsList() {
  	return this.http.get('http://roomex.mockable.io/locationSearch').map((res: Response) => res.json());
  }
  getHotelDetails(id) {
  	return this.http.get('http://roomex.mockable.io/hotel/' + id).map((res: Response) => res.json());
  }

}
