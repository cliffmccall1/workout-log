import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';

import { Log } from '../logs.model';
import { LogsService } from '../logs.service';
import { AuthService } from '../../users/auth.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit, OnDestroy {
  logs: Log[] = [];
  isLoading = false;
  totalLogs = 0;
  logsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5, 15, 25];
  userIsAuthenticated = false;
  userId: string;
  private logsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public logsService: LogsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.logsService.getLogs(this.logsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.logsSub = this.logsService
      .getLogUpdateListener()
      .subscribe((logData: { logs: Log[]; logCount: number }) => {
        this.isLoading = false;
        this.totalLogs = logData.logCount;
        this.logs = logData.logs;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.logsPerPage = pageData.pageSize;
    this.logsService.getLogs(this.logsPerPage, this.currentPage);
  }

  onDelete(logId: string) {
    this.isLoading = true;
    this.logsService.deleteLog(logId).subscribe(
      () => {
        this.logsService.getLogs(this.logsPerPage, this.currentPage);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.logsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
