import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Benchmark } from '../benchmark.model';
import { BenchmarksService } from '../benchmarks.service';

@Component({
  selector: 'app-benchmark-list',
  templateUrl: './benchmark-list.component.html',
  styleUrls: ['./benchmark-list.component.css']
})
export class BenchmarkListComponent implements OnInit, OnDestroy {
  benchmarks: Benchmark[] = [];
  isLoading = false;
  private benchmarksSub: Subscription;

  constructor(public benchmarksService: BenchmarksService) {}

  ngOnInit() {
    this.isLoading = true;
    this.benchmarksService.getBenchmarks();
    this.benchmarksSub = this.benchmarksService
      .getBenchmarkUpdateListener()
      .subscribe((benchmarks: Benchmark[]) => {
        this.isLoading = false;
        this.benchmarks = benchmarks;
      });
  }

  onDelete(benchmarkId: string) {
    this.benchmarksService.deleteBenchmark(benchmarkId);
  }

  ngOnDestroy() {
    this.benchmarksSub.unsubscribe();
  }
}
