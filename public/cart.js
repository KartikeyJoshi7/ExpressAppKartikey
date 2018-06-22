$(function () {

    let cartList = $('#myarea')

    showCart(function (carts) {
        cartList.empty()
        for (cart of carts) {
            cartList.append(createCartItem(cart))
        }

        let bill = $('#totprice')
        bill.empty();
        bill.append(createBill(carts))

    })

})
