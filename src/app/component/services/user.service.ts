import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = 'https://randomuser.me/api';

  constructor(private http : HttpClient) { }

  // Fetch users
  getUsers(size: number):  Observable<any[]>{
    return this.http.get<any[]>( `${this.apiUrl}/?results=${size}`);
  }

  // Fetch one user using the user UUID
  getUser(userId: number = 2): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/?uuid=${userId}`);
  }

}
