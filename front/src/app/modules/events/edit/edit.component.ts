import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { eventDTO } from "../../../models/events";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private eventService: EventsService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

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
    
ngOnInit(): void {
  this.spinner.show();

    setTimeout(() => {
      this.activatedRoute.params.subscribe(params => {
        this.eventService.getEventById(params.id).subscribe(eventDetails => {
          this.event = eventDetails;
        })
      })
      this.spinner.hide();
    }, 500);
  
}

}
