import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShimmerCardComponent } from './product-shimmer-card.component';

describe('ProductShimmerCardComponent', () => {
  let component: ProductShimmerCardComponent;
  let fixture: ComponentFixture<ProductShimmerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductShimmerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShimmerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
