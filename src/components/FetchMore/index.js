import React from 'react';

import './index.css';
import Loading from '../Loading';
import { ButtonUnObtrusive } from '../Button';

const FetchMore = ({
  loading, hasNextPage, fetchMore,
  variables, updateQuery, children,
}) => {
  if (loading) {
    return <Loading />;
  }

  return hasNextPage && (
    <ButtonUnObtrusive
      className="FetchMore-button"
      type="button"
      onClick={() => fetchMore({ variables, updateQuery })}
    >
      More {children}
    </ButtonUnObtrusive>
  );
};

export default FetchMore;
