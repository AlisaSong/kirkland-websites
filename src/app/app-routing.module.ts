import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContentComponent } from './components/content/content.component';


const routes: Routes = [{
  component: PortfolioComponent,
  path: 'portfolio/:id'
}, {
  component: ContentComponent,
  path: ''
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
