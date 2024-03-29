import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable, switchMap, tap} from 'rxjs';
import {ActivityService} from 'src/app/Services/activity.service';
import {UserService} from 'src/app/Services/user.service';
import {Designation} from 'src/app/types/designation';
import {EditActivityComponent} from '../edit-activity/edit-activity.component';
import {NewActivityComponent} from '../newActivity/newActivity.component';
import {Router} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-activitycrud',
  templateUrl: './activitycrud.component.html',
  styleUrls: ['./activitycrud.component.scss']
})
export class ActivitycrudComponent implements OnInit {

  activities!: Designation[];
  displayedColumns: string[] = ['designation', 'edit', 'remove'];
  show = true


  constructor(private router: Router,
              public dialog: MatDialog,
              private activityService: ActivityService,
              private userService: UserService,
              private readonly translate: TranslateService) {
  }

  ngOnInit() {
    this.show = this.userService.isEmployee();
    this.updateList().subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewActivityComponent);
    dialogRef.afterClosed().pipe(
      switchMap(() => this.updateList())
    ).subscribe();
  }

  delete(activity: Designation): void {
    if (confirm(this.translate.instant("PRODUCT_DESIGNATION.REMOVE_DESIGNATION_QUESTION") + activity.designation + "?")) {
      this.activityService.delete(activity.id).pipe(
        switchMap(() => this.updateList())
      ).subscribe();
    }
  }

  edit(activity: Designation): void {
    const dialogRef = this.dialog.open(EditActivityComponent, {
        data: activity
      });

    dialogRef.afterClosed().pipe(
      switchMap(() => this.updateList())
    ).subscribe();
  }

  updateList(): Observable<Designation[]> {
    return this.activityService.getAll().pipe(
      tap((data) => this.activities = data)
    );
  }
}
