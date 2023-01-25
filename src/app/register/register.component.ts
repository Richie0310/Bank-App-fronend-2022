import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Register form group 
  registerForm = this.fb.group({
    // form array
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]]
  })

  constructor(private fb: FormBuilder, private api:ApiService, private router:Router) {

  }
  register() {
    if (this.registerForm.valid) {
      let uname = this.registerForm.value.uname
      let acno = this.registerForm.value.acno
      let pswd = this.registerForm.value.pswd
      this.api.register(uname,acno,pswd) // returns observable. so, subscribe
      .subscribe(
        // SUCCESS
        (result:any)=>{
        alert(result.message)
        // navigate to login page
        this.router.navigateByUrl('')        
      },
      // cllient
      (result:any)=>{
        alert(result.error.message)
      }
      )
    }
    else {
      alert('invalid form')
    }
  }

}


