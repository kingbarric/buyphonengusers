import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDeliveryInformationComponent } from './page-delivery-information.component';

describe('PageDeliveryInformationComponent', () => {
  let component: PageDeliveryInformationComponent;
  let fixture: ComponentFixture<PageDeliveryInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDeliveryInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDeliveryInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
