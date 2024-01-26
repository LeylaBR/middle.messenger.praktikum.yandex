type EventListener = (...args: any[]) => void;

class EventBus {
  private readonly listeners: { [event: string]: EventListener[] } = {};

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: EventListener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    // @ts-ignore: strange error
    this.listeners[event].push(callback);
  }

  off(event: string, callback: EventListener) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    // @ts-ignore: strange error
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: any) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    // @ts-ignore: strange error
    this.listeners[event].forEach((listener) => {
      if (listener) {
        listener(...args);
      }
    });
  }
}

export default EventBus;
