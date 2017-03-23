var data = {
	"carousel": [
		{
			"title": "First block",
			"images": [
				"https://s-media-cache-ak0.pinimg.com/originals/96/f3/c9/96f3c90041da231fc1f7d558fb729e26.jpg",
				"https://upload.wikimedia.org/wikipedia/commons/4/4c/Push_van_cat.jpg",
				"http://photos-us.bazaarvoice.com/photo/2/cGhvdG86d2VsbG5lc3Njb3Jl/365ec26b-866e-56b5-83a5-be084208f425",
				"https://s-media-cache-ak0.pinimg.com/originals/95/50/4c/95504cf735a9fc2213f0b52a6aa4a15d.png"
			]
		},
		{
			"title": "Second block",
			"images": [
				"https://cdn2.themysteriousworld.com/wp-content/uploads/2014/12/british-shorthair-cat.jpg",
				"http://www.newslinq.com/wp-content/uploads/2016/02/cats-87a.jpg",
				"http://mediad.publicbroadcasting.net/p/wual/files/styles/medium/public/201606/old_cat_-_molly_age_15_-_helena_jacoba.jpg",
				"http://www.wishgoodmorning.org/wp-content/uploads/2016/04/Good-Morning-Naughty-Cat-wg16207.jpg"
			]
		},
		{
			"title": "Third block",
			"images": [
				"https://photos-us.bazaarvoice.com/photo/2/cGhvdG86cHVyaW5hLWRlbnRhbGlmZQ/569a520a-a161-5a02-8481-cb43eb6c6656",
				"http://all-that-is-interesting.com/wordpress/wp-content/uploads/2012/08/ugly-cat-burmese.jpg",
				"http://www.cathouseonthekings.com/animals/F/FrankieJames_12074.jpg",
				"https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/2016/catscratchca.jpg"
			]
		}
	]
};

var slides = data.carousel.reduce(function(acc, val){
	return acc.concat(val.images);
}, []);

var carousel = document.querySelector(".carousel");

function Carousel(carouselEl, data){

	function slide(direction){

		currentSlide = currentSlide + (slidesInGroupCount * direction);

		if(currentSlide <= minSlide){
			currentSlide = minSlide;
		}
		else if(currentSlide >= maxSlide){
			currentSlide = maxSlide - slidesInGroupCount;
		}

		innerWrapperEl.style.transform = "translateX(" + ( -currentSlide  * slideWidth ) + "px)";

		var canGoNext = currentSlide + slidesInGroupCount < maxSlide;
		var canGoPrev = currentSlide > minSlide;

		nextButton.disabled = !canGoNext;
		prevButton.disabled = !canGoPrev;
	}

	function next(){
		slide(1);
	}
	function prev(){
		slide(-1);
	}

	var innerWrapperEl = carouselEl.querySelector(".carousel--inner-wrapper");
	var slideWidth = carousel.offsetWidth / 4;

	data.forEach(function(url){
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

	slide(-1);

	nextButton.addEventListener("click", next);
	prevButton.addEventListener("click", prev);
}

var carouselInstance = new Carousel(carousel, slides);