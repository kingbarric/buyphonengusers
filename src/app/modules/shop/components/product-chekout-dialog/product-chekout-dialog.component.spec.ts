import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductChekoutDialogComponent } from './product-chekout-dialog.component';

describe('ProductChekoutDialogComponent', () => {
  let component: ProductChekoutDialogComponent;
  let fixture: ComponentFixture<ProductChekoutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductChekoutDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductChekoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
