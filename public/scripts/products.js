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

/////////////////////////////////////////
//       Ajax request for specific product
/////////////////////////////////////////

const fakeData = [{
  id: 3,
  title: 'Spider-Man',
  rating: 4,
  price: 12,
  description: 'Spider-Man swings into action in this Funko Pop!',
  current_inventory: 24,
  photo_url: 'https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw8a971ee6/images/funko/upload/70097_POPMarvel_CWBAS_SpiderMan_GLAM-WEB.png?sw=800&sh=800'
}]

const renderPopup = function(arrOfProducts) {
  $('.pop').empty();
  for (const product of arrOfProducts) {
    const $popupElement = createPopup(product);
    $('.pop').append($popupElement);
    $('.pop').css("display", "flex");
  }
}

const createPopup = function(singleObj) {
  const $popup = `
  <div class="main-photo">
    <img
    src="${singleObj.photo_url}"
    alt="">
    </div>
    <span>
      <button class="close-popup-btn btn btn-outline-dark">X</button>
      <button class="fav-btn btn btn-outline-danger">
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
})

