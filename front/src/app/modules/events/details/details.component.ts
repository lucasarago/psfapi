import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { ActivatedRoute } from '@angular/router';
import { eventDTO } from 'src/app/models/events';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

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
      this.spinner.hide();
      this.activatedRoute.params.subscribe(params => {
        this.eventService.getEventById(params.id).subscribe(eventDetails => {
          this.event = eventDetails;
        })
      });
    }, 500);
  }



}
