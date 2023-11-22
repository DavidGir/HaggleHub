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
    `<div class="single-product" id="${productsObj.id}">
    <a href="" method="post" action="/api/products">
    <img src="${productsObj.thumbnail_photo_url}"
    alt="">
    <p>${productsObj.title}</p>
    <a>
    <span class="admin-btn">
      <button class="btn btn-outline-success">SOLD</button>
      <button class="btn btn-outline-danger">DELETE</button>
    </span>
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

/////////////////////////////////////////
//       Ajax request for filters
/////////////////////////////////////////

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
      $buttonElement.closest('.favorite-product').remove();
      loadFavorites();
    })
    .catch(err => {

      console.log('Error deleting favorite:', err.message);
    });
};

// AJAX Request to add a favorite product to favorites page:
$(document).on('click', '.fav-btn', function(event) {
  event.preventDefault();

  const productId = $(this).data('product-id');
  console.log("Clicked Product ID:", productId);
  $.post('api/products/favorites', { productId: productId })
    .then(() => {
      // Change heart icon to red
      $(this).find('.fa-heart').css('color', 'red');
    })
    .catch(err => {
      console.log('Error in adding a favorite:', err.message);
    });
});


////////////////////////////////////////////////
//       Ajax request for specific product
////////////////////////////////////////////////

const renderPopup = function(arrOfProducts) {
  $('.pop').empty();
  for (const product of arrOfProducts) {
    const $popupElement = createPopup(product);
    $('.pop').append($popupElement);
    $('.pop').css("display", "flex");
  }
};

const createPopup = function(singleObj) {
  const $popup = `
  <div class="main-photo">
    <img
    src="${singleObj.photo_url}"
    alt="">
    </div>
      <span>
        <button title="Close" class="close-popup-btn btn btn-outline-dark">X</button>
        <button title="Add to Favorites" class="fav-btn btn btn-outline-danger" data-product-id="${singleObj.id}">
         <i class="fa-solid fa-heart" style="color: #383838;"></i>
       </button>
      </span>
    <div>
      <p>ON SALE!</p>
      <h3>${singleObj.title}</h3>
      <p>${singleObj.rating}/5</p>
      <p>$ ${singleObj.price}</p>
      <p>${singleObj.description}</p>
      <p>Quantity available: ${singleObj.current_inventory}</p>

      <a href="#">Add to cart</a>
    </div>
  `;

  return $popup;
};

const generatePopup = (filter) => {
  $.get('/api/products', filter)
    .then(data => {
      renderPopup(data);
    })
    .catch(error => console.error(error));
};

$(document).on('click', '.single-product', function(event) {
  event.preventDefault();
  const filter = {
    id: $(this).attr('id')
  }
  generatePopup(filter);

  // renderPopup(fakeData)
});

$(document).on('click', '.close-popup-btn', function() {
  $(this).closest('.pop').hide();
});

