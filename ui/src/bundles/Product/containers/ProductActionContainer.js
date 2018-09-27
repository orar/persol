// @flow
import { removeApiProduct} from "../modules/ProductModule";
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import ProductAction from "../components/ProductAction";
import {setFormContext, saveProductFormData} from "../modules/ProductFormModule";

const mapStateToProps = (state) => ({
});


const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  saveFormData: (data) => dispatch(saveProductFormData(data)),
  setFormContext: (data) => dispatch(setFormContext(data)),
  removeProduct: (id) => dispatch(removeApiProduct(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductAction)