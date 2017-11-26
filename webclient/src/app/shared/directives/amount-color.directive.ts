import { Directive, Input, ElementRef, HostBinding, OnInit } from '@angular/core';

@Directive({ selector: '[ft-amount-color],ft-amount-color]' })
export class AmountColorDirective implements OnInit {
    @Input() amount: number;
    private color: string;
    private minPrice = 0;
    private maxPrice = 1000;
    constructor(private el: ElementRef){}
    ngOnInit(): void {
        const coeff = (this.amount - this.minPrice) / (this.maxPrice - this.minPrice);
        this.color = `rgb(${Math.sin(coeff * Math.PI / 2) * 255},(${Math.cos(coeff * Math.PI / 2) * 255},0)`;
    }

    @HostBinding('style.color') getColor() {
        return this.color;
    }
}
