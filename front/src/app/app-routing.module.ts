import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './templates/carousel/carousel.component';

const routes: Routes = [
  {path: '', component: CarouselComponent},

  {
    path: 'events', 
    loadChildren: () => import ('./modules/events/events.module').then(e => e.EventsModule) 
  },

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
