// @flow
import React from 'react';
import { Button } from "semantic-ui-react";
import type {Product} from "../../modules/ProductModule";
import {UPDATE_CONTEXT} from "../../modules/ProductFormModule";

type Props = {
  data: Product,
  saveFormData: (data: Object) => any,
  removeProduct: (id: string) => any,
  setFormContext: (id: string) => any,
}


const ProductAction = ({ data, saveFormData, setFormContext, removeProduct }: Props) => {

  const _onUpdate = () => {
    saveFormData(data);
    setFormContext(UPDATE_CONTEXT);
  };


  const _remove = () => {
    removeProduct(data.id);
  };

  return (
    <div>
      <Button.Group size="mini">
        <Button basic onClick={_onUpdate} >Update</Button>
        <Button basic onClick={_remove} >Remove</Button>
      </Button.Group>
    </div>
  );

};

export default ProductAction;
