import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {APIResponse} from '../Objects/api-response';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = environment.apiURL;
  private USER_TOKEN = 'uid';
  isLoginSubject = new BehaviorSubject<boolean>(this.hasUser());

  constructor(private router: Router, private http: HttpClient) {
  }

  getUid() {
    return sessionStorage.getItem('uid');
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  login(data: User): Observable<APIResponse<any>> {
    return this.http.post<any>(`${this.apiURL}login`, data);
  }

  register(data: User): Observable<APIResponse<any>> {
    return this.http.post<any>(`${this.apiURL}register`, data);
  }

  storeToken(uid) {
    sessionStorage.setItem(this.USER_TOKEN, uid);
  }

  logout(): void {
    sessionStorage.removeItem('uid');
    this.isLoginSubject.next(false);
    this.router.navigate(['/login']);
  }

  hasUser(): boolean {
    return !!sessionStorage.getItem('uid');
  }
}


export interface User {
  email: string;
  password: string;
}
