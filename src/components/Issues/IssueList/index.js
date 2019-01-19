import React from 'react';
import IssueItem from '../IssueItem';
import FetchMore from '../../FetchMore';

import '../index.css';

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    repository: {
      ...previousResult.repository,
      issues: {
        ...previousResult.repository.issues,
        ...fetchMoreResult.repository.issues,
        edges: [
          ...previousResult.repository.issues.edges,
          ...fetchMoreResult.repository.issues.edges,
        ],
      },
    },
  };
};

const IssueList = ({ issues, fetchMore, loading }) => (
  <div className="IssueList">
    {issues.edges.map(({ node }) => (
      <IssueItem key={node.id} issue={node} />
    ))}
    <FetchMore
      loading={loading}
      fetchMore={fetchMore}
      updateQuery={updateQuery}
      variables={{ cursor: issues.pageInfo.endCursor }}
      hasNextPage={issues.pageInfo.hasNextPage}
    >
      Issues
    </FetchMore>
  </div>
);

export default IssueList;
