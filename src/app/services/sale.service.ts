import { Sale } from './../models/sale';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private saleUrl = 'http://localhost:5000/sale'
  constructor(private httpClient: HttpClient) { }

  storeSale(sale: Sale): Observable<any> {
    return this.httpClient.post<any>(`${this.saleUrl}/storeSale`, sale, httpOptions);
  }
}
