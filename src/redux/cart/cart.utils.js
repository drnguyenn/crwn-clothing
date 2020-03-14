export const addItemToCard = (cartItems, cartItemToAdd) => {
  const existingItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingItem)
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: ++cartItem.quantity }
        : cartItem
    );

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
