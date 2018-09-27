// @flow
import {all, call, put, take} from 'redux-saga/effects';
import {
  fetchApiProducts,
  productRequestSuccessful,
  removeApiProduct,
  removeProduct,
  saveProduct,
} from "../modules/ProductModule";
import {combineSagas} from "../../../util/Saga";
import ProductAPI from "../apis/ProductAPI";


function* fetchProductsWorker(api: ProductAPI): Generator<*, *, *> {
  while(true){
    const { payload } = yield take(fetchApiProducts().type);
    //yield put(productRequestPending());
    console.log(fetchApiProducts().type);

    try{
      const response = yield call([api, api.fetchProducts], payload);
      yield put(saveProduct(response.details));
      console.log(response);
      yield put(productRequestSuccessful());
    } catch(e){
      if(e.response){
        //alert
      }
    }
  }
}



function* removeProductWorker(api: ProductAPI): Generator<*, *, *> {
  while(true) {
    const { payload } = yield take(removeApiProduct().type);
    console.log(removeApiProduct().type);

    try {
      const response = yield call([api, api.removeProduct], payload);
      yield put(removeProduct(payload));
    } catch(e) {
      if(e.response){
        //alert
      }
    }
  }
}


function* productSaga(api: ProductAPI): Generator<*, *, *> {
  yield all(combineSagas([
    [fetchProductsWorker, api],
    [removeProductWorker, api],
  ]));
}


const api = new ProductAPI();
export default [productSaga, api]