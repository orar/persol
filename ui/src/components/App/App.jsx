// @flow
import React from 'react';
import { Provider } from 'react-redux';
import {
  Switch, Router, Route, Redirect,
} from 'react-router-dom';
import { history } from 'modules/LocationModule';
import { NotFoundRoute } from 'components/NotFound';
import ProductPage from "../../bundles/Product/components/ProductPage/index";

type Props = {
  store: Object,
}

/**
 * App component.
 */
export default class App extends React.Component<Props> {
  /**
   * The component props.
   */
  props: Props;

  /**
   * Indicates if the component should be updated.
   *
   * @returns {boolean} True if the component should be updated, false otherwise.
   */
  shouldComponentUpdate() {
    return false;
  }

  /**
   * Renders the component.
   *
   * @returns The component.
   */
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Router history={history}>
            <Switch>
              <Redirect exact from="/" to="/product" />
              <Route path="/product" component={ProductPage} />
              <NotFoundRoute />
            </Switch>
        </Router>
      </Provider>
    );
  }
}
