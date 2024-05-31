import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OilchangehistoryComponent } from './oilchangehistory.component';

describe('OilchangehistoryComponent', () => {
  let component: OilchangehistoryComponent;
  let fixture: ComponentFixture<OilchangehistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OilchangehistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OilchangehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
