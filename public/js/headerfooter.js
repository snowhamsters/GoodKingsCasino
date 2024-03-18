class Header extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = `
		<nav class="navbar" style="background-color: #332233">
			<form class="container-fluid justify-content-start">
				<a class="navbar-brand h1" style="color:#BB33BB" href="home.html">Good Kings Casino</a>
				<button class="btn btn-outline-light me-3" type="button"><a href="home.html">Home</a></button>
				<button class="btn btn-outline-light me-3" type="button"><a href="games.html">Games</a></button>
				<button class="btn btn-outline-light me-3" type="button"><a href="store.html">Store</a></button>
				<button class="btn btn-outline-light me-3" type="button"><a href="contact.html">Contact Us</a></button>
				<div class="ms-auto">
					<button class="btn btn-outline-light me-3" type="button"><a href="login.html">Login</a></button>
					<button class="btn btn-outline-light me-3" type="button"><a href="signup.html">Signup</a></button>
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