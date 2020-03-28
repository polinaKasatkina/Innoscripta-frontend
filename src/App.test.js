import React from 'react';
import { render } from '@testing-library/react';
import Product from './components/Product';
import { CurrencyContext } from './components/context/currencyContext';

import renderer from 'react-test-renderer';

test('Product renders correctly on Main page', () => {

  const product = {
    id : 1,
    name : 'Margarita',
    description: 'cheese, tomatoes',
    price : 10,
    category :  { name : 'pizza' }
  };

  const tree = renderer
      .create(<CurrencyContext.Provider value={{ currency: "USD", usdToEuro : 1 }}><Product product={product} /></CurrencyContext.Provider>)
      .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Product renders correctly on Order page, not in cart', () => {

  const product = {
    id : 1,
    name : 'Margarita',
    description: 'cheese, tomatoes',
    price : 10,
    category :  { name : 'pizza' }
  };

  const tree = renderer
      .create(<CurrencyContext.Provider value={{ currency: "USD", usdToEuro : 1 }}>
        <Product product={product} order={true} addToCart={ () => {} } quantity={0} />
      </CurrencyContext.Provider>)
      .toJSON();
  expect(tree).toMatchSnapshot();
});


test('Product renders correctly on Order page, in cart', () => {

  const product = {
    id : 1,
    name : 'Margarita',
    description: 'cheese, tomatoes',
    price : 10,
    category :  { name : 'pizza' }
  };

  const tree = renderer
      .create(<CurrencyContext.Provider value={{ currency: "USD", usdToEuro : 1 }}>
        <Product product={product} order={true} addToCart={ () => {} } quantity={3} />
      </CurrencyContext.Provider>)
      .toJSON();
  expect(tree).toMatchSnapshot();
});
