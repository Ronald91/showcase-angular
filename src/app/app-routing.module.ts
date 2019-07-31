import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  {
    path: 'skills',
    component: SkillsComponent
  },
  { path: '', redirectTo: '/skills', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
