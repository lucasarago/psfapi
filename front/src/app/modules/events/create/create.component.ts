import { Component, OnInit } from '@angular/core';
import { eventDTO } from "src/app/models/events";
import { paramDTO } from "src/app/models/param";
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
  rowCountParams: number = 0;
  rowCountEk: number = 0;
  paramsDTO: paramDTO[] = [];
  name: string = '';
  value: string = '';

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
    console.log(this.entityKeys)
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
      params: this.params
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
    return this.paramsDTO;
  }

  public addRowParams(name, value){
    this.rowCountParams += 1;
    let rows = `
    <tr>
      <th scope="row">${this.rowCountParams}</th>
            <td>
                <input type="text" class="form-control" id=paramName${this.rowCountParams.toString()} value="${name}" disabled/>
            </td>
            <td>
                <input type="text" class="form-control" id=paramValue${this.rowCountParams.toString()} value="${value}" disabled/>
            </td>
            <td>
                <i class="bi bi-x-square-fill" id="plus-two" (click)="deleteRowParams()"></i>
            </td>
    </tr>
    `
    document.getElementById('tbodyRowParams').innerHTML += rows;
  }

  public deleteRowParams(name){
    console.log("name: " +  name)
    let table = document.getElementById('tbodyRowParams');
    table.removeChild(table.lastElementChild);
    this.rowCountParams -= 1;
    const index = this.paramsDTO.indexOf(name, 0);
    if ( index > -1){
      this.paramsDTO.splice(index, 1);
    }
  }

  public addRowEntityK(){
    this.rowCountEk += 1;
    let rows = `
    <tr>
      <th scope="row">${this.rowCountEk}</th>
            <td>
                <input type="text" class="form-control" id=ekName${this.rowCountEk.toString()}/>
            </td>
            <td>
                <input type="text" class="form-control" id=ekValue${this.rowCountEk.toString()}/>
            </td>
    </tr>
    `
    document.getElementById('tbodyRowEK').innerHTML += rows;
    this.getEk();
  }

  public deleteRowEntityK(){
    let table = document.getElementById('tbodyRowEK');
    table.removeChild(table.lastElementChild);
    this.rowCountEk -= 1;
  }

  public getEk(){
    let container = document.getElementById('tEK');
    console.log(container)
    let tds = container.querySelectorAll("input");
    console.log(tds)
    console.log(document.getElementById('ekValue1'))
   tds.forEach(element => {
      console.log(element.value)
    });
  }

  public setParam(){
    let param = {
      name: this.name,
      value:this.value
    }
    param.name = this.name;
    param.value = this.value;
    this.paramsDTO.push(param)
    this.addRowParams(this.name, this.value);
  }
}
