(function () {
	"use strict";

	const select = (el, all = false) => {
		el = el.trim()
		if (all) {
			return [...document.querySelectorAll(el)]
		} else {
			return document.querySelector(el)
		}
	}
	const on = (type, el, listener, all = false) => {
		let selectEl = select(el, all)

		if (selectEl) {
			if (all) {
				selectEl.forEach(e => e.addEventListener(type, listener))
			} else {
				selectEl.addEventListener(type, listener)
			}
		}
	}
	const scrollto = (el) => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		})
	}

	on("click", ".mobile-nav-toggle", function (e) {
		select("#navbar").classList.toggle("navbar-mobile")
		this.classList.toggle("bi-list")
		this.classList.toggle("bi-x")
	})

	on("click", "#navbar .nav-link", function (e) {
		let section = select(this.hash)
		if (section) {
			e.preventDefault()

			let navbar = select("#navbar")
			let header = select("#header")
			let sections = select("section", true)
			let navlinks = select("#navbar .nav-link", true)

			navlinks.forEach((item) => {
				item.classList.remove("active")
			})

			this.classList.add("active")

			if (navbar.classList.contains("navbar-mobile")) {
				navbar.classList.remove("navbar-mobile")
				let navbarToggle = select(".mobile-nav-toggle")
				navbarToggle.classList.toggle("bi-list")
				navbarToggle.classList.toggle("bi-x")
			}

			if (this.hash == "#header") {
				header.classList.remove("header-top")
				sections.forEach((item) => {
					item.classList.remove("section-show")
				})
				return;
			}

			if (!header.classList.contains("header-top")) {
				header.classList.add("header-top")
				setTimeout(function () {
					sections.forEach((item) => {
						item.classList.remove("section-show")
					})
					section.classList.add("section-show")

				}, 350);
			} else {
				sections.forEach((item) => {
					item.classList.remove("section-show")
				})
				section.classList.add("section-show")
			}

			scrollto(this.hash)
		}
	}, true)

	window.addEventListener("load", () => {
		if (window.location.hash) {
			let initial_nav = select(window.location.hash)

			if (initial_nav) {
				let header = select("#header")
				let navlinks = select("#navbar .nav-link", true)

				header.classList.add("header-top")

				navlinks.forEach((item) => {
					if (item.getAttribute("href") == window.location.hash) {
						item.classList.add("active")
					} else {
						item.classList.remove("active")
					}
				})

				setTimeout(function () {
					initial_nav.classList.add("section-show")
				}, 350);

				scrollto(window.location.hash)
			}
		}
	});

	let darkBoxVisible = false;

		window.addEventListener('load', (event) => {
			let images = document.querySelectorAll("div.galimg > img");
			if(images !== null && images !== undefined && images.length > 0) {
				images.forEach(function(img) {
					img.addEventListener('click', (evt) => {
						showDarkbox(img.src);
					});
				});
			}
		});

		function showDarkbox(url) {
			if(!darkBoxVisible) {
				let x = (window.innerWidth - 1280) / 2;
				let y = window.scrollY + 50;

				// Create the darkBox
				var div = document.createElement("div");
				div.id = "darkbox";
				div.innerHTML = '<img class="darkboximg" src="'+url+'" />';
				document.body.appendChild(div);
				let box = document.getElementById("darkbox");
				box.style.left = x.toString()+"px";
				box.style.top = y.toString()+"px";
				box.style.height = 'auto';
				box.addEventListener('click', (event) => {
					// Remove it
					let element = document.getElementById("darkbox");
					element.parentNode.removeChild(element);

					darkBoxVisible = false;
				})

				darkBoxVisible = true;

			} else {
				// Remove it
				let element = document.getElementById("darkbox");
				element.parentNode.removeChild(element);

				darkBoxVisible = false;
			}
		}

})()