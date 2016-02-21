import pymongo
import web_scrape_lottery as scrape
import re

def server_connection():
	client = pymongo.MongoClient('localhost', 3001)
	return client
	

def update_db():
	
	client = server_connection()
	db = client.meteor

	out = scrape.getAllResults(scrape.games)

	for d in out:
		prize = out[d]["prize"]

		if (re.search("TBC", prize, flags=re.IGNORECASE) != None):
			
			out[d]["prize"] = "€3,000,000"
		db.lotteryDraws.remove({"game": d})
		db.lotteryDraws.insert(out[d])
update_db()


