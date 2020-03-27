import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadyvideoPage } from './readyvideo.page';

describe('ReadyvideoPage', () => {
  let component: ReadyvideoPage;
  let fixture: ComponentFixture<ReadyvideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyvideoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadyvideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
