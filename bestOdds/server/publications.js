draws = {"numbers": [1,2,3,5], "prize": 90000}

if (LotteryDraws.find({}).count() === 0) {
        LotteryDraws.insert(draws);
};

Meteor.publish("recentDrawings", function(lim)
{
	LotteryDraws.remove({});
	draws = {"normal_balls": [1,2,3,5],"special_balls": [1,2], "prize": 90000, "next_prize":1000, "game":"PowerBall", "country": ["USA"], "winner": 0, "date": "19 de Setembro", "next_date": "20 de Setembro"};
	if (LotteryDraws.find({}).count() === 0) {
        LotteryDraws.insert(draws);
	};
	return LotteryDraws.find({}, {limit: lim});
});

Meteor.publish("lotteryDraws", function()
{
	return LotteryDraws.find();
});