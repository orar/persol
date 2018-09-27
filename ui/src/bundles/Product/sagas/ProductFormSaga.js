// @flow
import {all, call, put, take} from 'redux-saga/effects';
import {productFormRequestPending, submitProduct, updateProduct, productFormRequestFailed, productFormRequestSuccessful} from "../modules/ProductFormModule";
import ProductAPI from "../apis/ProductAPI";
import { saveProduct } from "../modules/ProductModule";
import {combineSagas} from "../../../util/Saga";


function* addProductWorker(api: ProductAPI): Generator<*, *, *> {
  while (true) {
    const {payload} = yield take(submitProduct().type);
    yield put(productFormRequestPending());
    // pre add product
    try {
      const response = yield call([api, api.addProduct], payload);
      yield put(saveProduct(response.details));
      yield put(productFormRequestSuccessful());
    } catch (e) {
      if (e.response) {
        yield put(productFormRequestFailed(e.response.description));
      }
    }
  }
}

function* updateProductWorker(api: ProductAPI): Generator<*, *, *> {
  while (true) {
    const {payload} = yield take(updateProduct().type);
    yield put(productFormRequestPending());
    // pre add product
    try {
      const response = yield call([api, api.updateProduct], payload);
      yield put(saveProduct(response.details));
      yield put(productFormRequestSuccessful());
    } catch (e) {
      if (e.response) {
        yield put(productFormRequestFailed(e.response.description));
      }
    }
  }
}



function* productFormSaga(api: ProductAPI): Generator<*, *, *> {
  yield all(combineSagas([
    [updateProductWorker, api],
    [addProductWorker, api],
  ]));
}



const api = new ProductAPI();
export default [productFormSaga, api]