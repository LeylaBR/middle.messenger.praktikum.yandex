import store, { StoreEvents } from './Store';
import { isEqual } from './utils';
import Block from './Block';

export function connect<T>(
  Component: typeof Block<T>,
  mapStateToProps: (state: any) => any
) {
  return class extends Component {
    constructor(tagName, props) {
      let state = mapStateToProps(store.getState());

      super(tagName, props);

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());

        // если что-то из используемых данных поменялось, обновляем компонент
        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }

        state = newState;
      });
    }
  };
}
