$(document).ready(function() {

  /////////////////////////////////////////////////
  //    get request for products in DB
  /////////////////////////////////////////////////

  loadProducts();
  loadFavorites();
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
    });
};

// Function to render favorites / filtered products from database
const renderFavorites = function(arrOfFavorites) {
  $('#favorites').empty();
  for (const favorite of arrOfFavorites) {
    const $favoriteElement = createFavoriteElement(favorite);
    $('#favorites').prepend($favoriteElement);
  }

};

// Function to create HTML to prepend favorites in the page
const createFavoriteElement = function(favoritesObj) {

  const $element = $(
    `<div>
    <img src="${favoritesObj.thumbnail_photo_url}"
    alt="">
    <p>${favoritesObj.title}</p>
    </div>`
  );

  return $element;
};

const loadFavorites = function() {
  $.get('/api/products/favorites')
    .then(data => {
      renderFavorites(data);
    });
};

const sendFilterRequest = (filters) => {
  $.get('/api/products', filters)
    .then(data => {
      renderProducts(data);
    })
    .catch(error => console.error(error));
};

$('#filter-items').on('submit', function(event) {
  event.preventDefault();
  const filters = {
    category: $('#category').val(),
    min_price: $('#min-price').val(),
    max_price: $('#max-price').val()
  };
  sendFilterRequest(filters);
});

