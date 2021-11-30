import { TestBed } from '@angular/core/testing';

import { ItemStructureService } from './item-structure.service';

describe('ItemStructureService', () => {
  let service: ItemStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
