import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  housingService = inject(HousingService)
  housingLocation: HousingLocation | undefined

  userFormgroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    // const ID = Number(this.route.snapshot.params['id']);
    // this.housingLocation = this.housingService.getHousingLocationById(ID)
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }
  submitApplication() {
    // Use the form values to call the service method
    this.housingService.submitApplication(
      this.userFormgroup.value.firstName ?? '',
      this.userFormgroup.value.lastName ?? '',
      this.userFormgroup.value.email ?? ''
    );
  }
}
