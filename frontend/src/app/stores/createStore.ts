import { STORE_LOGIN, STORE_ROUTER, STORE_REGISTER, STORE_USER } from 'app/constants';
import { History } from 'history';
import { LoginStore } from './loginStore';
import { RouterStore } from './routerStore';
import { RegisterStore } from './registerStore';
import { UserStore } from './userStore';

export function createStores(history: History) {
  const routerStore = new RouterStore(history);
  const registerStore = new RegisterStore();
  const loginStore = new LoginStore();
  const userStore = new UserStore();

  return {
    [STORE_LOGIN]: loginStore,
    [STORE_ROUTER]: routerStore,
    [STORE_REGISTER]: registerStore,
    [STORE_USER]: userStore,
  };
}
