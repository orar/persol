// @flow
import React from 'react';
import { Trans } from '@lingui/react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import config from 'config/index';

import './NotFound.scss';

export const NotFoundRoute = () => <Redirect to={{ state: { notFoundError: true } }} />;

export const CaptureNotFoundRoute = withRouter(
  ({ children, location }) => (
    location && location.state && location.state.notFoundError ? <NotFound /> : children
  ),
);

const NotFound = () => (
    <div className="not-found-container">
      <p className="code">
        404
      </p>
      <p>
        <Trans>
          The Page you are looking for could not be found!
        </Trans>
      </p>
      <p>
        <Link to={config.route.index}>
          <Trans>
            Back to Home
          </Trans>
        </Link>
      </p>
    </div>

);

export default NotFound;
