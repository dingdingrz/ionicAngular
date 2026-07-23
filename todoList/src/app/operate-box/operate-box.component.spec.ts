import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperateBoxComponent } from './operate-box.component';

describe('OperateBoxComponent', () => {
  let component: OperateBoxComponent;
  let fixture: ComponentFixture<OperateBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperateBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
