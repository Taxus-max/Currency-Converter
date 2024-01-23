import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRateCurrentComponent } from './exchange-rate-current.component';

describe('ExchangeRateCurrentComponent', () => {
  let component: ExchangeRateCurrentComponent;
  let fixture: ComponentFixture<ExchangeRateCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeRateCurrentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExchangeRateCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
