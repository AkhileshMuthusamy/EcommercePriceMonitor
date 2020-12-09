import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponse} from '../shared/Objects/api-response';
import {environment} from '../../environments/environment';
import {AuthService} from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = environment.apiURL;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  addProductAPI(url: string): Observable<APIResponse<any>> {
    const data = {
      uid: this.authService.getUid(),
      url
    };
    return this.http.post<any>(`${this.apiURL}product`, data);
  }

  getUserProductAPI(): Observable<APIResponse<any>> {
    return this.http.get<APIResponse<any>>(`${this.apiURL}product?uid=${this.authService.getUid()}`);
  }

  deleteUserProduct(pid: string): Observable<APIResponse<any>> {
    return this.http.delete<any>(`${this.apiURL}product?pid=${pid}`);
  }
}
