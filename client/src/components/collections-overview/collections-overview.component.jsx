import React from 'react';
import { useQuery } from 'react-apollo';

import { GET_COLLECIONS } from '../../graphql/queries/collection.queries';

import CollectionPreview from '../collection-preview/collection-preview.component';
import Spinner from '../spinner/spinner.component';

import './collections-overview.styles.scss';

const CollectionsOverview = () => {
  const { loading, data } = useQuery(GET_COLLECIONS);

  if (loading || !data) return <Spinner />;

  const { collections } = data;

  return (
    <div className='collections-overview'>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default CollectionsOverview;
