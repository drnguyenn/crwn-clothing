import React from 'react';
import { useMutation } from 'react-apollo';

import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CLEAR_ITEM_FROM_CART
} from '../../graphql/queries/cart.queries';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const [addItem] = useMutation(ADD_ITEM_TO_CART);

  const [removeItem] = useMutation(REMOVE_ITEM_FROM_CART);

  const [clearItem] = useMutation(CLEAR_ITEM_FROM_CART);

  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div
          className='arrow'
          onClick={() => removeItem({ variables: { item: cartItem } })}
        >
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div
          className='arrow'
          onClick={() => addItem({ variables: { item: cartItem } })}
        >
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div
        className='remove-button'
        onClick={() => clearItem({ variables: { item: cartItem } })}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
