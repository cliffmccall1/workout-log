import { TestBed, inject } from '@angular/core/testing';

import { BenchmarksService } from './benchmarks.service';

describe('BenchmarksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BenchmarksService]
    });
  });

  it('should be created', inject(
    [BenchmarksService],
    (service: BenchmarksService) => {
      expect(service).toBeTruthy();
    }
  ));
});
