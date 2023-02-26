import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsocketValueComponent } from './websocket-value.component';

describe('WebsocketValueComponent', () => {
  let component: WebsocketValueComponent;
  let fixture: ComponentFixture<WebsocketValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ WebsocketValueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsocketValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
