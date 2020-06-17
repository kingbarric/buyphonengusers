import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAMerchantComponent } from './become-a-merchant.component';

describe('BecomeAMerchantComponent', () => {
  let component: BecomeAMerchantComponent;
  let fixture: ComponentFixture<BecomeAMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeAMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeAMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
