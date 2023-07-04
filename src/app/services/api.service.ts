import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Truck } from '../models/truck';
import { User } from '../models/user';
import { Schedule } from '../models/shedule';
import { Maintenance } from '../models/maintanence';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7102';

  constructor(private http: HttpClient) {}

  
  getAllTrucks(): Observable<Truck[]> {
    return this.http.get<Truck[]>(`${this.baseUrl}/trucks`);
  }

  getAllDrivers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/drivers`);
  }
  
  getAllDispatchers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/dispatchers`);
  }

  getAllMechanics(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/mechanics`);
  }

  getAllMaintenance(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(`${this.baseUrl}/maintenances`);
  }

  getAllScheduler(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.baseUrl}/schedules`);
  }

  saveSchedulet(scheduler: any): Observable<any> {
    console.log("api",scheduler)
    return this.http.post<any>(`${this.baseUrl}/schedules`, scheduler).pipe(
      catchError((error: any) => {
        console.error('Error submitting Scheduler data', error);
        throw error;
      })
    );
  }


}
