import React from 'react';
import data from '../data';
import Product from '../components/Product';

export default function HomeScreen() {
    return (
        <div>
            <div className='row center'>
                {data.products.map((product) => (
                    <Product product={product} key={product._id} />
                ))}
            </div>
        </div>
    );
}
