import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FundoAmareloDirective } from './diretivas/fundo-amarelo/fundo-amarelo.directive';

@NgModule({
  declarations: [
    AppComponent,
    FundoAmareloDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
