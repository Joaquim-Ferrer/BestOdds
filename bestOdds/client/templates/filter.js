Template.filter.helpers({
	options: function(){
		return ["World","Portugal", "USA"];
	},
	selection: function() {
		filter = Session.get("filter");
		console.log(filter["country"]["$in"]);
		console.log(Session.get("filter"));
		return filter["country"]["$in"];
	}
})

/*
Template.filter.events({
	"change .add_filter": function(event) {
		var country_added = event.target.value;
		filter = {};
		if(country_added === "World") {
			filter["country"] = {"$in": ["World","Portugal", "USA"]};
			Session.set("filter", filter);
		}
		else {
			filter["country"] = {"$in": [country_added]};
			Session.set("filter", filter);
		}
	},
	"click ul li": function(event) {
		filter = Session.get("filter");
		index = filter["country"].indexOf(event.target.value);
		if(index > -1) {
			filter["country"].splice(index, 1);
		}
	}
});*/

Template.filter.events({
	"change .add_filter": function(event) {
		var country_added = event.target.value;
		filter = Session.get("filter");
		
		if(country_added === "World") {
				filter["country"] = {"$in": ["World","Portugal", "USA"]};
				Session.set("filter", filter);
				return;
		}
		if(filter["country"]) {
			countries_in_filter = filter["country"]["$in"]
			if(countries_in_filter.indexOf(country_added)<0) {
				countries_in_filter.push(country_added);
				filter["country"] = {"$in": countries_in_filter};
				Session.set("filter", filter);
			}
			return;
		}
		else {
			filter["country"] = { "$in": country_added } 
			Session.set("filter", filter);
		}
	},
	"click .tag": function(event) {
		console.log(event)
		filter = Session.get("filter");
		index = filter["country"]["$in"].indexOf(event.target.textContent);
		console.log(index);
		if(index > -1) {
			 filter["country"]["$in"].splice(index, 1);
		}
		Session.set("filter", filter);
	}
});