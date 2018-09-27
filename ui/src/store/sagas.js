import { all } from 'redux-saga/effects';
import { combineSagas } from 'util/Saga';
import { sagaMiddleware } from './middleware';
import productSagaBinding from 'bundles/Product/sagas/ProductSaga';
import productFormSagaBinding from 'bundles/Product/sagas/ProductFormSaga';

export function* rootSaga() {
  yield all(combineSagas([
    productSagaBinding,
    productFormSagaBinding
  ]));
}

export const injectSaga = (store, { key, saga }) => {
  if (Object.hasOwnProperty.call(store.asyncSagas, key)) return;

  const s = store;
  s.asyncSagas[key] = saga;
  sagaMiddleware.run(s.asyncSagas[key]);
};
