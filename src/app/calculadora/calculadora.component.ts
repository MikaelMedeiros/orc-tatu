import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { HistoricService } from '../historic/service/historic.service';
import { BudgetHistory } from '../historic/model/budget-history';
import { AuthService } from '../login/service/auth.service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent {
  generatedBudget = '';
  netValue = 0;
  parkingPrice: number | null | undefined = 0;
  hintVisible: boolean = false;
  studioPercent = 0;
  

  constructor(
    private fb: FormBuilder,
    private clipboard: Clipboard,
    private historicService: HistoricService 
  ) {}

  styles: any[] = [];
  details: any[] = [];
  bodyLocal: any[] = [];
  pixValue = 0;
  tattooValue = 0;
  creditValue = 0;
  
  ngOnInit(): void {
    this.styles = [
      { name: 'Fineline', value: 'fineline' },
      { name: 'Bold Line', value: 'bold line' },
      { name: 'Realismo', value: 'realismo' },
      { name: 'Old School', value: 'old school' },
      { name: 'Black Work', value: 'black work' },
      { name: 'Micro Realismo', value: 'micro realismo' },
    ];

    this.details = [      
      { name: 'Sombreamento', value: 'sombreamento' },
      { name: 'Pontilhismo', value: 'pontilhismo' },
      { name: 'Linhas', value: 'linhas' },
      { name: 'Colorido', value: 'colorido' },
      { name: 'Tinta Branca', value: 'tinta branca' }
    ];

    this.bodyLocal = [
      { name: 'Braço', value:'braço', category: 'category 2', addtion: '2'},
      { name: 'Ombro', value:'ombro', category: 'category 2', addtion: '2'},
      { name: 'Mão', value:'mão', category: 'category 2', addtion: '2'},
      { name: 'Perna', value:'perna', category: 'category 2', addtion: '2'},
      { name: 'Tornozelo', value:'tornozelo', category: 'category 2', addtion: '2'},
      { name: 'Canela', value:'canela', category: 'category 2', addtion: '2'},
      { name: 'Costela', value:'costela', category: 'category 2', addtion: '2'},
      { name: 'Costas', value:'costas', category: 'category 2', addtion: '2'},
      { name: 'Pescoço', value:'pescoço', category: 'category 2', addtion: '2'},
      // { name: 'Antebraço', value:'Antebraço', category: 'category 2', addtion: '2'},
      // { name: 'Pescoço', value:'Pescoço', category: 'category 2', addtion: '2'},
      // { name: 'Rosto', value:'Rosto', category: 'category', addtion: '1'},
      // { name: 'Peito', value:'Peito', category: 'category 2', addtion: '2'},
      // { name: 'Barriga', value:'Barriga', category: 'category 2', addtion: '2'},
      // { name: 'Costas', value:'Costas', category: 'category 2', addtion: '2'},
      // { name: 'Costelas', value:'Costelas', category: 'category 2', addtion: '2'},
      // { name: 'Lombar', value:'Lombar', category: 'category 2', addtion: '2'},
      // { name: 'Glúteos', value:'Glúteos', category: 'category 2', addtion: '2'},
      // { name: 'Canela', value:'Canela', category: 'category 2', addtion: '2'},
      // { name: 'Pé', value:'Pé', category: 'category 2', addtion: '2'}
    ]
  }
;

  text: string | undefined;

  budgetForm = this.fb.group({
    id: [''],
    client: [''],    
    draw: [''],
    cm: [1, Validators.required],
    bodyLocal: [''],
    style:  [[''], Validators.required],
    details: [['']]
  }) 

  configForm = this.fb.group({
    valorcm: [30, Validators.required],
    percentageTax: [30],
    parkingPrice: [10],
    creditTax: [20],
    materials: [0]
  })

  bodyPriceForm = this.fb.group({
    braco: [0],
    perna: [0],
    virilha: [0],
    mao: [0],
    pescoco: [0]
  })

  generateBudget() {
    this.calculateTatooValueAndPix();    
    this.calculateCreditValue(); 
    this.addParkingPriceToPixAndCredit();
    this.addMaterialValueToPixAndCredit();
    this.calculateNetValue();
    this.generateTextBudget();
  }

  calculateTatooValueAndPix() {
    let cm = this.budgetForm.get('cm')?.value;
    let valorcm = this.configForm.get('valorcm')?.value;
    if((typeof valorcm !== undefined && valorcm != null) && (typeof cm !== undefined && cm != null)) {      
      this.tattooValue = (valorcm * cm); 
      this.pixValue = this.tattooValue;     
    }
  }

  calculateCreditValue() {
    let creditTax = this.configForm.get('creditTax')?.value;
    if(creditTax) {
      this.creditValue = this.pixValue + creditTax;      
    } else {
      this.creditValue = this.pixValue;   
    } 
  }

  addParkingPriceToPixAndCredit() {
    this.parkingPrice = this.configForm.get('parkingPrice')?.value;
    if(this.parkingPrice) {
      this.pixValue = this.pixValue + this.parkingPrice;
      this.creditValue = this.creditValue + this.parkingPrice;
    } 
  }

  addMaterialValueToPixAndCredit() {
    let materialValue = this.configForm.get('materials')?.value;    
    if (materialValue) {      
      this.pixValue = this.pixValue + materialValue;
      this.creditValue = this.creditValue + materialValue; 
    }
  }

  calculateNetValue() {    
    let tax = this.configForm.get('percentageTax')?.value;    
    if (tax) {
      this.studioPercent = this.tattooValue * tax / 100;
      this.netValue = this.tattooValue - (this.tattooValue * tax / 100) 
    } else {
      this.netValue = this.tattooValue - (this.tattooValue * 0 / 100) 
    }    
  }


  generateTextBudget() {
    this.generatedBudget = '';
    if(this.budgetForm.get('client')?.value) {
      this.generatedBudget = `${this.budgetForm.get('client')?.value}, `;
    }
    //default
    this.generatedBudget = this.generatedBudget.concat(`sua tattoo`);

    if(this.budgetForm.get('style')?.value) {
      this.generatedBudget = this.generatedBudget.concat(` ${this.getTextFormated(this.budgetForm.get('style')?.value)}`);
    }

    if(this.budgetForm.get('draw')?.value) {
      this.generatedBudget = this.generatedBudget.concat(` ${this.budgetForm.get('draw')?.value}`);
    }

    //default
    this.generatedBudget = this.generatedBudget.concat(` de aproximadamente ${this.budgetForm.get('cm')?.value}cm,`);

    if(this.budgetForm.get('bodyLocal')?.value) {
      this.generatedBudget = this.generatedBudget.concat(` no(a) ${this.budgetForm.get('bodyLocal')?.value}`);
    }

    if(this.getTextFormated(this.budgetForm.get('details')?.value)) {
      this.generatedBudget = this.generatedBudget.concat(` com detalhe em ${this.getTextFormated(this.budgetForm.get('details')?.value)}`);
    }

    //default
    this.generatedBudget = this.generatedBudget.concat(` fica no valor de R$${this.pixValue} no PIX`)
    .concat(` ou R$${this.creditValue} no Cartão de Crédito em até 3x.`);
  }

  getTextFormated(lista: string []| undefined | null): string | undefined | null {        
    if (typeof lista !== undefined && lista != null) {      
      let listaFiltrada = lista.filter(item => item !== '');      
      if(listaFiltrada.length > 1) {
        let ultimo = listaFiltrada.pop();
        return listaFiltrada.join(', ') + ' e ' + ultimo;                
      } else if (listaFiltrada.length > 0) {
        return listaFiltrada[0];
      }      
    } 
    return "";
  }

  handleSlide(value: any, fieldForm: string) {
    this.bodyPriceForm.get(fieldForm)?.setValue(value) ;
  }

  copyText() {  
    this.generateBudget();
    this.clipboard.copy(this.generatedBudget);
    this.saveBudget();
  }

  saveBudget() {
    const budgetRaw = this.budgetForm.getRawValue();
    
    let budget = new BudgetHistory(
      budgetRaw.client,
      this.generatedBudget,
      this.netValue,
      this.studioPercent,
      this.netValue + this.studioPercent
    )    

    this.historicService.saveOnBudgetHistory(budget).subscribe((data: any) => console.log('Deu bom!', data))
    
  }

  resetForm() {
    this.budgetForm.reset();
    this.budgetForm.get('cm')?.setValue(1);
    this.configForm.get('valorcm')?.setValue(22.50);    
    this.budgetForm.get('style')?.setValue(['']);    
    this.generatedBudget = '';
    this.studioPercent = 0;
    this.netValue = 0;
  }

  showHint(event: any) {    
    this.hintVisible = !this.hintVisible;
  }
}
