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
  $('.favorites-grid').empty();
  for (const favorite of arrOfFavorites) {
    const $favoriteElement = createFavoriteElement(favorite);
    $('.favorites-grid').append($favoriteElement);
  }

};

// Function to create HTML to append favorites in the page
const createFavoriteElement = function(favoritesObj) {

  const $element = $(
    `<div class="favorite-product">
        <img
          src="${favoritesObj.thumbnail_photo_url}"
          alt="">
        <div class="item-details">
        <a href="/products/${favoritesObj.id}">
          <h3 class="item-name">${favoritesObj.title}</h3>
        </a>
          <p class="item-price">$ ${favoritesObj.price}</p>
          <button class="delete-favorite" data-product-id="${favoritesObj.id}">Delete</button>
        </div>
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

// Attach event handler for delete button on products favorites page:
$(document).on('click', '.delete-favorite', function() {
  const productId = $(this).data('product-id');
  deleteFavorite(productId, $(this));
  loadFavorites();
});

const deleteFavorite = (productId, $buttonElement) => {
  $.post(`/api/products/favorites/${productId}/delete`)
    .then(() => {
      $buttonElement.closest('.favorite-item').remove();
    })
    .catch(err => {

      console.log('Error deleting favorite:', err.message);
    });
};

