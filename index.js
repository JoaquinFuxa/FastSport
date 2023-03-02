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
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const buyBtn = document.querySelector(".btn-buy");
const successModal = document.querySelector(".add-modal");
const deleteBtn = document.querySelector(".btn-delete");
const Slider = document.querySelector(".slider");
const IconoDerecho = document.querySelector(".icono-derecho");
const IconoIzuierdo = document.querySelector(".icono-izquierdo");
const Imagenes = document.querySelectorAll(".img-slider").length;
Contador = 0;

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
      class="boton btn-add"
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

const renderCardProduct = (cartProduct) => {
	const { id, name, bid, img, quantity } = cartProduct;
	return `
	<div class="cart-item">
		<img src=${img} alt="zapa" />
		<div class="item-info">
	  		<h3 class="item-title">${name}</h3>
	  		<span class="item-price">${bid}</span>
		</div>
		<div class="item-handler">
			<span class="quantity-handler down" data-id=${id}>-</span>
			<span class="item-quantity">${quantity}</span>
			<span class="quantity-handler up" data-id=${id}>+</span>
		</div>
  	</div>
	`;
};

const renderCart = () => {
	if (!cart.length) {
		productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
		return;
	}
	productsCart.innerHTML = cart.map(renderCardProduct).join("");
};

const getCartTotal = () => {
	return cart.reduce((acc, cur) => {
		return acc + Number(cur.bid) * cur.quantity;
	}, 0);
};

const showTotal = () => {
	total.innerHTML = `${getCartTotal().toFixed(2)} ARS$`;
};

const renderCartBubble = () => {
	cartBubble.textContent = cart.reduce((acc, cur) => {
		return acc + cur.quantity;
	}, 0);
};

const disableBtn = (btn) => {
	if (!cart.length) {
		btn.classList.add("disabled");
	} else {
		btn.classList.remove("disabled");
	}
};

const checkCartState = () => {
	saveLocalStorage(cart);
	renderCart();
	showTotal();
	disableBtn(buyBtn);
	disableBtn(deleteBtn);
	renderCartBubble();
};

const addProduct = (e) => {
	if (!e.target.classList.contains("btn-add")) {
		return;
	}
	const { id, name, bid, img } = e.target.dataset;

	const product = productData(id, name, bid, img);

	if (isExistingCartProduct(product)) {
		addUnitToProduct(product);
		showSuccessModal("Se agregó una unidad del producto al carrito");
	} else {
		createCartProduct(product);
		showSuccessModal("El producto se ha agregado al carrito");
	}

	checkCartState();
};

const productData = (id, name, bid, img) => {
	return { id, name, bid, img };
};

const isExistingCartProduct = (product) => {
	return cart.find((item) => {
		return item.id === product.id;
	});
};

const addUnitToProduct = (product) => {
	cart = cart.map((cartProduct) => {
		return cartProduct.id === product.id
			? { ...cartProduct, quantity: cartProduct.quantity + 1 }
			: cartProduct;
	});
};

const showSuccessModal = (msg) => {
	successModal.classList.add("active-modal");
	successModal.textContent = msg;
	setTimeout(() => {
		successModal.classList.remove("active-modal");
	}, 1500);
};

const createCartProduct = (product) => {
	cart = [
		...cart,
		{
			...product,
			quantity: 1,
		},
	];
};

const handleMinusBtnEvent = (id) => {
	const existingCartProduct = cart.find((item) => {
		return item.id === id;
	});

	if (existingCartProduct.quantity === 1) {
		if (window.confirm("¿Desea eliminar el producto del carrito?")) {
			removeProductFromCart(existingCartProduct);
		}
		return;
	}

	substractProductUnit(existingCartProduct);
};

const handlePlusBtnEvent = (id) => {
	const existingCartProduct = cart.find((item) => {
		return item.id === id;
	});

	addUnitToProduct(existingCartProduct);
};

const removeProductFromCart = (existingProduct) => {
	cart = cart.filter((product) => product.id !== existingProduct.id);
	checkCartState();
};

const substractProductUnit = (existingProduct) => {
	cart = cart.map((product) => {
		return product.id === existingProduct.id
			? { ...product, quantity: Number(product.quantity) - 1 }
			: product;
	});
};

const handleQuantity = (e) => {
	if (e.target.classList.contains("down")) {
		handleMinusBtnEvent(e.target.dataset.id);
	} else if (e.target.classList.contains("up")) {
		handlePlusBtnEvent(e.target.dataset.id);
	}
	checkCartState();
};

const resetCartItems = () => {
	cart = [];
	checkCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
	if (!cart.length) return;
	if (window.confirm(confirmMsg)) {
		resetCartItems();
		alert(successMsg);
	}
};

const completeBuy = () => {
	completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
};

const deleteCart = () => {
	completeCartAction("¿Desea eliminar su carrito?", "Carrito eliminado");
};

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
  IconoIzuierdo.addEventListener("click", MoverIzquierda);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showTotal);
  renderCartBubble();
  disableBtn(buyBtn);
  disableBtn(deleteBtn)
  products.addEventListener("click", addProduct);
  productsCart.addEventListener("click", handleQuantity);
  buyBtn.addEventListener("click", completeBuy);
  deleteBtn.addEventListener("click", deleteCart)
};
  
init();