Template.drawingPresentation.helpers({
	numbers: function() {
		return this.numbers.toString();
	},
	normal_ball: function(){
		return this;
	},
	special_ball: function(){
		return this;
	},
	date: function() {
		return this.display_date + ", " + this.weekday;
	},
	has_next_prize: function() {
		return this.next_prize != "";
	},
	has_next_date: function(){
		return this.next_date != "";
	},
	has_next_rollover: function(){
		return this.next_rollover > 0
	},
	no_next_rollover: function(){
		return this.next_rollover < 1
	}
});