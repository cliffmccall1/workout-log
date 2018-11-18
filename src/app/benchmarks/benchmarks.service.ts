import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { Benchmark } from './benchmark.model';

const BACKEND_URL = environment.apiUrl + '/benchmarks/';

@Injectable({ providedIn: 'root' })
export class BenchmarksService {
  private benchmarks: Benchmark[] = [];
  private benchmarksUpdated = new Subject<Benchmark[]>();

  constructor(private http: HttpClient, private router: Router) {}

  // Sending http request to get benchmarks
  getBenchmarks() {
    this.http
      .get<{ message: string; benchmarks: any }>(BACKEND_URL)
      // transforming to access _id from db
      .pipe(
        map(benchmarkData => {
          return benchmarkData.benchmarks.map(benchmark => {
            return {
              type: benchmark.type,
              title: benchmark.title,
              content: benchmark.content,
              id: benchmark._id
            };
          });
        })
      )
      .subscribe(transformedBenchmarks => {
        this.benchmarks = transformedBenchmarks;
        // informs the rest of the app about the update
        this.benchmarksUpdated.next([...this.benchmarks]);
      });
  }

  getBenchmarkUpdateListener() {
    return this.benchmarksUpdated.asObservable();
  }

  // gets the benchmark information for editing a post - loaded into the benchmark create
  getBenchmark(id: string) {
    return this.http.get<{
      _id: string;
      type: string;
      title: string;
      content: string;
    }>(BACKEND_URL + id);
  }
  // Creating a new benchmark
  addBenchmark(type: string, title: string, content: string) {
    const benchmark: Benchmark = {
      id: null,
      type: type,
      title: title,
      content: content
    };
    this.http
      .post<{ message: string; benchmarkId: string }>(BACKEND_URL, benchmark)
      .subscribe(responseData => {
        const id = responseData.benchmarkId;
        benchmark.id = id;
        this.benchmarks.push(benchmark);
        this.benchmarksUpdated.next([...this.benchmarks]);
        // routing after a benchmark is saved - Service needs router module for this
        this.router.navigate(['/profile']);
      });
  }

  // Edit a benchmark
  updateBenchmark(id: string, type: string, title: string, content: string) {
    const benchmark: Benchmark = {
      id: id,
      type: type,
      title: title,
      content: content
    };
    this.http.put(BACKEND_URL + id, benchmark).subscribe(response => {
      const updatedBenchmarks = [...this.benchmarks];
      const oldBenchmarkIndex = updatedBenchmarks.findIndex(
        b => b.id === benchmark.id
      );
      updatedBenchmarks[oldBenchmarkIndex] = benchmark;
      this.benchmarks = updatedBenchmarks;
      this.benchmarksUpdated.next([...this.benchmarks]);
      // routing after a benchmark is saved - Service needs router module for this
      this.router.navigate(['/profile']);
    });
  }

  // delete benchmark
  deleteBenchmark(benchmarkId: string) {
    this.http.delete(BACKEND_URL + benchmarkId).subscribe(() => {
      // used to keep benchmark list updated when post is deleted
      const updatedBenchmarks = this.benchmarks.filter(
        benchmark => benchmark.id !== benchmarkId
      );
      this.benchmarks = updatedBenchmarks;
      this.benchmarksUpdated.next([...this.benchmarks]);
    });
  }
}
