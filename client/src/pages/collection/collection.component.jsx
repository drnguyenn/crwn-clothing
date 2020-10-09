import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-apollo';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { GET_COLLECION_BY_TITLE } from '../../graphql/queries/collection.queries';

import Spinner from '../../components/spinner/spinner.component';

import './collection.styles.scss';

const CollectionPage = () => {
  const { collectionId } = useParams();

  const { loading, data } = useQuery(GET_COLLECION_BY_TITLE, {
    variables: { title: collectionId }
  });

  if (loading || !data) return <Spinner />;

  const {
    getCollectionsByTitle: { title, items }
  } = data;

  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
