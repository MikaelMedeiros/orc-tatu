import { Clipboard } from '@angular/cdk/clipboard';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HistoricService } from '../historic/service/historic.service';
import { ToastService } from './../../shared/toast.service';
import { HistoricComponent } from './../historic/historic.component';
import { BudgetRequest } from './model/budget-reponse';
import { EnumType } from './model/enum-type';
import { EnumService } from './service/enums.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {
  generatedBudget = '';
  netValue = 0;
  parkingPrice: number | null | undefined = 0;
  hintVisible: boolean = false;
  studioPercent = 0;
  @ViewChild(HistoricComponent, { static: false }) historicComponent?: HistoricComponent;
  indexTab: number | any = 0;
  count: number = 0;  
  fieldsAddition: any[] = [];
  additionsToSum: any[] = [];

  constructor(
    private fb: FormBuilder,
    private clipboard: Clipboard,
    private historicService: HistoricService,
    private toastService: ToastService,
    private enumService: EnumService,
  ) {}

  @Input() free: boolean = false;

  styles: any[] = [];
  details: any[] = [];
  bodyLocal: any[] = [];
  pixValue = 0;  
  tattooBaseValue = 0;
  tattooValue = 0;
  creditValue = 0;

  ngOnInit(): void {
    if(this.free) {
      this.setEnumDisconected();
    } else {
      this.setEnum(EnumType.Styles);
      this.setEnum(EnumType.BodyLocal);
      this.setEnum(EnumType.Details);   
    }
  }

  setEnumDisconected() {
    this.styles = [
      { name: 'Fineline', value: 'FINELINE', ptbr: 'fineline' },
      { name: 'Bold Line', value: 'BOLD_LINE', ptbr: 'bold line' },
      { name: 'Realismo', value: 'REALISM', ptbr: 'realismo' },
      { name: 'Old School', value: 'OLD_SCHOOL', ptbr: 'old school' },
      { name: 'Black Work', value: 'BLACK_WORK', ptbr: 'black work' },
      { name: 'Minimalista', value: 'MINIMALIST', ptbr: 'minimalista' },
      { name: 'Geek', value: 'GEEK', ptbr: 'geek' },
      { name: 'Free Hand', value: 'FREE_HAND', ptbr: 'free hand' },
      { name: 'Caligrafia', value: 'CALLIGRAPHY', ptbr: 'caligrafia' },
      { name: 'Cobertura', value: 'COVERAGE', ptbr: 'cobertura' },
      { name: 'Neotradicional', value: 'NEOTRADITIONAL', ptbr: 'neotradicional' },
      { name: 'Tribal', value: 'TRIBAL', ptbr: 'tribal' },
      
    ];

    this.details = [
      { name: 'Sombreamento', value: 'SHADING', ptbr: 'sombreamento' },
      { name: 'Pontilhismo', value: 'POINTILLISM', ptbr: 'pontilhismo'  },
      { name: 'Linhas', value: 'LINES', ptbr: 'linhas' },
      { name: 'Colorido', value: 'COLORFUL',  ptbr: 'colorido' },
      { name: 'Tinta Branca', value: 'WHITE_INK', ptbr: 'tinta branca' }
      
    ];

    this.bodyLocal = [
      { name: 'Orelha', value:'EAR', ptbr: 'orelha', addtion: '2'},
      { name: 'Pescoço', value:'NECK', ptbr: 'pescoço', addtion: '2'},
      { name: 'Ombro', value:'SHOULDER', ptbr: 'ombro', addtion: '2'},
      { name: 'Clavícula', value:'CLAVICLE', ptbr: 'clavícula', addtion: '2'},
      { name: 'Braço', value:'ARM', ptbr: 'braço', addtion: '2'},
      { name: 'Antebraço', value:'FOREARM', ptbr: 'antebraço', addtion: '2'},
      { name: 'Mão', value:'HAND', ptbr: 'mão', addtion: '2'},
      { name: 'Peito', value:'CHEST', ptbr: 'peito', addtion: '2'},
      { name: 'Costela', value:'RIB', ptbr: 'costela', addtion: '2'},
      { name: 'Costas', value:'BACK', ptbr: 'costas', addtion: '2'},
      { name: 'Cintura', value:'WAIST', ptbr: 'cintura', category: 'category', addtion: '1'},
      { name: 'Virilha', value:'GROIN', ptbr: 'virilha', addtion: '2'},
      { name: 'Perna', value:'LEG', ptbr: 'perna', addtion: '2'},
      { name: 'Panturrilha', value:'CALF', ptbr: 'panturrilha', addtion: '2'},
      { name: 'Canela', value:'CINNAMON', ptbr: 'canela', addtion: '2'},
      { name: 'Tornozelo', value:'ANKLE', ptbr: 'tornozelo', addtion: '2'},
      { name: 'Pé', value:'FOOT', ptbr: 'pé', addtion: '2'}

      
    ]
  }

  text: string | undefined;

  budgetForm = this.fb.group({
    id: [],
    client: [],
    draw: [],
    cm: [null, Validators.required],
    bodyLocal: [],
    style:  [[], Validators.required],
    details: [[]]
  })

  configForm = this.fb.group({
    valorcm: [35, Validators.required],
    percentageTax: [30],
    parkingPrice: [80],
    creditTax: [60],
    materials: [80]
  })

  additionPriceForm = this.fb.group({
    braco: [0],
    perna: [0],
    virilha: [0],
    mao: [0],
    pescoco: [0],
    sombreamento: [0],
    pontilhismo: [0],
    linhas: [0],
    colorido: [0],
    tintaBranca: [0],
    fineline: [],
    boldline: [0],
    realismo: [0],
    oldschool: [0],
    blackwork: [0],
    minimalista: [0],
    geek: [0],
    freehand: [0],
    caligrafia: [0],
    cobertura: [0],
    neotradicional: [0],
    tribal: [0],
    EAR: [0],
    NECK: [0],
    SHOULDER: [0],
    CLAVICLE: [0],
    ARM: [0],
    FOREARM: [0],
    HAND: [0],
    CHEST: [0],
    RIB: [0],
    BACK: [0],
    WAIST: [0],
    GROIN: [0],
    LEG: [0],
    CALF: [0],
    CINNAMON: [0],
    ANKLE: [0],
    FOOT: [0],
  })

  generateBudget() {
    this.calculateTattooValueAndPix();
    this.calculateCreditValue();
    this.addParkingPriceToPixAndCredit();
    this.addMaterialValueToPixAndCredit();
    this.calculateNetValue();
    this.appearToConfigureAddition();
    this.generateTextBudget();
  }

  

  calculateTattooValueAndPix() {
    let cm = this.budgetForm.get('cm')?.value;
    let valorcm = this.configForm.get('valorcm')?.value;
    if((typeof valorcm !== undefined && valorcm != null) && (typeof cm !== undefined && cm != null)) {         
      this.tattooBaseValue = (valorcm * cm);       
      this.tattooValue = this.sumAdditionValue();      
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
      let bodylocal: any = this.budgetForm.get('bodyLocal')?.value;
      this.generatedBudget = this.generatedBudget.concat(` no(a) ${bodylocal?.ptbr}`);
    }

    if(this.getTextFormated(this.budgetForm.get('details')?.value)) {
      this.generatedBudget = this.generatedBudget.concat(` com detalhe em ${this.getTextFormated(this.budgetForm.get('details')?.value)}`);
    }

    //default
    this.generatedBudget = this.generatedBudget.concat(` fica no valor de R$${this.pixValue.toFixed(2)} no PIX`)
    .concat(` ou R$${this.creditValue.toFixed(2)} no Cartão de Crédito em até 3x sem juros!`);
  }

  getTextFormated(lista: any[]| undefined | null): string | undefined | null {
    if (typeof lista !== undefined && lista != null) {
      let listaFiltrada = lista.map(item => item.ptbr);
      if(listaFiltrada.length > 1) {
        let ultimo = listaFiltrada.pop();
        return listaFiltrada.join(', ') + ' e ' + ultimo;
      } else if (listaFiltrada.length > 0) {
        return listaFiltrada[0];
      }
    }
    return "";
  }

  appearToConfigureAddition() {
    let selectedDetails: any[] = this.budgetForm.get('details')?.value || [];
    let selectedBodyLocal: any = this.budgetForm.get('bodyLocal')?.value || null;

    if(selectedDetails) {
      
      this.fieldsAddition = selectedDetails.map(selected => {
        return {
          for: selected.ptbr,
          label: selected.name,
          formControlName: selected.ptbr,
          inputId: selected.ptbr                
        }
      })
    }

    if(selectedBodyLocal) {
      
      this.fieldsAddition = this.fieldsAddition.concat(
         {
          for: selectedBodyLocal.value,
          label: selectedBodyLocal.name,
          formControlName: selectedBodyLocal.value,
          inputId: selectedBodyLocal.value   
        }
      )
      
    }
  }

  handleAddition(value: any, fieldForm: string) {      
    console.log('event: ', value);
    this.additionPriceForm.get(fieldForm)?.setValue(value) ;
    let addition = this.recalculateAdditionValue(value);   
    this.holdAddition(fieldForm, addition);    
    this.generateBudget();
  }

  recalculateAdditionValue(additionValue: number) {    
    return this.tattooBaseValue * (additionValue/100);        
  }

  holdAddition(fieldForm: string, addition: number) {
      
      // lista vazia
      if((!this.additionsToSum || this.additionsToSum.length === 0)) {
        let additionToSum = {
          field: fieldForm,
          addition: addition
        }
        this.additionsToSum.push(additionToSum);
      }

      //alterar valor de addition quando já existe na lista    
      this.additionsToSum.map(item => {
        if (item.field == fieldForm) {
          item.addition = addition          
        } 
      })
    
      // adicionar item que não existe na lista
      if(!this.additionsToSum.some(item => item.field === fieldForm)) {
        let additionToSum = {
          field: fieldForm,
          addition: addition
        }
        this.additionsToSum.push(additionToSum);
      }
      
      console.log('Aditions to sum: ', this.additionsToSum)
  }

  sumAdditionValue() {
    let sum = this.additionsToSum.reduce((total, item) => total + item.addition, 0);    
    console.log('Recalculated on base value: ', this.tattooBaseValue + sum);
    return this.tattooBaseValue + sum;
  }

  copyText() {
    this.clipboard.copy(this.generatedBudget);
    this.toastService.successMsg("Orçamento  copiado");
  }

  saveBudget() {
    const budgetRaw = this.budgetForm.getRawValue();
    const configRaw = this.configForm.getRawValue();
    let budget: BudgetRequest = new BudgetRequest(
      budgetRaw.client,
      this.generatedBudget,
      budgetRaw.draw,
      budgetRaw.cm,
      configRaw.valorcm,
      this.getValueFromRaw(budgetRaw.bodyLocal),
      this.getValuesFromRaw(budgetRaw.style),
      this.getValuesFromRaw(budgetRaw.details),
      configRaw.percentageTax,
      configRaw.parkingPrice,
      configRaw.materials,
      configRaw.creditTax,
      'Orçado'
    );

    this.historicService.saveOnBudgetHistory(budget)
    .subscribe({
      next: (response: any)=>{
        const budget = response.body;
        this.atualizaHistorico(budget);
        this.clipboard.copy(this.generatedBudget);        
        this.toastService.successMsg("Orçamento salvo e copiado");
        this.indexTab = 2
        this.resetForm();
      },
      error: (error:HttpErrorResponse)=>{
        this.toastService.errorHandler(error);
      }
    })

  }

  private getValuesFromRaw(raw: any): any{
    return raw.map((item: { value: any; }) => item.value);
  }

  private getValueFromRaw(raw: any): any{
      return raw?.value;
  }

  resetForm() {
    this.budgetForm.reset(); 
    this.budgetForm.get('cm')?.setValue(null);
    this.configForm.get('valorcm')?.setValue(35);
    this.budgetForm.get('style')?.setValue(null);
    this.additionPriceForm.reset();
    this.additionsToSum = [];    
    this.generatedBudget = '';
    this.studioPercent = 0;
    this.netValue = 0;
  }

  showHint(event: any) {
    this.hintVisible = !this.hintVisible;
  }

  atualizaHistorico(budget: any){
      this.historicComponent?.addBudgetOnList(budget);
  }

  setEnum(enumType: any) {
      this.enumService.getEnum(enumType).subscribe({
        next:(resp: any)=>{
            const list = Object.keys(resp).map(key => {
                return {
                    value: resp[key].enumValue,
                    name: resp[key].namePtBr,
                    namePtBr: resp[key].namePtBr
                };
            });        
            list.sort((a, b) => a.namePtBr.localeCompare(b.namePtBr));
            this.setListEnum(enumType, list)      
        },
        error: (respErr)=>{
          if(respErr.status != 401) {
            this.toastService.errorHandler(respErr);          
          }
        }
    }); 
  }

  showBudgetValues() {
    return (this.generatedBudget !== '') && !this.budgetForm.invalid;
  }

  showAdditionBudgetTab() {
    return this.showBudgetValues() && (this.fieldsAddition.length > 0);
  }

  setListEnum(enumType: EnumType, list: any) {
    switch(enumType) {
      case EnumType.BodyLocal:
          this.bodyLocal = list;
          break;
      case EnumType.Details:
          this.details = list;
          break;
      case EnumType.Styles:
          this.styles = list;
          break;      
    }
  }

}




