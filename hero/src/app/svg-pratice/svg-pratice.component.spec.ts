import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgPraticeComponent } from './svg-pratice.component';

describe('SvgPraticeComponent', () => {
  let component: SvgPraticeComponent;
  let fixture: ComponentFixture<SvgPraticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgPraticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgPraticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
