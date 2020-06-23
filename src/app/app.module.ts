import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowImageComponent } from './show-image/show-image.component';

// third party modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule  } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ShowImageComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	NgbModule,
	ToastrModule.forRoot({
		preventDuplicates: true
	}),
	BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
