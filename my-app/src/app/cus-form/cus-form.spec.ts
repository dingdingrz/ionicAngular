import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusForm } from './cus-form';

describe('CusForm', () => {
  let component: CusForm;
  let fixture: ComponentFixture<CusForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CusForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CusForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
