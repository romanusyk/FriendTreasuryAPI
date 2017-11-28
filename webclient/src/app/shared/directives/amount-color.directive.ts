import { Directive, Input, ElementRef, HostBinding, OnInit } from '@angular/core';

@Directive({ selector: '[amountColor]' })
export class AmountColorDirective implements OnInit {
  @Input('amountColor') amountColor: number;
  private color: string;
  private minPrice = 0;
  private maxPrice = 1000;
  constructor(private el: ElementRef) { }
  ngOnInit(): void {
    const coeff = (this.amountColor - this.minPrice) / (this.maxPrice - this.minPrice);
    this.color = `rgb(${Math.round(Math.sin(coeff * Math.PI / 2) * 255)},${Math.round(Math.cos(coeff * Math.PI / 2) * 255)},0)`;
    (<HTMLElement>this.el.nativeElement).style.color = this.color;
  }
}
