const products = document.querySelector(".producto-container");
const categories = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const btnLoad = document.querySelector(".btn-load");
const barsBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");
const cartMenu = document.querySelector(".cart");
const cartBubble = document.querySelector(".cart-bubble");
const cartBtn = document.querySelector(".cart-label");


// Contenedor de productos del carrito
const productsCart = document.querySelector(".cart-container");
//El total en precio del carrito
const total = document.querySelector(".total");
// Botón de comprar
const buyBtn = document.querySelector(".btn-buy");

//  Modal de agregado al carrito.
const successModal = document.querySelector(".add-modal");
//  Modal de agregado al carrito.
const deleteBtn = document.querySelector(".btn-delete");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
	localStorage.setItem("cart", JSON.stringify(cartList));
};

const renderProduct = (product) => {
	const { id, name, bid, cardImg } = product;
	return `
  <div class="producto">
    <img src="${cardImg}" alt="${name}" />
    <h3>${name}</h3>
    <p>${bid}$</p>
    <button
      class="boton"
      data-id="${id}"
      data-name="${name}"
      data-bid="${bid}"
      data-img="${cardImg}"
    > Añadir </button>
  </div>
  `;
};

const renderDividedProducts = (index = 0) => {
	products.innerHTML += productsController.dividedProducts[index]
		.map(renderProduct)
		.join("");
};

const renderFilteredProducts = (category) => {
	const productsList = productsData.filter((product) => {
		return product.category === category;
	});
	products.innerHTML = productsList.map(renderProduct).join("");
};

const renderProducts = (index = 0, category = undefined) => {
	if (!category) {
		renderDividedProducts(index);
		return;
	}
	renderFilteredProducts(category);
};

const changeShowMoreBtnState = (category) => {
	if (!category) {
		btnLoad.classList.remove("hidden");
		return;
	}
	btnLoad.classList.add("hidden");
};

const changeBtnActiveState = (selectedCategory) => {
	const categories = [...categoriesList];
	categories.forEach((categoryBtn) => {
		if (categoryBtn.dataset.category !== selectedCategory) {
			categoryBtn.classList.remove("active");
			return;
		}
		categoryBtn.classList.add("active");
	});
};

const changeFilterState = (e) => {
	const selectedCategory = e.target.dataset.category;
	changeShowMoreBtnState(selectedCategory);
	changeBtnActiveState(selectedCategory);
};

const applyFilter = (e) => {
	if (!e.target.classList.contains("category")) {
		return;
	} else {
		changeFilterState(e);
	}
	if (!e.target.dataset.category) {
		products.innerHTML = "";
		renderProducts();
	} else {
		renderProducts(0, e.target.dataset.category);
		productsController.nextProductsIndex = 1;
	}
};

const isLastIndexOf = () => {
	return (
		productsController.nextProductsIndex === productsController.productsLimit
	);
};

const showMoreProducts = () => {
	renderProducts(productsController.nextProductsIndex);
	productsController.nextProductsIndex++;
	if (isLastIndexOf()) {
		btnLoad.classList.add("hidden");
	}
};

const toggleMenu = () => {
	barsMenu.classList.toggle("open-menu");
	if (cartMenu.classList.contains("open-cart")) {
	  cartMenu.classList.remove("open-cart");
	  return;
	}
	overlay.classList.toggle("show-overlay");
};

const toggleCart = () => {
	cartMenu.classList.toggle("open-cart");
	if (barsMenu.classList.contains("open-menu")) {
		barsMenu.classList.remove("open-menu");
		return;
	}
	overlay.classList.toggle("show-overlay");
};

const closeOnClick = (e) => {
	if (!e.target.classList.contains("navbar-link")) {
		return;
	}
	barsMenu.classList.remove("open-menu");
	overlay.classList.remove("show-overlay");
};

const closeOnScroll = () => {
	if (
		!barsMenu.classList.contains("open-menu") &&
		!cartMenu.classList.contains("open-cart")
	) {
		return;
	}
	barsMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("show-overlay");
};

const closeOnOverlayClick = () => {
	barsMenu.classList.remove("open-menu");
	cartMenu.classList.remove("open-cart");
	overlay.classList.remove("show-overlay");
};

// ----------Slider Automatico-------------------------------------------
var Slider = document.querySelector(".slider");
var IconoDerecho = document.querySelector(".icono-derecho");
var IconoIzuierdo = document.querySelector(".icono-izquierdo");
var Imagenes = document.querySelectorAll(".img-slider").length;
Contador = 0;

function MoverSlider()
  {
    if(Contador > Imagenes - 1)
        {
          Contador = 0;
        } else if(Contador < 0)
                   {
                    Contador =  Imagenes - 1;
                   }
    Slider.style.transition = "all 1s ease"
    Slider.style.marginLeft = `-${100 * Contador}%`;
  }

function MoverDerecha()
  {
     Contador++;
     MoverSlider();
  }
  setInterval(MoverDerecha, 4000);

function MoverIzquierda()
  {
    Contador--;
    MoverSlider();
  }

// -----------------------------------------------------
const init = () => {
  renderProducts();
  categories.addEventListener("click", applyFilter);
  btnLoad.addEventListener("click", showMoreProducts);
  barsBtn.addEventListener("click", toggleMenu);
  cartBtn.addEventListener("click", toggleCart);
  barsMenu.addEventListener("click", closeOnClick);
  window.addEventListener("scroll", closeOnScroll);
  overlay.addEventListener("click", closeOnOverlayClick)
  IconoDerecho.addEventListener("click", MoverDerecha);
  IconoIzuierdo.addEventListener("click", MoverIzquierda)
};
  
init();