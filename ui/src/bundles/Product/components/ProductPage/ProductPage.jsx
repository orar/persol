// @flow
import React from 'react';
import ProductFormContainer from "../../containers/ProductFormContainer";
import ProductListContainer from "../../containers/ProductListContainer";
import { Divider } from 'semantic-ui-react';
import Header from 'components/Header';
import './ProductPage.scss';


type Props = {

}

const ProductPage = ({}: Props) => {
    return (
        <div className="productPageContainer">
          <Header />
          <div className="productPageContent">
            <div className="pageHeader">Products</div>
            <Divider />
            <div className="formWrap">
              <ProductFormContainer />
            </div>
            <div className="listWrap">
              <ProductListContainer />
            </div>
          </div>
        </div>
    );
};

export default ProductPage;
