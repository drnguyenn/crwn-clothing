import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useMutation, useQuery } from 'react-apollo';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import {
  GET_CURRENT_USER,
  SET_CURRENT_USER
} from './graphql/queries/user.queries';

import './App.css';

const App = () => {
  const {
    data: { currentUser }
  } = useQuery(GET_CURRENT_USER);

  const [setCurrentUser] = useMutation(SET_CURRENT_USER);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot =>
          setCurrentUser({
            variables: {
              user: {
                id: snapshot.id,
                ...snapshot.data()
              }
            }
          })
        );
      } else setCurrentUser({ variables: { user: userAuth } });
    });

    return unsubscribeFromAuth;
  }, [setCurrentUser, currentUser]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route
          exact
          path='/signin'
          render={() =>
            currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

export default App;
