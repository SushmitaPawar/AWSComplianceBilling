import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  postAwsCredentials(accessKeyId,secretAccessKey,region){
    var awsDetails = {
   'accessKeyId' : accessKeyId,
   'secretAccessKey' : secretAccessKey,
   'region': region
 }
 return this.http.post('/AWSAPI/postCredentials', awsDetails)
}
}
