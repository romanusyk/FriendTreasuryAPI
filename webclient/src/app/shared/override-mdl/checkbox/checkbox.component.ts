import { ViewEncapsulation, forwardRef, DoCheck, Renderer2, ElementRef, Inject, Optional, Input, Component, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DISABLE_NATIVE_VALIDITY_CHECKING, MdlCheckboxComponent } from '@angular-mdl/core';

@Component({
    selector: 'ft-checkbox',
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FtCheckBoxComponent),
      multi: true
    }],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './checkbox.template.html',
    host: {
      '(click)': 'onClick()',
      '[class.mdl-checkbox]': 'true',
      '[class.is-upgraded]': 'true',
      '[class.is-checked]': 'value',
      '[class.is-disabled]': 'disabled'
    },
    outputs: ['change']
})
export class FtCheckBoxComponent extends MdlCheckboxComponent implements OnInit {
    @Input() checked: boolean;
    constructor(
        renderer: Renderer2,
        elmRef: ElementRef) {
        super(elmRef, renderer);
    }

    ngOnInit(): void {
      this.writeValue(this.checked);
    }
}
