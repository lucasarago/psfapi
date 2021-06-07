import { Component, OnInit } from '@angular/core';
import { eventDTO } from 'src/app/models/events';
import { EventsService } from "../../../services/events.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  constructor(private evenstService:EventsService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.getAllEvents();
    }, 1000);
  }

  eventsList: eventDTO[] = [];

  public getAllEvents() : void{
    this.evenstService.getAllEvents()
    .subscribe(items => {
      this.eventsList = items;
    })
  }

}
