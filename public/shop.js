

function showCart(done){
  $.get('/api/carts', function (data) {
    done(data)
  })
}

function addCart(pname, manuf, price, done){
  console.log(pname,manuf,price)
  $.post('/api/carts', {
      name: pname,
      manufacturer: manuf,
      price:price
  }, function (data) {
      done(data)
  })
}


function fetchProducts (done) {
    $.get('/api/products', function (data) {
        done(data)
    })
}

function addProduct (name, manuf, price, done) {
    $.post('/api/products', {
        name: name,
        manufacturer: manuf,
        price: price
    }, function (data) {
        done(data)
    })
}

function changepageToaddProd(){
$(location).attr('href', '/add_products.html')
}

function changepageToCart(){
$(location).attr('href', '/cart.html')
}

function createProductCard (product) {
    return $(`
    <div class="col-3 card mx-2 my-2 p-4" id = "carder">
        <h4 class="product-name" id = "pname">${product.name}</h4>
        <div class="product-manufacturer" id = "pmanuf">${product.manufacturer}</div>
        <div class="row" id='interior'>
            <div class="col m-3 p-3" id = 'int'>
                <b>Rs.<span id = "pprice">${product.price}</span></b>
            </div>
            <button class="col btn btn-warning m-3" id = "buybtn" onclick="addToCart('${product.name}', '${product.manufacturer}', '${product.price}')">Buy</button>
        </div>
    </div>`
        )
}

// <div class = "cart_name">${cart.prod_name}<div>
// <div class = "cart_price">${cart.prod_price}</div>
// <div class = "cart_count">${cart.prod_count}</div>
function createCartItem (cart) {
  let ItemTot = cart.prod_count * cart.prod_price
  return $(`
    <li class = "list-group-item" id = "lister">

     <div class="container">
        <div class="row p-2">
        <div class="col" style = "font-size:25px; text-transform:capitalize ">
          ${cart.prod_name}<br>
          <div class = "row px-3"  style = "font-size: 15px" >
            <span style="font-weight:bold">By: </span>${cart.prod_manuf}
          </div>
        </div>
        <div class="col p-3">
          <span style="font-weight:bold">Price: </span>Rs. ${cart.prod_price}
        </div>
        <div class="col p-3">
        <span style="font-weight:bold">Qty: </span>${cart.prod_count}
        </div>
        <div class="col p-2" >
        <div class = "row" style= "float:right">
        <span style="font-weight:bold">Item Total:&nbsp</span>${cart.prod_count} X ${cart.prod_price} = &nbsp<span style = "font-weight:bold;">Rs. &nbsp</span>${ItemTot} &nbsp&nbsp
        <i class="fas fa-trash fa-lg" style = "color: #FF8C00;" onclick = "deleter('${cart.prod_name}','${cart.prod_manuf}','${cart.prod_price}','${0}')"></i>
        </div>
        </div>
      </div>
     </div>
     </li><br>`
  )
}

function deleter(pname, pmanuf, pprice, pcount){
 console.log('hillojasfa');
  $.post('/api/carts', {
      name: pname,
      manufacturer: pmanuf,
      price: parseInt(pprice),
      count: parseInt(pcount)
  }, function (data) {

  })
  $(location).attr('href', '/cart.html')
}

function addToCart(pname, pmanuf, pprice){

  let productName = pname
  console.log(productName)
  let productManufacturer = pmanuf
  let productPrice = parseInt(pprice)
  console.log(pmanuf,productPrice);
    addCart(
        productName,
        productManufacturer,
        productPrice,
        function (addedProduct) {
            window.alert("Added " + addedProduct.prod_name + " to cart")
            $(location).attr('href', '/')
        }
    )
}

function createBill(carts){

  var totprice = 0;
  var totcount = 0;
  for(cart of carts){
    totprice = totprice + (cart.prod_count * cart.prod_price);
    totcount = totcount + cart.prod_count;
  }
  console.log(totprice,totcount);
  return $(`
    <li class = "list-group-item" id = "lister">

     <div class="container">
        <div class="row p-2">
        <div class="col" style = "font-size:25px; text-transform:capitalize ">
          <span style="font-weight:bold font-size:25px; color:black">Total Price for: </span>${totcount} items<br>
        </div>
        <div class="col" style = "font-size:25px; text-transform:capitalize>
          <span style="font-weight:bold font-size:25px; color:black"></span>Rs. ${totprice}
        </div>
        </div>
        </div>
     </li><br>`
  )
}
