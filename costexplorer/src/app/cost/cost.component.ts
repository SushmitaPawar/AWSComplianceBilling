import { Component, OnInit } from '@angular/core';
import { NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CostService} from './cost.service';
import {Router } from '@angular/router';
@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css']
})
export class CostComponent implements OnInit {
  region;
  message:string;
  registerForm: FormGroup;
  submitted = false;
  constructor(private costService : CostService,private formBuilder: FormBuilder) {
  }
  public ser:any;
  public gran: any;
  public reg: any;
  public start:any;
  public end:any;
  public data: any;
  public response:any;
  public SharedData:any;
  public err: any;
  public regions:any;
  public services:any;
  ngOnInit() {
    
    this.registerForm = this.formBuilder.group({
      region: ['',Validators.required],
      granularity: ['',Validators.required],
      Start: ['', Validators.required],
      End: ['', Validators.required],
      service:['',Validators.required]
  });
this.costService.getAPIData().subscribe(response => {
  this.regions = response;
  console.log('regions:',this.regions);
},(error) => {
  console.log('error during post is ', error)
  })

this.costService.getApiServices().subscribe(response => {
  this.services = response;
  console.log('services:',this.services);}
  ,(error)=>{
    console.log('error during service is',error)
  })

}


  
get f() { return this.registerForm.controls; }
  onSubmit() {

    this.submitted = true;
    this.reg=this.f.region.value;
    this.gran=this.f.granularity.value;
    this.start=this.f.Start.value;
    this.end=this.f.End.value;
    this.ser=this.f.service.value;
    console.log('service',this.ser);
    console.log('region',this.reg);
    console.log('granule',this.gran);
    console.log('startd',this.start);
    console.log('endd',this.end);
    if (this.registerForm.invalid) {
      return;
  }
    alert('SUCCESS!! :-)');
    this.costService.postAPIData(this.reg,this.gran,this.start,this.end)
      .subscribe(response => {
        this.data = response;
        this.data = JSON.stringify(this.data);
        console.log('response:',this.data);
        
      }, (error) => {
        console.log('error during post is ', error)
        this.err=error;
        console.log('error is ',this.err);
      })
  }
}