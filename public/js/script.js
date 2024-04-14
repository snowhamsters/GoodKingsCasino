/* script.js is used in every file and includes the header/footer.
 * Other javascript files are for specific pages.
 */
$(function() {
    if (localStorage.getItem("user") !== null) {
        $('#username-header').text("USER: " + localStorage.getItem('user'));
		$('#tokens-header').text("TOKENS: " + localStorage.getItem('tokens'));

		$('#login-header-button').remove();
		$('#signup-header-button').text("Logout");
		$('#signup-header-button').attr('href', '/logout');
    };

	$('#signup-header-button').click(function() {
		if (localStorage.getItem("user") !== null) {
			localStorage.clear();
			window.location.href = '/home';
		}
	});
});

class Header extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = `
		<nav class="navbar" style="background-color: #332233">
			<form class="container-fluid justify-content-start">
				<a class="navbar-brand h1" style="color:#BB33BB" href="/home"><img id="logo2" src="images/Casino Logo_preview_rev_1.png"/></a>
				<a href="/home"><button class="btn btn-outline-light me-3" type="button">Home</button></a>
				<a href="/games"><button class="btn btn-outline-light me-3" type="button">Games</button></a>
				<a href="/store"><button class="btn btn-outline-light me-3" type="button">Store</button></a>
				<a href="/contact"><button class="btn btn-outline-light me-3" type="button">Contact Us</button></a>
				<div class="ms-auto">
					<span id="username-header">[Not Logged In]</span>
					<span id="tokens-header"></span>
					<a href="/login"><button class="btn btn-outline-light me-3" type="button" id="login-header-button">Login</button></a>
					<a href="/signup"><button class="btn btn-outline-light me-3" type="button" id="signup-header-button">Signup</button></a>
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