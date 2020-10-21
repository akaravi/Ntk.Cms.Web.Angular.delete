/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CmsStatistContentListComponent } from './cmsStatistContentList.component';

describe('CmsStatistContentListComponent', () => {
  let component: CmsStatistContentListComponent;
  let fixture: ComponentFixture<CmsStatistContentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsStatistContentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsStatistContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
