import API, {APIResponse} from "../../../util/API";
import type {Product} from "../modules/ProductModule";

export default class ProductAPI extends API {

  /**
   * Fetch products from api
   * @returns {Promise<*>}
   */
  async fetchProducts(): Promise<APIResponse> {
    const response = await this.request('api/products');

    return response.json();
  }


  /**
   * Add product
   * @param data New product data
   * @returns {Promise<*>}
   */
  async addProduct(data: Product): Promise<APIResponse> {
    const response = await this.jsonRequest('api/product/add', data);

    return response.json();
  }

  async updateProduct(data: Product): Promise<APIResponse> {
    const response = await this.jsonRequest('api/product/update', data);

    return response.json();
  }


  /**
   * Remove a product by id
   * @param id
   * @returns {Promise<*>}
   */
  async removeProduct(id: string): Promise<APIResponse> {
    const response = await this.request(`api/product/remove/${id}`);

    return response.json();
  }


}