// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import ProductForm from "../components/ProductForm";
import {saveProductFormData, apiSubmitProduct, setFormContext, apiUpdateProduct} from "../modules/ProductFormModule";

const mapStateToProps = (state) => ({
  ...state.product
});


const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onSubmit: (data) => dispatch(apiSubmitProduct(data)),
  onUpdate: (data) => dispatch(apiUpdateProduct(data)),
  saveFormData: data => dispatch(saveProductFormData(data)),
  clearFormData: data => dispatch(saveProductFormData(data)),
  setFormContext: data => dispatch(setFormContext(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)