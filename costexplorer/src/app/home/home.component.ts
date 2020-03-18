import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HomeService} from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private homeService : HomeService) { }
  public access: any;
  public secret: any;
  public data: any;
  public response:any;
  public SharedData:any;
  public err: any;
  public reg:any;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      accessKeyId: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(20)]],
      secretAccessKey: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(40)]],
      region:['',Validators.required]
    });
  }


get f() { return this.registerForm.controls; }

onSubmit() {

  this.submitted = true;
  this.access = this.f.accessKeyId.value;
  this.secret = this.f.secretAccessKey.value;
  this.reg=this.f.region.value;
  console.log('access', this.access);
  console.log('sec', this.secret);
  console.log('reg',this.reg);
  if (this.registerForm.invalid) {
    return;
  }
  alert('Your Aws credentials are configure successfully!! :-)');
  //this.registerForm.reset();
  this.homeService.postAwsCredentials(this.access,this.secret,this.reg)
      .subscribe(response => {
        this.data = response;
        this.data = JSON.stringify(this.data);
        console.log('response:',this.data);
        
      }, (error) => {
        //console.log('error during post is ', error)
        this.err=error;
        this.err = JSON.stringify(this.err);
        console.log('error is ',this.err);
      })
      
}
}


