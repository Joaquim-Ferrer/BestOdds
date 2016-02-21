Template.homePage.helpers({
	recentDrawings: function() {
		return LotteryDraws.find(Session.get("filter"));
	}
});