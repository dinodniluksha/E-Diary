import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemStructureCreatorComponent } from './item-structure-creator.component';

describe('ItemStructureCreatorComponent', () => {
  let component: ItemStructureCreatorComponent;
  let fixture: ComponentFixture<ItemStructureCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemStructureCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemStructureCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
