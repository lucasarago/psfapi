import { Component, OnInit } from '@angular/core';
import { eventDTO } from "src/app/models/events";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(public route:Router, public eventService: EventsService) { }

  newEvent: FormGroup;
  rowCountParams: number = 1;
  rowCountEk: number = 1;
  ngOnInit(): void {
    this.newEvent = this.formGroupEventCreator();
  }

  public formGroupEventCreator(): FormGroup {
    return new FormGroup({
      eventId: new FormControl('', [Validators.required]),
      entityType: new FormControl('', [Validators.required]),
      effectiveStartDate: new FormControl('', [Validators.required]),
      publishedAt: new FormControl('', [Validators.required]),
      publishedBy: new FormControl('', [Validators.required]),
      repost: new FormControl('', [Validators.required]),
      entityKeys: new FormControl('', [Validators.required]),
      params: new FormControl('', [Validators.required])
    });
  }

  public saveNewEvent():void{
    console.log(this.newEvent)
    if(this.newEvent.valid){
      let event = this.buildEventData();
      this.eventService.saveEvent(event)
      .subscribe(item => {
        alert('Created');
        this.route.navigate(["events/all"]);
      });
    }else{
      alert('Error')
    }
  }

  public buildEventData():eventDTO{
    return {
      eventId: this.eventId.value,
      entityType: this.entityType.value,
      effectiveStartDate: this.effectiveStartDate.value,
      publishedAt: this.publishedAt.value,
      publishedBy: this.publishedBy.value,
      repost: this.repost.value,
      entityKeys: this.entityKeys.value,
      params: this.params.value
    }
  }

  public get eventId(){
    return this.newEvent.get('eventId');
  }

  public get entityType(){
    return this.newEvent.get('entityType');
  }

  public get effectiveStartDate(){
    return this.newEvent.get('effectiveStartDate');
  }

  public get publishedAt(){
    return this.newEvent.get('publishedAt');
  }

  public get publishedBy(){
    return this.newEvent.get('publishedBy');
  }

  public get repost(){
    return this.newEvent.get('repost');
  }

  public get entityKeys(){
    return this.newEvent.get('entityKeys');
  }

  public get params(){
    return this.newEvent.get('params');
  }

  public addRowParams(){
    this.rowCountParams += 1;
    let rows = `
    <th scope="row">${this.rowCountParams}</th>
          <td>
              <input type="text" class="form-control" id=paramName${this.rowCountParams.toString()}/>
          </td>
          <td>
              <input type="text" class="form-control" id=paramValue${this.rowCountParams.toString()}/>
          </td>
    `
    document.getElementById('tbodyRowParams').innerHTML += rows;
  }

  public deleteRowParams(){
    let table = document.getElementById('tbodyRowParams');
    table.removeChild(table.lastElementChild);
    this.rowCountParams -= 1;
  }

  public addRowEntityK(){
    this.rowCountEk += 1;
    let rows = `
    <th scope="row">${this.rowCountEk}</th>
          <td>
              <input type="text" class="form-control" id=paramName${this.rowCountEk.toString()}/>
          </td>
          <td>
              <input type="text" class="form-control" id=paramValue${this.rowCountEk.toString()}/>
          </td>
    `
    document.getElementById('tbodyRowEK').innerHTML += rows;
  }

  public deleteRowEntityK(){
    let table = document.getElementById('tbodyRowEK');
    table.removeChild(table.lastElementChild);
    this.rowCountEk -= 1;
  }
}
