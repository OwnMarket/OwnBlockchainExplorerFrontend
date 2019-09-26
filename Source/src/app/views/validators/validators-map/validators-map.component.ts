import { Component, AfterViewInit } from '@angular/core';
import { latLng, Layer, icon, marker, tileLayer, Popup } from 'leaflet';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ValidatorGeo } from '@app/core/models/validator-geo.model';
import { ValidatorsService } from '../validators.service';

@Component({
  selector: 'app-validators-map',
  templateUrl: './validators-map.component.html',
  styleUrls: ['./validators-map.component.scss']
})
export class ValidatorsMapComponent implements AfterViewInit {
  subscription: Subscription;
  validators: ValidatorGeo[];
  filtered: any = [];

  markers: Layer[] = [];

  // dark map theme http://tile.stamen.com/toner/{z}/{x}/{y}.png

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 2,
    center: latLng(30, 0)
  };

  constructor(private service: ValidatorsService) {}

  ngAfterViewInit(): void {
    this.loadData();
  }

  addMarker(validator: ValidatorGeo) {
    const newMarker = marker([parseFloat(validator.location.latitude), parseFloat(validator.location.longitude)], {
      icon: icon({
        iconSize: [25, 25],
        iconAnchor: [0.5, 0.5],
        iconUrl: 'assets/images/marker.svg'
      }),
      title: validator.networkAddress
    });

    const localValidators = this.validatorsPerAddress(validator.location.latitude, validator.location.longitude);

    let content = `<h4>${localValidators.length} in ${validator.location.city}, ${
      validator.location.country_name
    } <img src="${validator.location.country_flag}" width="20" alt="flag" /></h4>`;

    for (const item of localValidators) {
      content += `
      <li style="list-style:none; clear:both;"><strong>${item.networkAddress}</strong>, ${item.location.isp}</li>
      `;
    }

    const popup = new Popup({}, this.options.layers[0]);
    popup.setContent(content);
    newMarker.bindPopup(popup);
    newMarker.togglePopup();
    this.markers.push(newMarker);
  }

  loadData() {
    this.subscription = this.service
      .fetchValidatorGeo()
      .pipe(map(response => response.data))
      .subscribe(data => {
        if (data.length > 0) {
          this.validators = data;
          this.validators.forEach(validator => {
            this.addMarker(validator);
          });
        }
      });
  }

  validatorsPerAddress(lat: string, lon: string): ValidatorGeo[] {
    return this.validators.filter(item => lat === item.location.latitude && lon === item.location.longitude);
  }
}
