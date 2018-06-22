$(function () {

    let productList = $('#product-list')

    fetchProducts(function (products) {
        productList.empty()
        for (product of products) {
            productList.append(createProductCard(product))
        }
    })
  // console.log("clicked");
})

// $('#cartAddBtn').click(function () {
//   console.log("clicked");
//   let productName = $('#pname')
//
//   let productManufacturer = $('#pmanuf')
//   let productPrice = $('#pprice')
//   console.log("clicked");
//     addCart(
//         productName.val(),
//         productManufacturer.val(),
//         productPrice.val(),
//         function (addedProduct) {
//             window.alert("Added " + addedProduct.name + " to cart")
//             $(location).attr('href', '/')
//         }
//     )
// })
// console.log('clicked');

// function hello(){
//   console.log("clicked");
//   let card = $(this).parent()
//   console.log(card);
//   let productName = card.children('#pname')
//   console.log(productName.val());
//   let productManufacturer = card.children('#pmanuf')
//   //let productPrice = card.children('#pprice')
//   console.log("clicked");
//     addCart(
//         productName.val(),
//         productManufacturer.val(),
//         productPrice.val(),
//         function (addedProduct) {
//             window.alert("Added " + addedProduct.name + " to cart")
//             $(location).attr('href', '/')
//         }
//     )
// }
