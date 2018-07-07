export interface ModalConfig {
  inputs: object;
  outputs: object;
}

export interface UIKitModalRef {
  show: Function;
  hide: Function;
  toogle: Function;
}

export class ModalRef<T> {
  content: T;
  ref: UIKitModalRef;
}