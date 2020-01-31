import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  Url = environment.baseUrl;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';
  public setAutoHide = true;
  public autoHide = 1000;
  public addExtraClass = false;
  constructor(public http:HttpClient ,  private snackBar: MatSnackBar ) { }

  // this fuction is used for snackbar functionlity.

  public snackBarConfig(successflag) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    if (!successflag) {
        config.panelClass = ['red-snackbar']
    }
    else {
        config.panelClass = this.addExtraClass ? ['party'] : undefined;
    }
    return config;
}

// this api is use for get blood list from backend side.

  getBloodList(){
    return this.http.get(`${this.Url}blood_Group`);
  }

  // this api is used for get country list from backend side.

  getCountryList(){
    return this.http.get(`${this.Url}country_Group`);
  }

  // this api is used for get state list from backend side.

  getStateList(info){
    return this.http.post(`${this.Url}state_Group`, info);
  }

// this api is used for get district list from backend side.

  getDistrictDetails(info){
    console.log(info , "info")
    return this.http.post(`${this.Url}district_Group` , info);
  }

  // this api is used for get user Information from backend side.
  
  getUserInformation(info){
    return this.http.post(`${this.Url}user_group` , info);
  }

  // this api is used for send email notification functionlity.

  sendEmail(info){
    let data = {
      info:info
    }
    return this.http.post(`${this.Url}email_data` , data);
  }

  // this function is used for mat snack bar functionlity.
  
  openSnackBar(message: string, successflag: boolean) {
    this.snackBar.open(message, undefined, this.snackBarConfig(successflag));
}
}
