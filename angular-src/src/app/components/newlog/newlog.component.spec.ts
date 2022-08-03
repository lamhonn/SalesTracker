/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewlogComponent } from './newlog.component';

describe('NewlogComponent', () => {
  let component: NewlogComponent;
  let fixture: ComponentFixture<NewlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
