export interface WindowResizeEvent {
  window: WindowRef;
  event: UIEvent
}

export interface WindowRef {
  screen: {
    width?: number,
    height?: number
  };
  addEventListener: Function;
}
