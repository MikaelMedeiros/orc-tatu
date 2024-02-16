import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRemoveClassCheckbox]'
})
export class RemoveClassCheckboxDirective  implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const checkboxElement = this.el.nativeElement.querySelector('.p-checkbox');
    if (checkboxElement) {
      this.renderer.removeClass(checkboxElement, 'p-checkbox');
    }
  }
}
