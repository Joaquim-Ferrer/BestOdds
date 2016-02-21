draws = {"numbers": [1,2,3,5], "prize": 90000}

if (LotteryDraws.find({}).count() === 0) {
        LotteryDraws.insert(draws);
};

Meteor.publish("recentDrawings", function(lim)
{
	return LotteryDraws.find({}, {limit: lim});
});

Meteor.publish("lotteryDraws", function()
{
	return LotteryDraws.find();
});