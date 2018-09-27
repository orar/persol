import { combineReducers } from 'redux';
import stateReducer from 'modules/StateModule';
import productReducer from 'bundles/Product/modules/ProductModule';
import productFormReducer from 'bundles/Product/modules/ProductFormModule';

const reduxModule = require('redux');

// eslint-disable-next-line no-underscore-dangle
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/INIT';

export const makeRootReducer = (asyncReducers) => {
  const appReducer = combineReducers({
    product: productReducer,
    productForm: productFormReducer,

    ...asyncReducers,
  });

  return (state, action) => appReducer(stateReducer(state, action), action);
};

export default makeRootReducer;
