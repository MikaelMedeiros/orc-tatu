import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { DragDropModule } from 'primeng/dragdrop';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;    

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [ InputTextModule,
      InputNumberModule,
      SelectButtonModule,
      CardModule,
      ButtonModule,
      TabViewModule,
      DragDropModule,
      InputTextareaModule,
      ReactiveFormsModule,
      FormsModule
    ]})
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;   
    component.budgetForm.setValue({
      id: '1',
      cm: 10,
      valorcm: 5,
      client: 'John Doe',
      category: ['Categoria'],
      draw: 'Desenho',
      bodyLocal: 'Local do corpo',
      details: ['Detalhes']
    }); 
});

  it('should create the app', () => {  
    expect(component).toBeTruthy();
  });

  it(`should have as title 'orc-tatu'`, () => {
    expect(component.title).toEqual('orc-tatu');
  });

  it(`should generate budget tattoo correctly`, () => {    
    component.generateBudget();    
    expect(component.generatedBudget).toEqual('John Doe, sua tattoo Categoria Desenho de aproximadamente 10cm, no(a) Local do corpo com detalhe em Detalhes fica no valor de R$60 no PIX ou R$80 no Cartão de Crédito em até 3x.')
  })

  it(`should copy generatedBudget on change textArea`, () => {    
    let clipboard: Clipboard = TestBed.inject(Clipboard);
    const spy = spyOn(clipboard, 'copy')

    component.generateBudget();   
    fixture.detectChanges();

    component.copyText();

    expect(spy).toHaveBeenCalledWith('John Doe, sua tattoo Categoria Desenho de aproximadamente 10cm, no(a) Local do corpo com detalhe em Detalhes fica no valor de R$60 no PIX ou R$80 no Cartão de Crédito em até 3x.')

    let textarea = fixture.debugElement.query(By.css('textarea')).componentInstance;
    textarea.generatedBudget = 'John Doe texto modificado'    
    
    component.copyText();

    expect(spy).toHaveBeenCalledWith(textarea.generatedBudget);

  })
});
