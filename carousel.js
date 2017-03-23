function Carousel(options) {

	function slide() {
		innerWrapperEl.style.transform = "translateX(" + (-currentSlide * slideWidth) + "px)";
	}

	function tryToSlide(direction) {

		var currentSlideCache = currentSlide;

		currentSlide = currentSlide + (slidesInGroupCount * direction);

		if (currentSlide <= minSlide) {
			currentSlide = minSlide;
		}
		else if (currentSlide >= maxSlide) {
			currentSlide = maxSlide - slidesInGroupCount;
		}

		var canGoNext = currentSlide + slidesInGroupCount < maxSlide;
		var canGoPrev = currentSlide > minSlide;

		nextButton.disabled = !canGoNext;
		prevButton.disabled = !canGoPrev;

		if (currentSlide !== currentSlideCache) {
			if (typeof beforeSlideFunc === "function") {
				beforeSlideFunc(Array.from(innerWrapperEl.children).slice(currentSlide, currentSlide + slidesInGroupCount), slide);
			}
			else {
				slide();
			}
		}

	}

	function next() {
		tryToSlide(1);
	}
	function prev() {
		tryToSlide(-1);
	}

	var carouselEl = options.carouselElement;
	var data = options.imageUrls;
	var beforeSlideFunc = options.beforeSlide;

	var innerWrapperEl = carouselEl.querySelector(".carousel--inner-wrapper");
	var slideWidth = carouselEl.offsetWidth / 4;

	data.forEach(function (url) {
		var image = document.createElement("img");
		image.src = url;
		image.style.width = slideWidth + "px";
		innerWrapperEl.appendChild(image);
	});

	var nextButton = carouselEl.querySelector(".carousel--controls--next");
	var prevButton = carouselEl.querySelector(".carousel--controls--prev");

	var minSlide = 0;
	var maxSlide = innerWrapperEl.children.length;
	var currentSlide = minSlide;
	var slidesInGroupCount = 4;

	tryToSlide(-1);

	nextButton.addEventListener("click", next);
	prevButton.addEventListener("click", prev);
}