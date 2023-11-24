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
    $('#products').append($productElement).slideDown('slow');
  }
};

// Function to create HTML to prepend products in the page
const createProductElement = function(productsObj) {

  let adminButtons = '';
  // isAdmin is being brought from the global variable set as a script on the products.ejs file
  if (isAdmin) {
    adminButtons = `
      <span class="admin-btn">
        <button class="sold btn btn-outline-success" data-product-id="${productsObj.id}">SOLD</button>
        <button class="delete btn btn-outline-danger" data-product-id="${productsObj.id}">DELETE</button>
      </span>`;
  }
  // If user is indeed an admin the functionalities to be able to mark product as sold or delete a product will appear
  const $element = $(
    `<div class="single-product" id="${productsObj.id}">
      <a href="" method="post" action="/api/products">
        <img src="${productsObj.thumbnail_photo_url}" alt="">
        </a>
        <p class="product-title">${productsObj.title}</p>
      ${adminButtons}
    </div>`
  );

  return $element;
};

const loadProducts = function() {
  $.get('/api/products')
    .then(data => {
      // Filter out sold products
      renderProducts(data.filter(product => !product.is_sold));
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
          <button class="delete-favorite btn btn-danger btn-sm" data-product-id="${favoritesObj.id}">Delete</button>
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

/* Show/hide filter form */
$('#show-filter').on('click', function() {
  $('#filter-form').toggle('slow');
});


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

// Attach event handler for delete button on products page:
$(document).on('click', '.delete.btn.btn-outline-danger', function(event) {
  event.stopPropagation();
  const productId = $(this).data('product-id');

  if (confirm('Are you sure you want to delete this product?')) {
    $.post(`api/products/${productId}/delete`)
      .then(() => {
        console.log('Product deleted successfully');
        $(`#product-${productId}`).remove();
        loadProducts();
      })
      .catch(err => {
        console.log('Error deleting product:', err.message);
      });
  }
});

// Attach event handler for sold button on products page:

$(document).on('click', '.sold.btn.btn-outline-success', function(event) {
  event.stopPropagation();
  const productId = $(this).data('product-id');

  $.post(`api/products/${productId}/sold`)
    .then(() => {
      console.log('Product sold');
      $(this).closest('.single-product').addClass('sold-out');
      alert('Product has been marked as sold.');
    })
    .catch(err => {
      console.log('Error marking product as sold', err.message);
    });
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
        <button title="Email" class="email-btn btn btn-outline-blue" data-product-id="${singleObj.id}"><i class="fa-solid fa-envelope" style="color: #383838;"></i>
        </button>
      </span>
    <div class="product-info">
      <h2>${singleObj.title}</h2>
      <h4>$ ${singleObj.price}</h4>
      <p>${singleObj.description}</p>
      <p>Quantity available: ${singleObj.current_inventory}</p>

      <a class="buy" href="#">Add to cart</a>
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
  };
  generatePopup(filter);
});

$(document).on('click', '.close-popup-btn', function() {
  $(this).closest('.pop').hide();
});

////////////////////////////////////////////////
//  Ajax request to load new added product
////////////////////////////////////////////////


/* Show/hide add new item form */

$('#show-add-item').on('click', function() {
  $('#product-form').toggle('slow');
});


$('#product-form').on('submit', function(e) {
  e.preventDefault();

  const formData = $(this).serialize();
  $.post('/api/products', formData).then((res) => {
    loadProducts();
  });
});



