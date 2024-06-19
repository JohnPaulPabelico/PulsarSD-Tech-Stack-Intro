import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RxjsTestComponent } from './rxjs-test/rxjs-test.component';

@NgModule({
  declarations: [
    AppComponent,
    RxjsTestComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
