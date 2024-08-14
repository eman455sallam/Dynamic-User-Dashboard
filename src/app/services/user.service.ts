import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private cacheService:CacheService) { }
  getUsers(apiUrl :string , page:number):Observable<any>
  {
    const cacheResponse=this.cacheService.get(apiUrl)

    let users=this.http.get(`${apiUrl}?page=${page}`);
    return users;
  }

  getUserById(apiUrl :string, id:any):Observable<any>
  {
    let user=this.http.get(apiUrl+id);
    return user;
  }
}
