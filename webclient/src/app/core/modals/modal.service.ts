import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Provider,
  ReflectiveInjector,
} from '@angular/core';

import UIkit from 'uikit';

import { ModalConfig, ModalRef } from './modal.model';

@Injectable()
export class ModalService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }


  public shwoModal<T>(type: T, providers: Provider[] = [], config?: ModalConfig) {
    const modalRef = new ModalRef<T>();
    const enrichedProviders = [...providers, { provide: ModalRef, useValue: modalRef }];

    const modal = this.createComponent<T>(type, enrichedProviders);
    this.attachConfig(config, modal);

    const domElement = this.getDomElement(modal);

    modalRef.content = modal.instance;
    modalRef.ref = UIkit.modal.dialog(this.getModalContainer(domElement.tagName));

    document.getElementById(this.getModalSelector(domElement.tagName)).appendChild(domElement);

    return modalRef;
  }

  private createComponent<T>(type: any, providers: Provider[] = []): ComponentRef<T> {
    const resolvedProviders = ReflectiveInjector.resolve(providers);


    const childInjector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.injector);

    const childComponentRef = this.componentFactoryResolver
      .resolveComponentFactory(type)
      .create(childInjector);

    this.appRef.attachView(childComponentRef.hostView);

    return <ComponentRef<T>>childComponentRef;
  }

  private getDomElement<T>(ref: ComponentRef<T>): HTMLElement {
    const childDomElem = (ref.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    return childDomElem;
  }

  private attachConfig<T>(config: ModalConfig, componentRef: ComponentRef<T>): void {
    const inputs = config.inputs ? config.inputs : {};
    const outputs = config.outputs ? config.outputs : {};
    for (var key in inputs) {
      componentRef.instance[key] = inputs[key];
    }
    for (var key in outputs) {
      componentRef.instance[key] = outputs[key];
    }
  }

  private getModalSelector(tagName: string): string {
    return `modal-section-for-${tagName}`;
  }

  private getModalContainer(tagName: string): string {
    return `<div id="modal-section-for-${this.getModalContainer(tagName)}}"></div>`;
  }
}
