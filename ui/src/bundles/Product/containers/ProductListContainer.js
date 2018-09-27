// @flow
import {fetchApiProducts, removeApiProduct} from "../modules/ProductModule";
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import ProductList from "../components/ProductList";
import {saveProductFormData} from "../modules/ProductFormModule";

const mapStateToProps = (state) => ({
  data: state.product.data,
});


const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  fetchProducts: () => dispatch(fetchApiProducts()),
  saveFormData: data => dispatch(saveProductFormData(data)),

});


export default connect(mapStateToProps, mapDispatchToProps)(ProductList)