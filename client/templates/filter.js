Template.filter.helpers({
	options: function(){
		return ["Portugal", "USA", "Germany", "UK", "Italy"];
	},
	selection: function() {
		filter = Session.get("filter");
		console.log(filter["country"]["$in"]);
		console.log(Session.get("filter"));
		return filter["country"]["$in"];
	}
})

Template.filter.events({
	"change .add_filter": function(event) {
		var country_added = event.target.value;
		filter = Session.get("filter");
		console.log(event);
		/*if(country_added === "All" && event.target.checked) {
			fo
		}*/
		if(filter["country"]) {
			countries_in_filter = filter["country"]["$in"]
			if(event.target.checked) {
				countries_in_filter.push(country_added);
				filter["country"] = {"$in": countries_in_filter};
			}
			else {
				index = filter["country"]["$in"].indexOf(event.target.value);
				if(index > -1) {
					filter["country"]["$in"].splice(index, 1);
				}
			}
		}
		else {
			filter["country"] = { "$in": country_added } 
		}
		Session.set("filter", filter);
	},
	"click .tag": function(event) {
		filter = Session.get("filter");
		index = filter["country"]["$in"].indexOf(event.target.textContent);
		if(index > -1) {
			 filter["country"]["$in"].splice(index, 1);
		}
		Session.set("filter", filter);
	}
});