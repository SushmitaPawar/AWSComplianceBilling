import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComplianceService {

  constructor(private http: HttpClient) { }

  S3Policy() {
    return this.http.get('/AWSAPI/getS3Policy')
  }
  S3Lifecycle() {
    return this.http.get('/AWSAPI/getS3Lifecycle')
  }
  S3TransferAcceleration() {
    return this.http.get('/AWSAPI/getS3TransferAcceleration')
  }
  Health() {
    return this.http.get('/AWSAPI/getHealth')
  }
  ECS() {
    return this.http.get('/AWSAPI/getECScontainerInsights')
  }
  DAX()
  {
    return this.http.get('/AWSAPI/getDAXclusterEncryption')
  }
}
