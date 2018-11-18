import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { BenchmarksService } from '../benchmarks.service';
import { Benchmark } from '../benchmark.model';

@Component({
  selector: 'app-benchmark-create',
  templateUrl: './benchmark-create.component.html',
  styleUrls: ['./benchmark-create.component.css']
})
export class BenchmarkCreateComponent implements OnInit {
  enteredType = '';
  enteredTitle = '';
  enteredContent = '';
  benchmark: Benchmark;
  isLoading = false;
  private mode = 'create';
  private benchmarkId: string;

  constructor(
    public benchmarksService: BenchmarksService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    // extracting the benchmark id for updating edit/:id
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('benchmarkId')) {
        this.mode = 'edit';
        this.benchmarkId = paramMap.get('benchmarkId');
        this.isLoading = true;
        this.benchmarksService
          .getBenchmark(this.benchmarkId)
          .subscribe(benchmarkData => {
            this.isLoading = false;
            this.benchmark = {
              id: benchmarkData._id,
              type: benchmarkData.type,
              title: benchmarkData.title,
              content: benchmarkData.content
            };
          });
      } else {
        // if we don't have a benchmark id we are in create mode
        this.mode = 'create';
        this.benchmarkId = null;
      }
    });
  }

  onSaveBenchmark(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.benchmarksService.addBenchmark(
        form.value.type,
        form.value.title,
        form.value.content
      );
    } else {
      this.benchmarksService.updateBenchmark(
        this.benchmarkId,
        form.value.type,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
