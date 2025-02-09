import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsDisplayComponent } from './components/results-display/results-display.component';
import { AboutComponent } from './components/about/about.component';
import { ResultDetailComponent } from './components/result-detail/result-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SplashComponent } from './components/splash/splash.component';

const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'pokemon', component: ResultsDisplayComponent },
  { path: 'about', component: AboutComponent },
  { path: 'pokemon/:name', component: ResultDetailComponent },
  { path: '404', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
