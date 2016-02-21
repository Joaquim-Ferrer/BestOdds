Router.configure({
	waitOn: function() {
		Session.setDefault("num_lim", 4);
		filter = {country: {"$in": ["Australia", "Brazil", "Portugal", "USA", "Germany", "UK"]}};
		Session.setDefault("filter", filter);
		return Meteor.subscribe("lotteryDraws");
	},
	layoutTemplate: "layout",
});

Router.route("/", {
	name: "home_page"
});
