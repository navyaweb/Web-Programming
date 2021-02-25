import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];
  formattedAddress = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  recepieApi = 'https://api.edamam.com/search?q=';
  recepieAppid = '&app_id=6abdcd52';
  recepieKey = '&app_key=\n' +
      '3c3e97eba0d55a8e8ba8ce57bcf733b8';

  placesApi = 'https://api.foursquare.com/v2/venues/search?';
  clientdId = 'client_id=DB2NNS24ZJQSH4DKWCCFRJND5112HIFUY4XKDJFTRDLHPLTE';
  clientSecret = '&client_secret=2N3TU4SKJ1JGCKVAHCD0XXQKCJ4YPPAQIHJXO4DAYLHPT3TO';
  version = '&v=20180323';
  near1 = '&near=';
  query = '&query=';
  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {

    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      this._http.get( this.recepieApi + this.recipeValue + this.recepieAppid + this.recepieKey).subscribe((result: any) => {
        console.log(result);
        this.recipeList = Object.keys(result.hits).map(function (k) {
          const i = result.hits[k].recipe;
          return {name: i.label, icon: i.image, url: i.url};
        });

      });

    }

    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      this._http.get( this.placesApi  + this.clientdId + this.clientSecret + this.version
        + this.near1 + this.placeValue).subscribe((result: any) => {
        // console.log('result'+result);
        this.venueList = Object.keys(result.response.venues).map(function (k) {
          const i = result.response.venues[k];
          // console.log(i.location.labeledLatLngs[0].lng);
          console.log(i);
          return {name: i.name,currentLat:i.location.lat,currentLong:i.location.lng, formattedAddress: i.location.formattedAddress};
        });
      });
    }
  }
}
