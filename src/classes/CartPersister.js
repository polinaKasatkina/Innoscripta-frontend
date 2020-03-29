import config from '../config';

class CartPersister {

    saveCart(cart) {

        let cartStorage = [];

        if (cart.length) {
            cart.map((item, i) => {
                cartStorage.push({
                    id : item.id,
                    quantity : item.quantity
                })
            });
        }

        localStorage.setItem('cart', JSON.stringify(cartStorage));

    }

    restoreCart() {
        let cart = [];

        try {
            const cartData = localStorage.getItem('cart');

            if (cartData) {
                const persistedCart = JSON.parse(cartData);
                this.verifyCartData(persistedCart);
                cart = persistedCart
            }
        } catch (error) {
            console.warn('Cart data is malformed.')
        }

        let productIDs = cart.map(item => {
            return item.id;
        });
        let fullCart = [];

        if (productIDs.length === 0) return fullCart;

        return fetch(config.backendHost + '/api/getProducts', {
            method: 'POST',
            body : JSON.stringify({
                productIDs : productIDs
            })
        })
            .then(response => {

                return response.json();
            })
            .then(data => {

                if (data.length > 0) {

                    data.map((item, i) => {
                        fullCart.push({
                            id : item.id,
                            name : item.name,
                            price : item.price,
                            quantity : cart[i].quantity
                        });

                    });

                }

                return fullCart;

            });
    }

    verifyCartData(cart) {

        if (Array.isArray(cart)) {

           cart.map(item => {

               if (item instanceof Object) {
                   if (!Number.isInteger(item.id)) {
                       throw new Error('ID value should be integer');
                   }

                   if (!Number.isInteger(item.quantity)) {
                       throw new Error('Quantity value should be integer');
                   }

               } else {
                   throw new Error('Wrong cart values');
               }


           });
        } else {
            throw new Error('Cart should be an array');
        }
    }

}

export default CartPersister;
