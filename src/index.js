var CarouselItem = Backbone.Model.extend({
	title: "",
	images: []
});

var CarouselItems = Backbone.Collection.extend({
	url: "https://api.myjson.com/bins/cwczz",
	model: CarouselItem,
	parse: function (res) {
		return res.carouselItems
	}
});

var View = Backbone.View.extend({
	el: '#root',
	template: _.template($("#carousel-template").html()),
	initialize: function () {
		this.collection = new CarouselItems();
		this.collection.bind("reset", _.bind(this.render, this));
		this.collection.fetch({ reset: true });
	},
	render: function () {
		this.$el.html(this.template());

		this.carouselInstance = new Carousel(
			{
				carouselElement: this.$el.find(".carousel")[0],

				imageUrls: this.collection.toJSON().reduce(function (acc, val) {
					return acc.concat(val.images);
				}, []),

				beforeSlide: function (nextSlides, callback) {
					var images = nextSlides.map(function (imageEl) {
						return imageEl.src;
					});
					var randomizedImages = randomizeArray(images);
					nextSlides.forEach(function (imageEl, i) {
						imageEl.src = randomizedImages[i];
					});
					callback();
				}
			}
		);

		return this;
	}
});

var view = new View();
