import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:5000/api/users'
  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.userUrl}/allUsers`);
  }

  getUserByUsername(username: any): Observable<User> {
    return this.httpClient.get<User>(`${this.userUrl}/userByUsername/${username}`);
  }

  makeUserAdmin(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.userUrl}/makeAdmin`, user, httpOptions);
  }
}
