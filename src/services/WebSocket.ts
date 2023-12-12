import EventBus from './EventBus';
import message from '../components/message/Message';
import store from './Store';

class WSTransport<M> extends EventBus<any> {
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

  public connect(userId, chatId, token) {
    if (this.socket) {
      throw new Error('Already connected');
    }

    this.socket = new WebSocket(`${this.url}/${userId}/${chatId}/${token}`);

    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
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
      clearInterval(this.pingInterval);
      this.pingInterval = undefined as ReturnType<typeof setInterval>;
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
        store.set('messages', { data });
        if (['pong', 'user connected'].includes(data?.type)) {
          return;
        }
        this.emit(WSTransport.EVENTS.MESSAGE, data);
      } catch (e) {
        console.log(e.message);
      }
    });
  }
}

export default WSTransport;
