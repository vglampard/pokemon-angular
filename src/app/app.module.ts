//Module imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Component imports
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ResultsDisplayComponent } from './components/results-display/results-display.component';
import { ResultComponent } from './components/result-card/result.component';
import { AboutComponent } from './components/about/about.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ResultDetailComponent } from './components/result-detail/result-detail.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
//Pipe imports
import { convertHeightPipe } from './pipes/convertHeight';
import { convertWeightPipe } from './pipes/convertWeight';
import { removeHyphensPipe } from './pipes/removeHyphens';
import { SplashComponent } from './components/splash/splash.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ResultsDisplayComponent,
    ResultComponent,
    AboutComponent,
    PageNotFoundComponent,
    ResultDetailComponent,
    PaginationComponent,
    convertHeightPipe,
    convertWeightPipe,
    SearchBarComponent,
    removeHyphensPipe,
    SplashComponent,
    BackButtonComponent,
    TooltipComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
