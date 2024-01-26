import store, { StoreEvents } from './Store';
import { isEqual } from './utils';

export function connect(
  Component: any,
  mapStateToProps: (state: object) => object
) {
    //@ts-ignore
  return class extends Component {
    constructor(tagName: string, props: any) {
      let state = mapStateToProps(store.getState());

      super(tagName, props);

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
            //@ts-ignore
          this.setProps({ ...newState });
        }

        state = newState;
      });
    }
  };
}
