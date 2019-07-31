import { Component, OnInit, OnDestroy } from '@angular/core';
import { SkillsService } from './skills.service';
import { Subscription } from 'rxjs';
import { Skill, ApiResponse } from './interfaces';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnDestroy {
  constructor(private skillsService: SkillsService) {}

  sub: Subscription;
  skillData: Skill[];

  ngOnInit() {
    this.sub = this.skillsService.getSkills()
    .valueChanges
    .subscribe(result => {
      this.skillData = result.data.skills as Skill[];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
