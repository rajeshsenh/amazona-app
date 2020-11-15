import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!userInfo) {
        props.history.push('/signin');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({
                fullName,
                address,
                city,
                postalCode,
                country,
            })
        );
        props.history.push('/payment');
    };
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor='fullName'>Full Name</label>
                    <input
                        id='fullName'
                        type='text'
                        placeholder='Enter full name'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input
                        id='address'
                        type='text'
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='city'>City</label>
                    <input
                        id='city'
                        type='text'
                        placeholder='City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='postalcode'>Postal Code</label>
                    <input
                        id='postalcode'
                        type='text'
                        placeholder='Postal Code'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <input
                        id='country'
                        type='text'
                        placeholder='Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label />
                    <button className='primary' type='submit'>
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
}
