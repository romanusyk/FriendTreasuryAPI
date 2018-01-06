import { ViewEncapsulation, forwardRef, DoCheck, Renderer2, ElementRef, Inject, Optional, Input, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MdlTextFieldComponent, DISABLE_NATIVE_VALIDITY_CHECKING } from '@angular-mdl/core';

@Component({
    selector: 'ft-textfield',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FtTextFieldComponent),
        multi: true
    }],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './text-field.template.html',
    host: {
        '[class.mdl-textfield]': 'true',
        '[class.is-upgraded]': 'true',
        '[class.mdl-textfield--expandable]': 'icon',
        '[class.mdl-textfield--floating-label]': 'isFloatingLabel',
        '[class.has-placeholder]': 'placeholder'
    },
})
export class FtTextFieldComponent extends MdlTextFieldComponent {
    @Input() errors: string;
    public get isValid() {
        if (!!this.inputEl && !!this.inputEl.nativeElement && !!this.inputEl.nativeElement.validity) {
            const input = (<HTMLInputElement>this.inputEl.nativeElement);
            return input.validity.valid ;
        }
        return true;
    }
    constructor(
        renderer: Renderer2,
        elmRef: ElementRef,
        @Optional() @Inject(DISABLE_NATIVE_VALIDITY_CHECKING) nativeCheckGlobalDisabled: Boolean) {
        super(renderer, elmRef, nativeCheckGlobalDisabled);
    }
}
