import EventBus from './EventBus';

class WSTransport extends EventBus {
  static EVENTS = {
    OPEN: 'open',
    CLOSE: 'close',
    MESSAGE: 'message',
    ERROR: 'error',
  };

  private socket?: WebSocket;

  private pingInterval?: ReturnType<typeof setInterval>;

  private readonly pingIntervalTime = 6000;

  private url: string;

  constructor() {
    super();
    this.url = `wss://ya-praktikum.tech/ws/chats`;
  }

  public send(data: string | object) {
    if (!this.socket) {
      throw new Error('No connection');
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(userId: number, chatId: string, token: string): Promise<void> {
    if (this.socket) {
      throw new Error('Already connected');
    }

    this.socket = new WebSocket(`${this.url}/${userId}/${chatId}/${token}`);

    this.subscribe(this.socket);
    this.setupPing();

    return new Promise<void>((resolve, reject) => {
      this.on(WSTransport.EVENTS.ERROR, reject);
      this.on(WSTransport.EVENTS.OPEN, () => {
        this.off(WSTransport.EVENTS.ERROR, reject);
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
    clearInterval(this.pingInterval);
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, this.pingIntervalTime);

    this.on(WSTransport.EVENTS.CLOSE, () => {
      clearInterval(this.pingInterval as number);
      this.pingInterval = undefined as any;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransport.EVENTS.OPEN);
    });

    socket.addEventListener('close', () => {
      this.emit(WSTransport.EVENTS.CLOSE);
    });

    socket.addEventListener('error', (e: any) => {
      this.emit(WSTransport.EVENTS.ERROR, e);
    });

    socket.addEventListener('message', (message) => {
      try {
        const data = JSON.parse(message.data);

        if (['pong', 'user connected'].includes(data?.type)) {
          return;
        }

        this.emit(WSTransport.EVENTS.MESSAGE, data);
      } catch (e: any) {
        console.log(e.message);
      }
    });
  }
}

export default WSTransport;
