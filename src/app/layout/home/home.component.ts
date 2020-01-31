import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [ 'userName', 'gender', 'email' , 'phoneNumber' , 'bloodGroupName'];
  getUserData = new MatTableDataSource<any>([]);
  userData = [];
  bloodGroupDetails: any;
  showCountry: boolean = false;
  showState: boolean = false;
  showDistrict: boolean = false;
  showUserTable:boolean = false;
  showButton:boolean = false;  
  buttonShow:boolean = false;
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

// district group send function 
    sendDistrictData(event){
      this.buttonShow = true;
      this.district = event.value
    }

    // send all data from admin to backend and get all user details
    sendFinalData(){
    let finalResult = {
        bloodGroup: this.bloodName,
        countryGroup: this.country,
        stateGroup: this.state,
        districtGroup: this.district
      }
     this.getUserDetails(finalResult).subscribe(
      (response: any) => {
        this.showUserTable = true;
        if (response) {
          this.getUserData = new MatTableDataSource(response.data);
          this.userData = response.data;
        }
     })
  }

  // get user details fuction which get the data
  getUserDetails(data){     
    console.log(data);
   return this.layoutService.getUserInformation(data)
  }

// send email funtion when user click the button and send the notification registered email id.
  sendEmail(data){
    this.showButton = true;
    this.layoutService.sendEmail(data).subscribe(res=>{  
    if(res['statusCode'] == 200){
      this.showButton = false;
    }
 this.layoutService.openSnackBar('email send to the registered user' , true);
    })
  }
  
}
