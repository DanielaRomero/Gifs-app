import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CardComponent } from './componentes/card/card.component';
import { CardListComponent } from './componentes/card-list/card-list.components';
import { HomePageComponent } from './pages/home/home-page.component';
import { SearchBoxComponent } from './componentes/search-box/search-box.component';



@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    CardListComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class GifsModule { }
