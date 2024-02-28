import { ToastService } from './../../shared/toast.service';
import { CalculadoraService } from './service/calculadora.service';
import { HistoricComponent } from './../historic/historic.component';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { HistoricService } from '../historic/service/historic.service';
import { BudgetHistory } from '../historic/model/budget-reponse';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements AfterViewInit {
  generatedBudget = '';
  netValue = 0;
  parkingPrice: number | null | undefined = 0;
  hintVisible: boolean = false;
  studioPercent = 0;
  @ViewChild(HistoricComponent, { static: false }) historicComponent?: HistoricComponent;
  indexTab: number | any = 0;
  count: number = 0;



  constructor(
    private fb: FormBuilder,
    private clipboard: Clipboard,
    private historicService: HistoricService,
    private toastService: ToastService,
    private calculadoraService: CalculadoraService,
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() =>this.getEstilos(), 1000);
  }

  styles: any[] = [];
  details: any[] = [];
  bodyLocal: any[] = [];
  pixValue = 0;
  tattooValue = 0;
  creditValue = 0;

  ngOnInit(): void {

    this.styles = [
      { name: 'Fineline', value: 'FINELINE', ptbr: 'fineline' },
      { name: 'Bold Line', value: 'BOLD_LINE', ptbr: 'bold line' },
      { name: 'Realismo', value: 'REALISM', ptbr: 'realismo' },
      { name: 'Old School', value: 'OLD_SCHOOL', ptbr: 'old school' },
      { name: 'Black Work', value: 'BLACK_WORK', ptbr: 'black work' },
    ];

    this.details = [
      { name: 'Sombreamento', value: 'SHADING', ptbr: 'sombreamento' },
      { name: 'Pontilhismo', value: 'POINTILLISM', ptbr: 'pontilhismo'  },
      { name: 'Linhas', value: 'LINES', ptbr: 'linhas' },
      { name: 'Colorido', value: 'COLORFUL',  ptbr: 'colorido' },
      { name: 'Tinta Branca', value: 'WHITE_INK', ptbr: 'tinta branca' }
    ];

    this.bodyLocal = [
      { name: 'Braço', value:'ARM', ptbr: 'braço', addtion: '2'},
      { name: 'Ombro', value:'SHOULDER', ptbr: 'ombro', addtion: '2'},
      { name: 'Mão', value:'HAND', ptbr: 'mão', addtion: '2'},
      { name: 'Perna', value:'LEG', ptbr: 'perna', addtion: '2'},
      { name: 'Tornozelo', value:'ANKLE', ptbr: 'tornozelo', addtion: '2'},
      { name: 'Canela', value:'CINNAMON', ptbr: 'canela', addtion: '2'},
      { name: 'Costela', value:'RIB', ptbr: 'costela', addtion: '2'},
      { name: 'Costas', value:'BACK', ptbr: 'costas', addtion: '2'},
      { name: 'Pescoço', value:'NECK', ptbr: 'pescoço', addtion: '2'},
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
    id: [],
    client: [],
    draw: [],
    cm: [1, Validators.required],
    bodyLocal: [],
    style:  [[], Validators.required],
    details: [[]]
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
    const configRaw = this.configForm.getRawValue();

    let budget: BudgetHistory = new BudgetHistory(
      budgetRaw.client,
      this.generatedBudget,
      budgetRaw.draw,
      budgetRaw.cm,
      configRaw.valorcm,
      budgetRaw.bodyLocal,
      budgetRaw.style,
      budgetRaw.details,
      configRaw.percentageTax,
      configRaw.parkingPrice,
      configRaw.materials,
      configRaw.creditTax,
      'Orçado'
    );

    this.historicService.saveOnBudgetHistory(budget)
    .subscribe({
      next: (response: any)=>{

        this.toastService.successMsg("Orçamento salvo");
      },
      error: (error:HttpErrorResponse)=>{
        this.toastService.errorHandler(error);
      }
    })
  }



  resetForm() {
    this.budgetForm.reset();
    this.budgetForm.get('cm')?.setValue(1);
    this.configForm.get('valorcm')?.setValue(30);
    this.budgetForm.get('style')?.setValue(null);
    this.generatedBudget = '';
    this.studioPercent = 0;
    this.netValue = 0;
  }

  showHint(event: any) {
    this.hintVisible = !this.hintVisible;
  }

  atualizaHistorico(event: any){
    if(this.indexTab == 2){
      this.historicComponent?.getBudgets();
    }

  }

  getEstilos(){
    this.calculadoraService.getBodyLocal().subscribe({
      next:(resp:any)=>{
        resp.forEach((element: any) => {
          this.bodyLocal.push( { name: element, value: element, ptbr: element})
          console.log('a')
        });
      },
      error: (respErr)=>{
        this.toastService.errorHandler(respErr);
      }
    })
  }
}


