import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { SkillsService } from './skills.service';
import { Subscription } from 'rxjs';
import { Skill } from './interfaces';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements OnInit, OnDestroy {
  constructor(
    private skillsService: SkillsService,
    private changeDetector: ChangeDetectorRef
  ) {}

  sub: Subscription;
  skillData: Skill[];

  ngOnInit() {
    this.sub = this.skillsService.getSkills().valueChanges.subscribe(result => {
      this.skillData = result.data.skills as Skill[];
      // Manually run change detection in the container component because of the change detection strategy
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
