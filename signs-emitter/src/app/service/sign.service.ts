import { Injectable } from '@angular/core';
import { Sign } from '../model/sign';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(private http: HttpClient) { }

  diagnosticURL = "http://localhost:8080/signs"

  sendSign(sign: Sign) {
    console.log(sign)
    this.http.post(this.diagnosticURL, sign, httpOptions).subscribe(sub => console.log(sub))
  }
}
