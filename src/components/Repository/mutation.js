import gql from 'graphql-tag';

export const STAR_REPOSITORY = gql`
  mutation($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }  
  }
`;

export const UNSTAR_REPOSITORY = gql`
  mutation($repositoryId: ID!) {
    removeStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const WATCH_REPOSITORY = gql`
  mutation($repositoryId: ID!, $viewerSubscription: SubscriptionState!) {
    updateSubscription(input: { subscribableId: $repositoryId, state:  $viewerSubscription }) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`;
