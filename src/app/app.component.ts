import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  mandarUmWhatsapp() {
    window.open('https://wa.me/5561991885361?text=Oi%20Mikael,%20tudo%20bem?%20Gostaria%20de%20saber%20mais%20sobre%20o%20Orc%20Tattoo%20:D', '_blank')
  }

}
