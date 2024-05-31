import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, IEmployee } from '../pages/shared/models/Employee';
import { ItemApiResponse, Items } from '../pages/shared/models/items';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiurl = 'http://103.173.62.194/api/BillingApp/GetItemsList';
  constructor(private http: HttpClient) {}

  getAllItems(): Observable<ItemApiResponse<Items[]>> {
    debugger;
    return this.http.get<ItemApiResponse<Items[]>>(`${this.apiurl}`);

  }

  getAllEmployee(): Observable<ApiResponse<IEmployee[]>> {
    return this.http.get<ApiResponse<IEmployee[]>>(`${this.apiurl}`);
  }

  getEmployee(id: string): Observable<ApiResponse<IEmployee>> {
    return this.http.get<ApiResponse<IEmployee>>(`${this.apiurl}/${id}`);
  }

  createEmployee(employee: IEmployee): Observable<any> {
    return this.http.post(`${this.apiurl}`, employee);
  }

  updateEmployee(id: string, employee: IEmployee): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiurl}/${id}`);
  }
}
