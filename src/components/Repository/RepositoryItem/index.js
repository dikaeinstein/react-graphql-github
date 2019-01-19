import React from 'react';
import { Mutation } from 'react-apollo';
import Link from '../../Link';
import Button from '../../Button';
import { STAR_REPOSITORY, UNSTAR_REPOSITORY, WATCH_REPOSITORY } from '../mutation';
import REPOSITORY_FRAGMENT from '../fragments';

import '../index.css';

const isWatchingRepo = viewerSubscription => viewerSubscription === 'SUBSCRIBED';

const getUpdatedData = (client, id, viewerHasStarred) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });

  const totalCount = viewerHasStarred
    ? repository.stargazers.totalCount + 1
    : repository.stargazers.totalCount - 1;
  
  return {
    ...repository,
    stargazers: {
      ...repository.stargazers,
      totalCount,
    },
  };
};

const updateAddStar = (client, {
  data: {
    addStar: {
      starrable: { id, viewerHasStarred }
    }
  }
}) => {
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: getUpdatedData(client, id, viewerHasStarred),
  });
};

const updateRemoveStar = (client, {
  data: {
    removeStar: {
      starrable: { id, viewerHasStarred },
    },
  },
}) => {
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: getUpdatedData(client, id, viewerHasStarred),
  });
};

const updateWatch = (client, {
  data: {
    updateSubscription: {
      subscribable: { id, viewerSubscription },
    },
  },
}) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });

  const totalCount = viewerSubscription === 'SUBSCRIBED'
    ? repository.watchers.totalCount + 1
    : repository.watchers.totalCount - 1;
  
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      watchers: {
        ...repository.watchers,
        totalCount,
      },
    },
  });
};

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={url}>{name}</Link>
      </h2>
      <div className="RepositoryItem-title-action">
        {!viewerHasStarred
          ? (<Mutation
                mutation={STAR_REPOSITORY}
                variables={{ repositoryId: id }}
                update={updateAddStar}
              >
                {(addStar, { data, loading, error }) => (
                  <Button
                    className={'RepositoryItem-title-action'}
                    onClick={addStar}
                  >
                    {stargazers.totalCount} Star
                  </Button>
                )}
              </Mutation>)
          : <span>
            <Mutation
              mutation={UNSTAR_REPOSITORY}
              variables={{ repositoryId: id }}
              update={updateRemoveStar}
            >
              {(removeStar, { data, loading, error }) => (
                <Button
                  className={'RepositoryItem-title-action'}
                  onClick={removeStar}
                >
                  {stargazers.totalCount} Unstar
                </Button>
              )}
            </Mutation>
          </span>}

          {<Mutation
              mutation={WATCH_REPOSITORY} 
              variables={{
                repositoryId: id,
                viewerSubscription: isWatchingRepo(viewerSubscription)
                  ? 'UNSUBSCRIBED' : 'SUBSCRIBED',
              }}
              update={updateWatch}
              optimisticResponse={{
                updateSubscription: {
                  __typename: 'Mutation',
                  subscribable: {
                    __typename: 'Repository',
                    id,
                    viewerSubscription: isWatchingRepo(viewerSubscription)
                      ? 'UNSUBSCRIBED'
                      : 'SUBSCRIBED',
                  },
                },
              }}
            >
              {(updateSubscription) => (
                <Button
                  className={'RepositoryItem-title-action'}
                  onClick={updateSubscription}
                >
                  {watchers.totalCount}
                  {' '}
                  {isWatchingRepo(viewerSubscription) ? 'Unwatch' : 'Watch'}
                </Button>
              )}
            </Mutation>}
      </div>
    </div>
    <div className="RepositoryItem-description">
      <div
        className="RepositoryItem-description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      <div className="RepositoryItem-description-details">
        <div>
          {primaryLanguage && (
            <span>Language: {primaryLanguage.name}</span>
          )}
        </div>
        <div>
          {owner && (
            <span>
              Owner: <a href={owner.url}>{owner.login}</a>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default RepositoryItem;
