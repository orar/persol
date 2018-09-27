// @flow
import React from 'react';
import ProductItem from "../ProductItem/index";
import type { Product } from '../../modules/ProductModule';
import './ProductList.scss';



type Props = {
  data: Array<Product>,
  fetchProducts: () => any,
  removeProduct: (id: string) => any,
}

class ProductList extends React.Component<Props> {


  componentDidMount() {
    this.props.fetchProducts();
  }


  render() {
    const  { data, removeProduct } = this.props;
    return (
      <div className="productListContainer">
        <div className="productList">
          {data.map((d, i) =>
            <ProductItem key={`${i}`} data={d} remove={removeProduct} />
          )}
        </div>
      </div>
    );
  }
}

export default ProductList;
