// @flow
import type {ProductRequest} from "./ProductModule";
import { handleActions, createAction } from 'redux-actions';
import { initialRequestState } from "./ProductModule";


export const CREATE_CONTEXT = 'create';
export const UPDATE_CONTEXT = 'update';

export type ProductForm = {
  name: string,
  price: number,
  productCode: string,
  description: string
}

const initialProductForm: ProductForm = {
  name: '',
  price: 0,
  productCode: '',
  description: '',
};

type ProductFormState = {
  context: string,
  data: ProductForm,
  request: ProductRequest
}

const initialProductFormState: ProductFormState = {
  context: CREATE_CONTEXT,
  data: initialProductForm,
  request: initialRequestState
};



export const apiSubmitProduct = createAction('PRODUCT_FORM_API_SUBMIT');
export const apiUpdateProduct = createAction('PRODUCT_FORM_API_UPDATE');


export const saveProductFormData = createAction('PRODUCT_FORM_DATA_SAVE');
export const clearProductFormData = createAction('PRODUCT_FORM_DATA_CLEAR');
export const setFormContext = createAction('PRODUCT_FORM_SET_CONTEXT');

export const productFormRequestPending = createAction('PRODUCT_FORM_REQUEST_PENDING');
export const productFormRequestFailed = createAction('PRODUCT_FORM_REQUEST_FAILED');
export const productFormRequestSuccessful = createAction('PRODUCT_FORM_REQUEST_SUCCESSFUL');

export default handleActions({
  [saveProductFormData]: (state, action) => ({ ...state, data: action.payload }),
  [clearProductFormData]: state => ({ ...state, context: CREATE_CONTEXT, data: initialProductForm }),
  [setFormContext]: (state, action) => ({ ...state, context: action.payload }),
  [productFormRequestPending]: state => ({ ...state, request: { isPending: true, success: false, failed: false }}),
  [productFormRequestFailed]: (state, action) => ({ ...state, request: { isPending: false, success: false, failed: action.payload || true }}),
  [productFormRequestSuccessful]: (state, action) => ({ ...state, request: { isPending: false, success: action.payload || true, failed: false }}),

}, initialProductFormState)