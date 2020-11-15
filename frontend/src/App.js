import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/cartScreen';
import { useDispatch, useSelector } from 'react-redux';
import signinScreen from './screens/signinScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/registerScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

export default function App() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const signoutHandler = () => {
        dispatch(signout());
    };
    return (
        <BrowserRouter>
            <div className='grid-container'>
                <header className='row'>
                    <div>
                        <Link to='/' className='brand'>
                            amazona
                        </Link>
                    </div>
                    <div>
                        <Link to='/cart'>
                            Cart
                            {cartItems.length > 0 && (
                                <span className='badge'>{cartItems.length}</span>
                            )}
                        </Link>
                        {userInfo ? (
                            <div className='dropdown'>
                                <Link to='#'>
                                    {userInfo.name} <i className='fa fa-caret-down' />
                                </Link>
                                <ul className='dropdown-content'>
                                    <Link to='#signout' onClick={signoutHandler}>
                                        Sign Out
                                    </Link>
                                </ul>
                            </div>
                        ) : (
                            <Link to='/signin'>Sign In</Link>
                        )}
                    </div>
                </header>
                <main>
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/' component={HomeScreen} exact />
                    <Route path='/signin' component={signinScreen} exact />
                    <Route path='/register' component={RegisterScreen} exact />
                    <Route path='/shipping' component={ShippingAddressScreen} exact />
                    <Route path='/payment' component={PaymentMethodScreen} exact />
                    <Route path='/placeorder' component={PlaceOrderScreen} exact />
                </main>
                <footer className='row center'>All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}
