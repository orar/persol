// @flow
import React from 'react';
import type { Product } from '../../modules/ProductModule';
import moment from 'moment'
import { ghsFormatter } from "../../../../util/HelperUtil";
import './ProductItem.scss';
import ProductAction from "../ProductAction/ProductAction";
import toUpper from 'lodash/toUpper'

type Props = {
  data: Product,
  remove: (id: string) => any
}

type State = {
  hover: boolean
}

/**
 * Renders a single product as a list item
 * @param data
 * @returns {*}
 * @constructor
 */
class ProductItem extends React.Component<Props, State> {
  props: Props;
  state: State = { hover: false };

  _toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };

  render() {
    const { data } = this.props;

    const highlight = this.state.hover ? { backgroundColor: '#f4f4f4'} : {};

    return (
      <div
        style={highlight}
        onMouseLeave={this._toggleHover}
        onMouseEnter={this._toggleHover}
        className="productContainer"
      >
        <div className="nameWrap">{data.name}</div>
        <div className="stockInfoWrap">
          <div className="price">Price: {ghsFormatter(data.price)}</div>
          <div className="productCode">Product Code: {toUpper(data.productCode)}</div>
        </div>
        <div className="description">{data.description}</div>
        <div className="footBar">
          <ProductAction data={data}/>
          <div className="dateCreated">Date created: {moment(data.date).local(true).format('DD MMM, YYYY')}</div>
        </div>
      </div>
    )
  }
}

export default ProductItem;
