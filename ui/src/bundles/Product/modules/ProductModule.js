// @flow
import { handleActions, createAction } from 'redux-actions';
import moment from 'moment';

export type Product = {
  id: string,
  name: string,
  price: number,
  description: string,
  productCode: string,
  date: string,
}


export type ProductRequest = {
  isPending: boolean,
  failed: boolean | string,
  success: boolean | string
}


type ProductState = {
  request: ProductRequest,
  data: Array<Product>,
}

export const initialRequestState = {
  isPending: false,
  failed: false,
  success: false,
};

const sample = {
  id: 'er453',
  price: 3452,
  name: 'Samsung Airfryer',
  productCode: 'saf9034',
  description: 'Samsung Airfryer dual inverter module heats fries in unison. Use for frying samsung air',
  date: moment().utc().toISOString(),
};

const arraySample = Array(10).fill(sample);


const initialState: ProductState =  {
  request: initialRequestState,
  data: arraySample
};


export const fetchApiProducts = createAction('PRODUCT_API_FETCH');
export const addApiProduct = createAction('PRODUCT_API_ADD');
export const updateApiProduct = createAction('PRODUCT_API_UPDATE');
export const removeApiProduct = createAction('PRODUCT_API_REMOVE');


export const productRequestPending = createAction('PRODUCT_REQUEST_PENDING');
export const productRequestFailed = createAction('PRODUCT_REQUEST_FAILED');
export const productRequestSuccessful = createAction('PRODUCT_REQUEST_SUCCESSFUL');

export const saveProduct = createAction('PRODUCT_SAVE');
export const removeProduct = createAction('PRODUCT_REMOVE');

const saveCacheProducts = (state, payload) => {
  if(Array.isArray(payload)){
    return { data: payload };
  }
  return state.map(d => d.id === payload.id ? payload : d);
};

const removeCachedProduct = (state, id) => {
  return state.filter(d => d.id !== id);
};

export default handleActions({
  [saveProduct]: (state, action) => ({ ...state, data: saveCacheProducts(state.data, action.payload) }),
  [removeProduct]: (state, action) => ({ ...state, data: removeCachedProduct(state.data, action.payload) }),
  [productRequestPending]: state => ({ ...state, request: { isPending: true, success: false, failed: false }}),
  [productRequestFailed]: (state, action) => ({ ...state, request: { isPending: false, success: false, failed: action.payload || true }}),
  [productRequestSuccessful]: (state, action) => ({ ...state, request: { isPending: false, success: action.payload || true, failed: false }}),
}, initialState)