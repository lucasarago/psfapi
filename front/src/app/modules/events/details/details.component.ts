import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
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
      private spinner: NgxSpinnerService,
      private router: Router) { }

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

  public deleteEvent(eventId: String):void{
    this.eventService.deleteEvent(eventId)
    .subscribe(event => {
      let modal = document.getElementById('alertDelete');
      modal.hidden = false;
      setTimeout(() => {
        modal.hidden = true;
      }, 3000);
      this.router.navigate(['events/allevents']);
    });
  }

  sendInfoPSF(eventId){
    this.eventService.getEventXml(eventId)
    .subscribe(event => {
      fetch('https://ppdocd4d3bda9f.us2.hana.ondemand.com/generator/ppdocservice', 
      {method: 'POST',
        headers: new Headers({
          'Content-Type': 'text/xml',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }),
    body: event })
    .then(item => {
      console.log(item);
    });
  })
};
}
