import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bloodGroupDetails: any;
  showCountry: boolean = false;
  showState: boolean = false;
  showDistrict: boolean = false;
  countryGroupList: any;
  stateGroupList: any;
  bloodName = '';
  country = '';
  state = '';
  district = '';

  districtDetails: any;

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
    this.bloodGroupList();
    this.getCountryList();
  }


  // Blood Group list from backend side
  bloodGroupList() {
    this.layoutService.getBloodList().subscribe(
      response => {
        this.bloodGroupDetails = response['data'];
      }
    )
  }

  // Blood Group send function
  sendBloodGroup(event) {
    this.showCountry = true;
    this.bloodName = event.value;
  }


  // Country Group list from backend side
  getCountryList() {
    this.layoutService.getCountryList().subscribe(response => {
      this.countryGroupList = response['data'];
    })
  }

  // Country Group send function
  sendCountryData(event) {
    this.country = event.value;
    this.getStateList(event.value).subscribe(Response => {
      this.showState = true;
      this.stateGroupList = Response['data']
    })
  }

  // State Group list from backend side
  getStateList(country) {
    let data = {
      country
    }
    return this.layoutService.getStateList(data)
  }

  // state group send fuction
  sendStateData(event) {
    this.state = event.value;
    let data = {
      country: this.country,
      state: this.state
    }
    this.getDistrictList(data).subscribe(response => {
      this.showDistrict = true;
      this.districtDetails = response['data'];
    })
  }

  // District Group list from backend 
  getDistrictList(data) {
    return this.layoutService.getDistrictDetails(data);
  }

    sendDistrictData(event){
      this.district = event.value
    }

    sendFinalData(){
    let finalResult = {
        bloodGroup: this.bloodName,
        countryGroup: this.country,
        stateGroup: this.state,
        districtGroup: this.district
      }
      console.log(finalResult)
  }
}
