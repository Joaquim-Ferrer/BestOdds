Template.filter.helpers({
	options: function(){
		return ["All", "Australia", "Brazil", "Germany", "Portugal", "UK", "USA"];
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
		if(country_added === "All" && event.target.checked) {
			countries_added = []
			for(i=0; i < event.currentTarget.length; i++) {
				event.currentTarget[i]["checked"] = true;
				countries_added.push(event.currentTarget[i].value);
			}
			filter["country"] = {"$in": countries_added};
			Session.set("filter", filter);
			return
		}
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
					event.currentTarget["0"]["checked"] = false;
				}
			}
		}
		else {
			filter["country"] = { "$in": country_added } 
		}
		Session.set("filter", filter);
	}
});