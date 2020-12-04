import { Injectable } from '@angular/core';
import { Read } from '../model/read';
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

  diagnosticURL = "http://ec2-3-17-180-185.us-east-2.compute.amazonaws.com:8080/reads"

  sendSign(read: Read) {
    this.http.post(this.diagnosticURL, read, httpOptions).subscribe(con => con)
  }
}
