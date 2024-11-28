import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], 
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = []; 
  filteredLocationList: HousingLocation[] = []; 

  constructor(private housingService: HousingService) {
    // Fetch all housing locations on component initialization
    // this.housingLocationList = this.housingService.getAllHousingLocations();
    // this.filteredLocationList = this.housingLocationList;
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    // If no search text, reset filtered list to the original list
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    // Filter the list based on city name
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
