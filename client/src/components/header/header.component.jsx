import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-apollo';

import { auth } from '../../firebase/firebase.utils';

import { GET_CURRENT_USER } from '../../graphql/queries/user.queries';
import { GET_CART_HIDDEN } from '../../graphql/queries/cart.queries';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = () => {
  const {
    data: { currentUser }
  } = useQuery(GET_CURRENT_USER);

  const {
    data: { cartHidden }
  } = useQuery(GET_CART_HIDDEN);

  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/shop'>
          CONTACT
        </Link>
        {currentUser ? (
          <div className='option' onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className='option' to='/signin'>
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {cartHidden ? null : <CartDropdown />}
    </div>
  );
};

export default Header;
