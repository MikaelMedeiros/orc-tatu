import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'orc-tatu';
  generatedBudget = '';

  constructor(
    private fb: FormBuilder,
    private clipboard: Clipboard   
  ) {}

  categories: any[] = [];
  details: any[] = [];
  
  ngOnInit(): void {
    this.categories = [
      { name: 'Fineline', value: 'fineline' },
      { name: 'Bold Line', value: 'bold line' },
      { name: 'Realismo', value: 'realismo' },
      { name: 'Old School', value: 'old school' },
      { name: 'Black Work', value: 'black work' },
    ];

    this.details = [      
      { name: 'Sombreamento', value: 'sombreamento' },
      { name: 'Pontilhismo', value: 'pontilhismo' },
      { name: 'Linhas', value: 'linhas' },
      { name: 'Colorido', value: 'colorido' },
      { name: 'Tinta Branca', value: 'tinta branca' }
    ];
  }
;

  text: string | undefined;

  budgetForm = this.fb.group({
    id: [''],
    client: ['', Validators.required],    
    draw: ['', Validators.required],
    valorcm: [22.50, Validators.required],
    cm: [null, Validators.required],
    category: [[], Validators.required],
    bodyLocal: [''],
    details: [[]]
  }) 

  generateBudget() {
    this.calculateValueTattoo();    
  }

  calculateValueTattoo() {
    let cm = this.budgetForm.get('cm')?.value;
    let valorcm = this.budgetForm.get('valorcm')?.value;
    if((typeof valorcm !== undefined && valorcm != null) && (typeof cm !== undefined && cm != null)) {      
      let pixValue = (valorcm * cm) + 10;
      let creditValue = pixValue + 20;

      this.generatedBudget = `${this.budgetForm.get('client')?.value},`.concat(
        ` sua tattoo ${this.getTextFormated(this.budgetForm.get('category')?.value)}`).concat(
        ` ${this.budgetForm.get('draw')?.value}`).concat(
        ` de aproximadamente ${this.budgetForm.get('cm')?.value}cm,`).concat(
        ` no(a) ${this.budgetForm.get('bodyLocal')?.value}`).concat(
        ` com detalhe em ${this.getTextFormated(this.budgetForm.get('details')?.value)}`).concat(
        ` fica no valor de R$${pixValue} no PIX`).concat(
        ` ou R$${creditValue} no Cartão de Crédito em até 3x.`);

      console.log('Pix: R$', pixValue);
      console.log('Crédito: R$', creditValue);
    }
  }

  getTextFormated(lista: string []| undefined | null): string | undefined | null {
    console.log(lista);
    if (typeof lista !== undefined && lista != null) {
      const stringOrganizada = lista
      .map((str: string) => str + ", ")
      .join("")            
    
      return stringOrganizada.replace(/,\s*$/, " e");
    }
    
    return "";
  }

  copyText() {
    this.clipboard.copy(this.generatedBudget);
  }

  resetForm() {
    this.budgetForm.reset();
    this.generatedBudget = ''
  }
}
