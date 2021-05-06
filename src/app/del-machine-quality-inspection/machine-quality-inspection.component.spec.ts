import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineQualityInspectionComponent } from './machine-quality-inspection.component';

describe('MachineQualityInspectionComponent', () => {
  let component: MachineQualityInspectionComponent;
  let fixture: ComponentFixture<MachineQualityInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineQualityInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineQualityInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
