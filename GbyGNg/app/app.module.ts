import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }    from '@angular/forms';

import { AppComponent } from './controllers/app.component';
import { BackendService } from './services/Service';
import { StatusFilterPipe } from './services/directives';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule
    ],
  declarations: [ AppComponent, StatusFilterPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
