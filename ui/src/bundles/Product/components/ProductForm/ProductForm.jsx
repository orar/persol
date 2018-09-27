// @flow
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import type {ProductRequest, Product } from "../../modules/ProductModule";
import './ProductForm.scss';
import type {ProductForm} from "../../modules/ProductFormModule";
import {CREATE_CONTEXT, UPDATE_CONTEXT} from "../../modules/ProductFormModule";

type Props = {
  data: ProductForm,
  request: ProductRequest,
  context: string,
  onSubmit: (data: Object) => any,
  onUpdate: (data: Object) => any,
  setFormContext: (data: string) => any,
  clearFormData: () => any,
  saveFormData: (data: Object) => any,
}

type State = {
  data: { [string]: any },

}



class ProductFormComponent extends Component<Props, State> {
  props: Props;
  state: State = { data: {}};

  _handleChange = (e: SyntheticEvent<KeyboardEvent>, form: Object) => {
    const data = Object.assign({}, this.props.data, { [form.id]: form.value });
    this.props.saveFormData(data);
  };


  /**
   * Submits a form to api
   *
   * @param evt
   * @private
   */
  _onSubmit = (evt: SyntheticEvent<*>) => {
    const { context, onSubmit, data, onUpdate, clearFormData  } = this.props;

    if(context === CREATE_CONTEXT){
      return onSubmit(data);
    }
    onUpdate(data);
    evt.preventDefault();

    setTimeout(() => {
      clearFormData();
    }, 3000);
  };

  render() {
    const { request, context, data } = this.props;

    const buttonText = context === CREATE_CONTEXT ? 'Add product' : 'Update product';

    return (
      <div className="productFormContainer">
        <div className="formTitle">
          <div className="title">Add product</div>
        </div>
        <div className="formContainer">

          <Form loading={request.isPending} onSubmit={this._onSubmit}>
            <Form.Group widths='equal'>
              <Form.Input id="name" required value={data.name}  onChange={this._handleChange} fluid label='Name' placeholder='Name' />
              <Form.Input id="price" value={data.price} onChange={this._handleChange} fluid label='Price' placeholder='Price' />
              <Form.Input id="productCode" value={data.productCode} onChange={this._handleChange} fluid label='Product Code'  placeholder='Product Code' />
            </Form.Group>
            <Form.TextArea id="description" value={data.description}  onChange={this._handleChange} label='Description' placeholder='Describe product' />
            <Form.Button>{buttonText}</Form.Button>
          </Form>

        </div>
      </div>
    )
  }
}


export default ProductFormComponent;
