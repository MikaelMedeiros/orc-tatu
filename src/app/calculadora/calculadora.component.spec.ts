import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalculadoraComponent } from './calculadora.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { DragDropModule } from 'primeng/dragdrop';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';
import { KnobModule } from 'primeng/knob';
import { SliderModule } from 'primeng/slider';

describe('CalculadoraComponent', () => {

  let component: CalculadoraComponent;
  let fixture: ComponentFixture<CalculadoraComponent>;    

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [CalculadoraComponent],
    imports: [ InputTextModule,
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      FormsModule,
      InputTextModule,
      InputNumberModule,
      SelectButtonModule,
      CardModule,
      ButtonModule,
      TabViewModule,
      DragDropModule,
      InputTextareaModule,
      AccordionModule,
      DialogModule,
      KnobModule,
      SliderModule
    ]})
    fixture = TestBed.createComponent(CalculadoraComponent);
    component = fixture.componentInstance;   
    component.budgetForm.setValue({
      id: '1',
      cm: 10,
      valorcm: 5,
      client: 'John Doe',
      style: ['Categoria'],
      draw: 'Desenho',
      bodyLocal: 'Local do corpo',
      details: ['Detalhes']
    }); 
});

  it('should create the app', () => {  
    expect(component).toBeTruthy();
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

  it(`should generate budget tattoo correctly without client, category, local body, draw and details`, () => {
    component.budgetForm.get('client')?.reset();
    component.budgetForm.get('category')?.reset();
    component.budgetForm.get('bodyLocal')?.reset();
    component.budgetForm.get('draw')?.reset();
    component.budgetForm.get('details')?.reset();
    
    fixture.detectChanges();
    component.generateBudget();    
    expect(component.generatedBudget).toEqual('sua tattoo de aproximadamente 10cm, fica no valor de R$60 no PIX ou R$80 no Cartão de Crédito em até 3x.')

  })
});

