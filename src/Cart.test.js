import React from 'react';
import { render } from '@testing-library/react';
import CartPersister from './classes/CartPersister';

test('If Cart LocalStorageData is array', () => {

    const cartPersister = new CartPersister();

    let cartData = "";

    expect(cartPersister.verifyCartData.bind(cartPersister, cartData)).toThrowError(new Error('Cart should be an array') );

});

test('If Cart LocalStorageData is array of objects', () => {

    const cartPersister = new CartPersister();

    let cartData = [1, 2];

    expect(cartPersister.verifyCartData.bind(cartPersister, cartData)).toThrowError(new Error('Wrong cart values') );

});

test('If Cart LocalStorageData array contains right ID value', () => {

    const cartPersister = new CartPersister();

    let cartData = [{ id : "hello" }];

    expect(cartPersister.verifyCartData.bind(cartPersister, cartData)).toThrowError(new Error('ID value should be integer') );

});

test('If Cart LocalStorageData array contains right Quantity value', () => {

    const cartPersister = new CartPersister();

    let cartData = [{ id : 1, quantity : "hello" }];

    expect(cartPersister.verifyCartData.bind(cartPersister, cartData)).toThrowError(new Error('Quantity value should be integer') );

});
