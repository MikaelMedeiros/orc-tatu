import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let component: AppComponent;

  it('should create the app', () => {  
    expect(component).toBeTruthy();
  });

  it(`should have as title 'orc-tatu'`, () => {
    expect(component.title).toEqual('orc-tatu');
  });

});

