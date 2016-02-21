Meteor.publish("recentDrawings", function(lim)
{
	return LotteryDraws.find({}, {limit: lim});
});

Meteor.publish("lotteryDraws", function()
{
	return LotteryDraws.find();
});
