import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { eventDTO } from "../models/events";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'events';

  public getAllEvents(): Observable<eventDTO[]>{
    return this.http.get<eventDTO[]>(`${this.apiURL}`);
  }

  public getEventById(id:string): Observable<eventDTO>{
    return this.http.get<eventDTO>(`${this.apiURL}/${id}`);
  }

  public saveEvent(event: eventDTO): Observable<eventDTO>{
    return this.http.post<eventDTO>(`${environment.apiURL}event`,event, {
      headers: new HttpHeaders({
        "content-type" : "application/json"
      })
    });
  }

  public deleteEvent(eventId: String): Observable<eventDTO>{
    return this.http.delete<eventDTO>(`${environment.apiURL}event/${eventId}`);
  } 

  public getEventXml(eventId: string): Observable<string>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8' );
    return this.http.get(`${environment.apiURL}event/${eventId}`, {headers, responseType: 'text'});
  }

  public editEvent(eventId: string, event: eventDTO){
    return this.http.put(`${environment.apiURL}event/${eventId}`, event, {
      headers: new HttpHeaders({
        "content-type" : "application/json"
      })
    });
  }
}
