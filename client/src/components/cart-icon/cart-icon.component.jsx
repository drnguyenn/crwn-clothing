import React from 'react';
import { useMutation, useQuery } from 'react-apollo';

import {
  GET_ITEM_COUNT,
  TOGGLE_CART_HIDDEN
} from '../../graphql/queries/cart.queries';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN);

  const {
    data: { itemCount }
  } = useQuery(GET_ITEM_COUNT);

  return (
    <div className='cart-icon' onClick={toggleCartHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div>
  );
};

export default CartIcon;
