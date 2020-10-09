import { gql } from 'apollo-boost';

import * as cartQueries from './queries/cart.queries';
import * as userQueries from './queries/user.queries';

import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  getCartItemCount,
  getCartTotal
} from './cart.utils';

export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type DateTime {
    nanoseconds: Int!
    seconds: Int!
  }

  extend type User {
    id: ID!
    displayName: String!
    email: String!
    createdAt: DateTime!
  }

  extend type Mutation {
    ToggleCardHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
    RemoveItemFromCart(item: Item!): [Item]!
    ClearItemFromCart(item: Item!): [Item]!
    SetCurrentUser(user: User!): User!
  }
`;

const updateCartItemsRelatedQueries = (cache, newCartItems) => {
  cache.writeQuery({
    query: cartQueries.GET_ITEM_COUNT,
    data: { itemCount: getCartItemCount(newCartItems) }
  });

  cache.writeQuery({
    query: cartQueries.GET_CART_TOTAL,
    data: { cartTotal: getCartTotal(newCartItems) }
  });

  cache.writeQuery({
    query: cartQueries.GET_CART_ITEMS,
    data: { cartItems: newCartItems }
  });
};

export const resolvers = {
  Mutation: {
    toggleCardHidden: (_root, _args, { cache }) => {
      const { cartHidden } = cache.readQuery({
        query: cartQueries.GET_CART_HIDDEN
      });

      cache.writeQuery({
        query: cartQueries.GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden }
      });

      return !cartHidden;
    },

    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: cartQueries.GET_CART_ITEMS
      });

      const newCartItems = addItemToCart(cartItems, item);

      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },

    removeItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: cartQueries.GET_CART_ITEMS
      });

      const newCartItems = removeItemFromCart(cartItems, item);

      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },

    clearItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: cartQueries.GET_CART_ITEMS
      });

      const newCartItems = clearItemFromCart(cartItems, item);

      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },

    setCurrentUser: (_root, { user }, { cache }) => {
      cache.writeQuery({
        query: userQueries.GET_CURRENT_USER,
        data: { currentUser: user }
      });

      return user;
    }
  }
};
