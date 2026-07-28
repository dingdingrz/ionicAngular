import { TestBed } from '@angular/core/testing';

import { LikeVuexServiceService } from './like-vuex-service.service';

describe('LikeVuexServiceService', () => {
  let service: LikeVuexServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikeVuexServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
