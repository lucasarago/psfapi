import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { eventDTO } from "../../../models/events";
import { entityKeyDTO } from "src/app/models/entitykey";
import { paramDTO } from "src/app/models/param";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private eventService: EventsService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private route: Router) { }

    event: eventDTO = {
      eventId : null,
      entityType : null,
      effectiveStartDate : null,
      publishedAt : null,
      publishedBy : null,
      repost : null,
      entityKeys : null,
      params : null
    }

    newEvent: FormGroup;
    rowCountParams: number = 0;
    rowCountEk: number = 0;
    paramsDTO: paramDTO[] = [];
    eksDTO: entityKeyDTO[] = [];
    name: string = '';
    value: string = '';
    emptyEk: boolean = true;
    emptyP: boolean = true;
    
ngOnInit(): void {
  this.spinner.show();

  this.newEvent = this.formGroupEventCreator();
    setTimeout(() => {
      this.activatedRoute.params.subscribe(params => {
        this.eventService.getEventById(params.id).subscribe(eventDetails => {
          this.event = eventDetails;
          this.paramsDTO = eventDetails.params;
          this.eksDTO = eventDetails.entityKeys;
        })
      })
      this.spinner.hide();
    }, 500);
}

public formGroupEventCreator(): FormGroup {
  return new FormGroup({
    eventId: new FormControl('', [Validators.required]),
    entityType: new FormControl('', [Validators.required]),
    effectiveStartDate: new FormControl('', [Validators.required]),
    publishedAt: new FormControl('', [Validators.required]),
    publishedBy: new FormControl('', [Validators.required]),
    repost: new FormControl('', [Validators.required])
  });
}

public editEvent():void{
  if(this.newEvent.valid){
    let event = this.buildEventData();
    this.eventService.saveEvent(event)
    .subscribe(item => {
      let modal = document.getElementById('alertCreate');
      modal.hidden = false;
      setTimeout(() => {
        modal.hidden = true;
      }, 2000);
      setTimeout(() => {
        this.route.navigate(["events/allevents"]);
      }, 2000);
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
    entityKeys: this.eksDTO,
    params: this.paramsDTO
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

public deleteRowParams(name){
  let table = document.getElementById('tbodyRowParams');
  if(this.paramsDTO.length > 1){
    table.removeChild(document.getElementById(name));
    this.deleteParam(name);
  } else {
    this.emptyP = false;
    this.deleteParam(name);
  }
}

public deleteRowEntityK(name){
  let table = document.getElementById('tbodyEk');
  if(this.eksDTO.length > 1){
    table.removeChild(document.getElementById(name));
    this.deleteEK(name);
  } else {
    this.emptyEk = false;
    this.deleteEK(name);
  }
}

public setParam(){
  let param = {
    name: this.name,
    value:this.value
  }
  param.name = this.name;
  param.value = this.value;
  this.paramsDTO.push(param);
}

public setEk(){
  let ek = {
    name: this.name,
    value:this.value
  }
  ek.name = this.name;
  ek.value = this.value;
  this.eksDTO.push(ek);
}

private deleteParam(name){
  this.paramsDTO.forEach((param, index) => {
    if(param.name == name) delete this.paramsDTO[index];
   });
}

private deleteEK(name){
  this.eksDTO.forEach((ek, index) => {
    if(ek.name == name) delete this.eksDTO[index];
   });
}

setModalData(name, value){
    this.name = name;
    this.value = value;   
}

}
