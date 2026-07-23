import { TestBed } from '@angular/core/testing';

import { ListItemServiceService } from './list-item-service.service';

describe('ListItemServiceService', () => {
  let service: ListItemServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListItemServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
