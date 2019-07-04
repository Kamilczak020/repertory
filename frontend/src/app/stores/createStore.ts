import { STORE_LOGIN, STORE_ROUTER, STORE_REGISTER } from 'app/constants';
import { History } from 'history';
import { LoginStore } from './loginStore';
import { RouterStore } from './routerStore';
import { RegisterStore } from './registerStore';

export function createStores(history: History) {
  const routerStore = new RouterStore(history);
  const registerStore = new RegisterStore();
  const loginStore = new LoginStore();

  return {
    [STORE_LOGIN]: loginStore,
    [STORE_ROUTER]: routerStore,
    [STORE_REGISTER]: registerStore,
  };
}
