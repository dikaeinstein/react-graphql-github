import React from 'react';
import RepositoryItem from '../RepositoryItem';
import FetchMore from '../../FetchMore';
import Issues from '../../Issues';

import '../index.css';

const getUpdateQuery = entry => (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    [entry]: {
      ...previousResult[entry],
      repositories: {
        ...previousResult[entry].repositories,
        ...fetchMoreResult[entry].repositories,
        edges: [
          ...previousResult[entry].repositories.edges,
          ...fetchMoreResult[entry].repositories.edges,
        ],
      },
    },
  };
};

const RepositoryList = ({ repositories, fetchMore, loading, entry }) => (
  <React.Fragment>
    {repositories.edges.map(({ node }) => (
      <div key={node.id} className="RepositoryItem">
        <RepositoryItem {...node} />
        <Issues
          repositoryOwner={node.owner.login}
          repositoryName={node.name}
        />
      </div>
    ))}
    <FetchMore
      loading={loading}
      fetchMore={fetchMore}
      updateQuery={getUpdateQuery(entry)}
      variables={{ cursor: repositories.pageInfo.endCursor }}
      hasNextPage={repositories.pageInfo.hasNextPage}
    >
      Repositories
    </FetchMore>
  </React.Fragment>
);

export default RepositoryList;
