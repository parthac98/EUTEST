import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineRegsitrationComponent } from './machine-regsitration.component';

describe('MachineRegsitrationComponent', () => {
  let component: MachineRegsitrationComponent;
  let fixture: ComponentFixture<MachineRegsitrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineRegsitrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineRegsitrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
