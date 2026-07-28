import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGrandDetailComponent } from './detail-grand-detail.component';

describe('DetailGrandDetailComponent', () => {
  let component: DetailGrandDetailComponent;
  let fixture: ComponentFixture<DetailGrandDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailGrandDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGrandDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
