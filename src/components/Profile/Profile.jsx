import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';
import { ErrorMessage } from '../Error';
import { RepositoryList, REPOSITORY_FRAGMENT } from '../Repository';


const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query($cursor: String) {
    viewer {
      repositories(
        first: 5,
        after: $cursor,
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        edges {
          node {
            ...repository
          }
        }
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

const Profile = () => {
  return (
    <Query
      query={GET_REPOSITORIES_OF_CURRENT_USER}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error, fetchMore }) => {
        if (error) {
          return <ErrorMessage error={error} />;
        }

        const { viewer } = data;
        if (loading && !viewer) {
          return <Loading />;
        }

        return (
          <div>
            {viewer.name} {viewer.login}
            <RepositoryList
              repositories={viewer.repositories}
              fetchMore={fetchMore}
              loading={loading}
              entry='viewer'
            />
          </div>
        )
      }}
    </Query>
  );
};

export default Profile;
