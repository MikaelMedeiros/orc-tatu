import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'orc-tatu';
  generatedBudget = '';

  constructor(
    private fb: FormBuilder,
    private clipboard: Clipboard   
  ) {};

  text: string | undefined;

  budgetForm = this.fb.group({
    id: [''],
    client: ['Fulano', Validators.required],    
    draw: ['Borboleta', Validators.required],
    valorcm: [10.00, Validators.required],
    cm: [2.5, Validators.required],
    category: ['FINELINE', Validators.required],
    bodyLocal: ['Pescoço'],
    details: ['SOMBREAMENTO']
  }) 

  generateBudget() {
    this.calculateValueTattoo();    
  }

  calculateValueTattoo() {
    let cm = this.budgetForm.get('cm')?.value;
    let valorcm = this.budgetForm.get('valorcm')?.value;
    if((typeof valorcm !== undefined && valorcm != null) && (typeof cm !== undefined && cm != null)) {      
      let pixValue = valorcm * cm;
      let creditValue = pixValue + 20;

      this.generatedBudget = `Oi ${this.budgetForm.get('client')?.value}`.concat(
        ` sua tattoo ${this.budgetForm.get('category')?.value}`).concat(
        ` de ${this.budgetForm.get('draw')?.value},`).concat(
        ` com ${this.budgetForm.get('cm')?.value}cm,`).concat(
        ` no ${this.budgetForm.get('bodyLocal')?.value}`).concat(
        ` com detalhe em ${this.budgetForm.get('details')?.value}`).concat(
        ` fica no valor de R$${pixValue} no PIX`).concat(
        ` ou R$${creditValue} no Cartão de Crédito em até 3x.`);

      console.log('Pix: R$', pixValue);
      console.log('Crédito: R$', creditValue);
    }
  }

  copyText() {
    this.clipboard.copy(this.generatedBudget);
  }

  resetForm() {
    this.budgetForm.reset();
    this.generatedBudget = ''
  }
}
