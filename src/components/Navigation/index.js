import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import OrganizationSearch from '../OrganizationSearch';
import * as routes from '../../constants/routes';

import './index.css';

const Navigation = ({
  location: { pathname },
  organizationName,
  onOrganizationSearch,
}) => (
  <header className="Navigation">
    <div className="Navigation-link">
      <Link to={routes.PROFILE}>Profile</Link>
    </div>
    <div className="Navigation-link">
      <Link to={routes.ORGANIZATION}>Organization</Link>
    </div>
    {pathname === routes.ORGANIZATION && (
    <OrganizationSearch
      organizationName={organizationName}
      onOrganizationSearch={onOrganizationSearch}
    />)}
  </header>
);

export default withRouter(Navigation);
