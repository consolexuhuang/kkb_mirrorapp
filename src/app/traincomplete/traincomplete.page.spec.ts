import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TraincompletePage } from './traincomplete.page';

describe('TraincompletePage', () => {
  let component: TraincompletePage;
  let fixture: ComponentFixture<TraincompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraincompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TraincompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
