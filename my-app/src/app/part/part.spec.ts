import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Part } from './part';

describe('Part', () => {
  let component: Part;
  let fixture: ComponentFixture<Part>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Part],
    }).compileComponents();

    fixture = TestBed.createComponent(Part);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
