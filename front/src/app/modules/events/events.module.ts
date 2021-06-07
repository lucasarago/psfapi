import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { EventsRoutingModule } from './events-routing.module';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { AllComponent } from './all/all.component';
import { DetailsComponent } from './details/details.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    DeleteComponent,
    AllComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EventsModule { }
