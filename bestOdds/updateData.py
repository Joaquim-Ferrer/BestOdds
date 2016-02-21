import pymongo
import web_scrape_lottery as scrape

def server_connection():
	
	
	print(client.database_names())
	return client

def update_db():
	client = pymongo.MongoClient('localhost', 3001)
	db = client.meteor
	
	for d in db.lotteryDraws.find():
		print(d)

	out = scrape.getAllResults(scrape.games)

	for d in out:
		db.lotteryDraws.remove({"game": d})
		db.lotteryDraws.insert(out[d])

update_db()


