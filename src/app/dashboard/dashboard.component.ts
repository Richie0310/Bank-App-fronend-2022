import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import party from "party-js";
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  logoutDiv: boolean = false
  fundTransferSuccessMsg: string = ''
  fundTransferErrorMsg: string = ''
  user: string = ''
  isCollapse: boolean = true
  currentAcno: number = 0
  balance: number = 0
  acno: any = ''
  deleteConfirmMsg: boolean = false
  deleteSpinnerDiv: boolean = false

  depositForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]

  })
  depositMsg: string = ''

  fundTransferForm = this.fb.group({
    toAcno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]

  })

  constructor(private api: ApiService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    // to check the account holder already logged in
    if (!localStorage.getItem('token')) {
      alert("please login")
      //navigate to login page
      this.router.navigateByUrl('')
    }
    if (localStorage.getItem('username')) {
      this.user = localStorage.getItem('username') || ''
    }

  }
  collapse() {
    this.isCollapse = !this.isCollapse
  }

  getBalance() {
    if (localStorage.getItem('currentAcno')) {
      this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || '')
      console.log(this.currentAcno);
      this.api.getBalance(this.currentAcno)
        .subscribe((result: any) => {
          console.log(result);
          this.balance = result.balance


        })

    }

  }

  // deposit
  deposit() {
    if (this.depositForm.valid) {
      let amount = this.depositForm.value.amount
      this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || '')
      this.api.deposit(this.currentAcno, amount)
        .subscribe(
          // success
          (result: any) => {
            console.log(result);
            this.depositMsg = result.message
            setTimeout(() => {
              this.depositForm.reset()
              this.depositMsg = ''
            }, 3000)

          },
          (result: any) => {
            this.depositMsg = result.error.message
          }
        )
    }
    else {
      alert('Invalid form')
    }
  }

  // show confetti
  showconfetti(source: any) {
    party.confetti(source);

  }

  // transfer

  transfer() {
    if (this.fundTransferForm.valid) {
      let toAcno = this.fundTransferForm.value.toAcno
      let pswd = this.fundTransferForm.value.pswd
      let amount = this.fundTransferForm.value.amount
      // Make api call for fund 
      this.api.fundTransfer(toAcno, pswd, amount)
        .subscribe(
          // success
          (result: any) => {
            this.fundTransferSuccessMsg = result.message
            setTimeout(() => {
              this.fundTransferSuccessMsg = ''
            }, 3000)
          },
          //client error
          (result: any) => {
            this.fundTransferErrorMsg = result.error.message
            setTimeout(() => {
              this.fundTransferErrorMsg = ''
            }, 3000)
          }
        )

    }
    else {
      alert('invalid form')
    }

  }
  // To clear fund transfer form
  clearFundTransferForm() {
    this.fundTransferErrorMsg = ''
    this.fundTransferSuccessMsg = ''
    this.fundTransferForm.reset()

  }

  // logout
  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("currentAcno")
    this.logoutDiv = true
    setTimeout(() => {
      //navigate to login page
      this.router.navigateByUrl('')
      this.logoutDiv = false
    }, 4000);


  }

  // deleteAccountfromNavbar
  deleteAccountFromNavBar() {
    this.acno = localStorage.getItem('currentAcno')
    this.deleteConfirmMsg = true
  }

  onCancel() {
    this.acno = ''
    this.deleteConfirmMsg = false
  }

  onDelete(event: any) {
    let deleteAcno = JSON.parse(event)
    this.api.deleteAccount(deleteAcno)
      .subscribe(
        (result: any) => {
          this.acno=''
          localStorage.removeItem("token")
          localStorage.removeItem("username")
          localStorage.removeItem("currentAcno")
          this.deleteSpinnerDiv = true

          setTimeout(() => {
            //navigate to login
            this.router.navigateByUrl('')
            this.deleteSpinnerDiv = false

          }, 4000);
        },
        (result:any)=>{
          alert(result.error.message)
        }
        )
  }

}
