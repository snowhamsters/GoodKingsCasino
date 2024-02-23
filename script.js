const carouselElement = document.querySelector('#gamesCarousel')
const carousel = new bootstrap.Carousel(carouselElement, {
  keyboard: false
})


class Header extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = `
		<nav class="navbar" style="background-color: #332233">
			<form class="container-fluid justify-content-start">
				<a class="navbar-brand h1" style="color:#BB33BB" href="Casino Home.html">Good Kings Casino</a>
				<button class="btn btn-outline-light me-3" type="button"><a href="Casino Home.html">Home</a></button>
				<button class="btn btn-outline-light me-3" type="button"><a href="Casino Games.html">Games</a></button>
				<button class="btn btn-outline-light me-3" type="button"><a href="Casino Store.html">Store</a></button>
				<button class="btn btn-outline-light me-3" type="button"><a href="Casino Contact.html">Contact Us</a></button>
				<div class="ms-auto">
					<button class="btn btn-outline-light me-3" type="button"><a href="Casino Login.html">Login</a></button>
					<button class="btn btn-outline-light me-3" type="button"><a href="Casino Signup.html">Signup</a></button>
				</div>
			</form>
		</nav>
		`;
		console.log("Header connected");
	}
}
customElements.define('header-component', Header);


class Footer extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = `
		<div class="footer">
			<div class="footerTop row">
				<div class="col">
				
				</div>
				<div class="col">
					
				</div>
				<div class="col">
					
				</div>
			</div>
			<div class="footerBottom row">
				<div class="col">
					
				</div>
				<div class="col">
				
				</div>
			</div>
		</div>
		`;
		console.log("Footer connected");
	}
}
customElements.define('footer-component', Footer);