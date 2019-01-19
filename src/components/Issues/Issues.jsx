import React from 'react';
import gql from 'graphql-tag';
import { Query, ApolloConsumer } from 'react-apollo';
import { ErrorMessage } from '../Error';
import Loading from '../Loading';
import IssueList from './IssueList';
import { ButtonUnObtrusive } from '../Button';
import { ISSUE_STATES, TRANSITION_LABELS, TRANSITION_STATE } from './constants';

import './index.css';

const GET_ISSUES_OF_REPOSITORY = gql`
  query(
    $repositoryName: String!,
    $repositoryOwner: String!,
    $issueState: IssueState!,
    $cursor: String,
  ) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5, after: $cursor, states: [$issueState]) {
        edges {
          node {
            id
            number
            state
            title
            url
            bodyHTML
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

const isShow = issueState => issueState !== ISSUE_STATES.NONE;

const IssuesView = ({ data, loading, error, fetchMore }) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { repository } = data;
  if (loading && !repository) {
    return <Loading />;
  }

  if (!repository.issues.edges.length) {
    return <div>No issues ...</div>;
  }

  return <IssueList
    issues={repository.issues}
    fetchMore={fetchMore}
    loading={loading}
  />;
};

const preFetchIssues = (client, repositoryName, repositoryOwner, issueState) => {
  const nextIssueState = TRANSITION_STATE[issueState];
  
  if (isShow(nextIssueState)) {
    client.query({
      query: GET_ISSUES_OF_REPOSITORY,
      variables: {
        repositoryName, repositoryOwner,
        issueState: nextIssueState,
      },
    });
  }
};

const IssueFilter = ({
  issueState, onChangeIssueState,
  repositoryName, repositoryOwner,
}) => (
  <ApolloConsumer>
    {client => (
      <ButtonUnObtrusive
        onClick={() => onChangeIssueState(TRANSITION_STATE[issueState])}
        onMouseOver={() => {
          preFetchIssues(client, repositoryName, repositoryOwner, issueState);
        }}
      >
        {TRANSITION_LABELS[issueState]}
      </ButtonUnObtrusive>
    )}
  </ApolloConsumer>
);

const Issues = ({
  repositoryName,
  repositoryOwner,
  issueState,
  onChangeIssueState
}) => (
  <div className="Issues">
    <IssueFilter
      issueState={issueState}
      onChangeIssueState={onChangeIssueState}
      repositoryName={repositoryName}
      repositoryOwner={repositoryOwner}
    />
    {isShow(issueState) && <Query
      query={GET_ISSUES_OF_REPOSITORY}
      variables={{
        repositoryName, repositoryOwner,
        issueState,
      }}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error, fetchMore }) => {
        return <IssuesView
          data={data}
          loading={loading}
          error={error}
          fetchMore={fetchMore}
        />;
      }}
    </Query>}
  </div>
);

export default Issues;
