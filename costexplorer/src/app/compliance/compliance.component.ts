import { Component, OnInit } from '@angular/core';
import { ComplianceService } from './compliance.service';
@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.css']
})
export class ComplianceComponent implements OnInit {

  data: any;
  err: any;
  data1: any;
  err1: any;
  data2: any;
  err2: any;
  data3: any;
  err3: any;
  data4: any;
  err4: any;
  data5: any;
  err5: any;
  constructor(private complianceService: ComplianceService) { }

  ngOnInit() {

    this.complianceService.S3Policy().subscribe(response => {
      this.data = response;
      //this.data = JSON.stringify(this.data);
      console.log('S3Policy:', this.data);
    }, (error) => {

      this.err = error;
      //this.err = JSON.stringify(this.err);
      console.log('S3Policy error is ', this.err);
    });
    this.complianceService.S3Lifecycle().subscribe(response => {
      this.data1 = response;
      this.data1 = JSON.stringify(this.data1);
      console.log('S3Lifecycle:', this.data1);
    }, (error) => {
      this.err1 = error;
      this.err1 = JSON.stringify(this.err1);
      console.log('S3Lifecycle error is ', this.err1);
    });
    this.complianceService.S3TransferAcceleration().subscribe(response => {
      this.data2 = response;
      this.data2 = JSON.stringify(this.data2);
      console.log('S3TransferAcceleration:', this.data2);
    }, (error) => {
      this.err2 = error;
      this.err2 = JSON.stringify(this.err2);
      console.log('S3TransferAcceleration error is ', this.err2);
    });
    this.complianceService.Health().subscribe(response => {
      this.data3 = response;
      this.data3 = JSON.stringify(this.data3);
      console.log('Health:', this.data3);
    }, (error) => {
      this.err3 = error;
      this.err3 = JSON.stringify(this.err3);
      console.log('Health error is ', this.err3);
    });
    this.complianceService.ECS().subscribe(response => {
      this.data4 = response;
      this.data4 = JSON.stringify(this.data4);
      console.log('ECS:', this.data4);
    }, (error) => {
      this.err4 = error;
      this.err4 = JSON.stringify(this.err4);
      console.log('ECS error is ', this.err4);
    });
    this.complianceService.DAX().subscribe(response => {
      this.data5 = response;
      this.data5 = JSON.stringify(this.data5);
      console.log('DAX:', this.data5);
    }, (error) => {
      this.err5= error;
      this.err5 = JSON.stringify(this.err5);
      console.log('DAX error is ', this.err5);
    });
  }
}
  // cells = document.getElementById("test").getElementsByTagName("td");
  // for (i = 0;i < cells.length;i++) {
  //     if (cells[i].innerHTML == "NO") {
  //       cells[i].style.backgroundColor = "red";
  //     }
  // }

