import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  // register request to httpclient

  register(uname: any, acno: any, pswd: any) {
    const body = {
      uname,
      acno,
      pswd
    }

    // server call to register an account and return response to register component
    return this.http.post('http://localhost:3000/register', body)
  }

  // login
  login(acno: any, pswd: any) {
    const body = {
      acno,
      pswd
    }

    // server call to login an account and return response to login component
    return this.http.post('http://localhost:3000/login', body)
  }

  // appending token to the http header
  appendToken() {
    // fetch token from local storage
    const token = localStorage.getItem('token') || ''
    // create http reader
    var headers = new HttpHeaders()
    if (token) {
      // append token inside headers
      headers = headers.append('tok-access', token)
      // overload
      options.headers=headers
    }
    return options
  }



  // Get balance

  getBalance(acno: any) {
    return this.http.get('http://localhost:3000/getBalance/' + acno, this.appendToken())
  }

  // Deposit
  deposit(acno:any,amount:any){
    const body = {
      acno,
      amount
    }
    return this.http.post('http://localhost:3000/deposit',body,this.appendToken())

  }

  // fund transfer
  fundTransfer(toAcno:any,pswd:any,amount:any){
    const body={
      toAcno,
      pswd,
      amount
    }
    return this.http.post('http://localhost:3000/fundTransfer',body,this.appendToken())
  }

  // All transactions
  getAllTransactions(){
    return this.http.get('http://localhost:3000/all-transactions',this.appendToken())
  }

  // deleteAccount api
  deleteAccount(acno:number){
    return this.http.delete('http://localhost:3000/delete-account/'+acno,this.appendToken())

  }
}
