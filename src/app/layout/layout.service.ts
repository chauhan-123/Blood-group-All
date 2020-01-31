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


  getBloodList(){
    return this.http.get(`${this.Url}blood_Group`);
  }

  getCountryList(){
    return this.http.get(`${this.Url}country_Group`);
  }

  getStateList(info){
    console.log(info , "info")
    return this.http.post(`${this.Url}state_Group`, info);
  }
  getDistrictDetails(info){
    console.log(info , "info")
    return this.http.post(`${this.Url}district_Group` , info);
  }

  getUserInformation(info){
    return this.http.post(`${this.Url}user_group` , info);
  }

  sendEmail(info){
    let data = {
      info:info
    }
    return this.http.post(`${this.Url}email_data` , data);
  }

  openSnackBar(message: string, successflag: boolean) {
    this.snackBar.open(message, undefined, this.snackBarConfig(successflag));
}
}
