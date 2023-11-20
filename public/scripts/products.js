$(document).ready(function() {




  /////////////////////////////////////////////////
  //    get request for products in DB
  /////////////////////////////////////////////////


  loadProducts();
});


// Function to render products / filtered products from database
const renderProducts = function(arrOfProducts) {
  $('#products').empty();
  for (const product of arrOfProducts) {
    const $productElement = createProductElement(product);
    $('#products').prepend($productElement);
  }

};

// Function to create HTML to prepend products in the page
const createProductElement = function(productsObj) {

  const $element = $(
    `<div>
    <img src="${productsObj.thumbnail_photo_url}"
    alt="">
    <p>${productsObj.title}</p>
    </div>`
    );

    return $element;
  };

  const loadProducts = function() {
    $.get('/api/products')
      .then(data => {
        renderProducts(data);
      })
    }
