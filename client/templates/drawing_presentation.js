Template.drawingPresentation.helpers({
	numbers: function() {
		return this.numbers.toString();
	},
	date: function() {
		return this.display_date + ", " + this.weekday;
	},
	has_next_prize: function() {
		return !!this.next_prize;
	},
	has_rolover: function() {
		console.log("sdas" + this.next_rollover)
		if(this.next_rollover >= 0){
			return 1;
		}
		return 0;
	},
});