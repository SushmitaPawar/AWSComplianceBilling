import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CostService {
  constructor(private http: HttpClient) { 
  }
postAPIData(region,granularity,Start,End){
   var awsDetails = {
  'region' : region,
  'Granularity': granularity,
  'Start': Start,
  'End' : End
}
  return this.http.post('/AWSAPI/postData', awsDetails)
}
getApiServices(){
  return this.http.get('/AWSAPI/getServices')
}
getAPIData(){
  return this.http.get('/AWSAPI/getData')
}
}
