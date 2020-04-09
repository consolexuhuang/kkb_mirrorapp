import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Training2Page } from './training2.page';

describe('Training2Page', () => {
  let component: Training2Page;
  let fixture: ComponentFixture<Training2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Training2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Training2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
