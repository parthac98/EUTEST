import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineManagementComponent } from './machine-management.component';

describe('MachineManagementComponent', () => {
  let component: MachineManagementComponent;
  let fixture: ComponentFixture<MachineManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
