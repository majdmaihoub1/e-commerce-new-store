import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/homepage/hompage.component';
import ShopPage from './Pages/shop/shop.component';
import SignPage from './Pages/signpage/sign.component';
import Header from './Components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot } from 'firebase/firestore';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, (snapShot) => {
          console.log(snapShot);

          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot,
            },
          });

          console.log(this.state);
        });
      }

      this.setState({ currentUser: userAuth });
      console.log(userAuth);
    });
  }
  //to avoid memory leak because it's an open subscription between
  //our app and the firebase
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
