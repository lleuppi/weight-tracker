import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightMainComponent } from './weight-main.component';

describe('WeightMainComponent', () => {
  let component: WeightMainComponent;
  let fixture: ComponentFixture<WeightMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
