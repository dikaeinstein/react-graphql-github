import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../Loading';
import { ErrorMessage } from '../Error';
import { RepositoryList, REPOSITORY_FRAGMENT } from '../Repository';


const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query($organizationName: String!, $cursor: String) {
    organization(login: $organizationName) {
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

const Organization = ({ organizationName }) => {
  return (
    <Query
      query={GET_REPOSITORIES_OF_ORGANIZATION}
      variables={{ organizationName }}
      skip={organizationName === ''}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error, fetchMore }) => {
        if (error) {
          return <ErrorMessage error={error} />;
        }

        const { organization } = data;
        if (loading && !organization) {
          return <Loading />;
        }

        return (
          <div>
            {organization.name} {organization.login}
            <RepositoryList
              repositories={organization.repositories}
              fetchMore={fetchMore}
              loading={loading}
              entry={'organization'}
            />
          </div>
        )
      }}
    </Query>
  );
};

export default Organization;
