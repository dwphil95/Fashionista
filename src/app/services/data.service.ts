import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {
    public cartSize: BehaviorSubject<number> = new BehaviorSubject<number>(0);
}