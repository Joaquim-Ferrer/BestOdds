Template.homePage.helpers({

	recentDrawings: function() {
		document.title = "Lottery Mania"
		return LotteryDraws.find(Session.get("filter"));
	}
});