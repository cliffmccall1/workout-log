import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { Log } from './logs.model';

const BACKEND_URL = environment.apiUrl + '/logs/';

@Injectable({ providedIn: 'root' })
export class LogsService {
  private logs: Log[] = [];
  private logsUpdated = new Subject<{ logs: Log[]; logCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  // Paginator
  getLogs(logsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${logsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; logs: any; maxLogs: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(logData => {
          return {
            // tslint:disable-next-line:no-shadowed-variable
            logs: logData.logs.map(log => {
              return {
                id: log._id,
                date: log.date,
                title: log.title,
                content: log.content,
                duration: log.duration,
                creator: log.creator
              };
            }),
            maxLogs: logData.maxLogs
          };
        })
      )
      .subscribe(transformedLogData => {
        this.logs = transformedLogData.logs;
        // informs the rest of the app about the update
        this.logsUpdated.next({
          logs: [...this.logs],
          logCount: transformedLogData.maxLogs
        });
      });
  }

  getLogUpdateListener() {
    return this.logsUpdated.asObservable();
  }

  // get log by id
  getLog(id: string) {
    return this.http.get<{
      _id: string;
      date: string;
      title: string;
      content: string;
      duration: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  // add new log
  addLog(
    date: string,
    title: string,
    content: string,
    duration: string,
    creator: string
  ) {
    const log: Log = {
      id: null,
      date: date,
      title: title,
      content: content,
      duration: duration,
      creator: creator
    };
    this.http
      .post<{ message: string; logId: string }>(BACKEND_URL, log)
      .subscribe(responseData => {
        // routing after a log is saved - Service needs router module for this
        this.router.navigate(['/profile']);
      });
  }

  // update specific log by id
  updateLog(
    id: string,
    date: string,
    title: string,
    content: string,
    duration: string,
    creator: string
  ) {
    // tslint:disable-next-line:no-shadowed-variable
    const log: Log = {
      id: id,
      date: date,
      title: title,
      content: content,
      duration: duration,
      creator: creator
    };
    this.http.put(BACKEND_URL + id, log).subscribe(response => {
      // routing after a log is saved - Service needs router module for this
      this.router.navigate(['/log']);
    });
  }

  deleteLog(logId: string) {
    return this.http.delete(BACKEND_URL + logId);
  }
}
