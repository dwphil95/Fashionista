import { Observable } from 'rxjs';
import { FashionItem } from './../models/fashionItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private fashionItemUrl = 'http://localhost:5000/fashionItem'
  constructor(private httpClient: HttpClient) { }

  getFashionItems(): Observable<FashionItem[]> {
    return this.httpClient.get<FashionItem[]>(`${this.fashionItemUrl}/fashionItemsFromDb`);
  }

  getFashionItembyId(id: any): Observable<FashionItem> {
    return this.httpClient.get<FashionItem>(`${this.fashionItemUrl}/fashionItemById/${id}`);
  }

  storeFashionItem(item: FashionItem): Observable<any> {
    return this.httpClient.post<any>(`${this.fashionItemUrl}/storeFashionItem`, item, httpOptions);
  }

  updateFashionItem(item: FashionItem): Observable<FashionItem> {
    return this.httpClient.put<FashionItem>(`${this.fashionItemUrl}/updateFashionItem`, item, httpOptions);
  }

  deleteFashionItem(id: any): Observable<FashionItem> {
    return this.httpClient.delete<FashionItem>(`${this.fashionItemUrl}/deleteFashionItemById/${id}`);
  }
}
