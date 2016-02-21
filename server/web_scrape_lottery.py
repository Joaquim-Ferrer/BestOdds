from lxml import html
import requests
import re
import copy
import calendar

root_url = "http://www.lotto.net/"
games = {
			"EuroMillions": {	
				"game": "EuroMillions",
				"url": ["http://www.lotto.net/euromillions/results", 
						"http://www.freelotto.com/lottery_results/UK_United_Kingdom_Lottery_Results.html"],
				"order": 0,
				"n_normal_balls": 5, 
				"n_special_balls": 2,
				"country": ['Portugal', 'UK', 'France', 'Belgium'] 
			},
			"Powerball": {	
				"game": "Powerball",
			    "url": ["http://www.lotto.net/powerball/numbers", 
			    		"http://www.freelotto.com/lottery_results/MI_Michigan_Lottery_Results.html"],
			    "order": 0,
			    "n_normal_balls": 5,
			    "n_special_balls": 2,
			    "country": ['USA']
			},
			"German Lotto": {	
				"game": "German Lotto",
			    "url": ["http://www.lotto.net/german-lotto/results", 
			    		"http://www.magayo.com/lotto/germany/german-lotto-6-aus-49-results/"],
			    "order": -1,
			    "n_normal_balls": 6,
			    "n_special_balls": 1,
			    "country": ['Germany']
			},
			"UK Lotto": {	
				"game": "UK Lotto",
			    "url": ["http://www.lotto.net/uk-lotto/results", 
			    		"http://www.freelotto.com/lottery_results/UK_United_Kingdom_Lottery_Results.html",
			    		"http://www.magayo.com/lotto/uk/lotto-results/"],
			    "order": 2,
			    "n_normal_balls": 6,
			    "n_special_balls": 1,
			    "country": ['UK']
			},
			"Australia Powerball": {	
				"game": "Australia Powerball",
			    "url": ["http://www.lotto.net/australia-powerball/results", 
			    		"http://pt.freelotto.com/lottery_results/au_Australia_Lottery_Results.html"],
			    "order": 3,
			    "n_normal_balls": 6,
			    "n_special_balls": 1,
			    "country": ['Australia']
			},
			"Mega Sena": {	
				"game": "Mega Sena",
			    "url": ["http://www.lotto.net/mega-sena/results", 
			    		"http://pt.freelotto.com/lottery_results/br_Brazil_Lottery_Results.html"],
			    "order": 3,
			    "n_normal_balls": 6,
			    "n_special_balls": 0,
			    "country": ['Brazil']
			}
		}
		
def parse_date(date):
	day, s_month, year = date.split()

	months = calendar.month_name[1:]
	month = str([k for k, v in enumerate(months) if v == s_month][0])

	if len(month) == 1: month = '0' + month
	if len(day) == 1: day = '0' + day

	return year + month + day + '11' + '00' + '00'

def getGameResult(game):
	page = requests.get(game["url"][0])
	tree = html.fromstring(page.content)

	page = requests.get(game["url"][1])
	next_tree = html.fromstring(page.content)

	n_special_balls = game["n_special_balls"]
	n_normal_balls = game["n_normal_balls"]
	total_balls = n_special_balls + n_normal_balls

	all_balls = tree.xpath("//li[contains(@class,'ball')]//span/text()")
	weekday = tree.xpath('//div[@class="date"]/text()')[0]
	date = tree.xpath('//div[@class="date"]//span/text()')[0]
	prize = tree.xpath('//div[@class="elem1"]//span/text()')[0]

	order = game["order"]
	if order != -1:
		try:
			next_date = next_tree.xpath("//span[@class='drawdate']//b/text()")[order]
			try:
				next_prize = next_tree.xpath("//span[@class='jackpot']//b/text()")[order]
			except:
				next_prize = ""
		except:
			page = requests.get(game["url"][2])
			backup_tree = html.fromstring(page.content)

			next_prize = backup_tree.xpath("//p[@id='jackpot']//strong/text()")[0]
	else:
		next_date = ""
		next_prize = ""

	sort_date = parse_date(date)

	try:
		rollover = tree.xpath('//div[@class="jackpot" and position()<2]/div[@class="rollover"]//span/text()')[0]
		next_rollover = int(re.sub('x', '', rollover))
	except:
		try:
			rollover = tree.xpath('//div[@class="jackpot" and position()<2]/div[@class="rollover"]/text()')[0]
			
			if rollover == "Jackpot Won!":
				next_rollover = 0
			else:
				next_rollover = 1
		except:
			next_rollover = -1

	winner = (True if next_rollover > 0 else False)

	special_balls = all_balls[n_normal_balls:total_balls]
	normal_balls = all_balls[:n_normal_balls]



	return {
			"normal_balls": normal_balls, 
			"special_balls": special_balls, 
			"weekday": weekday,
			"display_date": date, 
			"date": sort_date,
			"prize": prize,
			"winner": winner,
			"next_rollover": next_rollover,
			"next_date": next_date,
			"next_prize": next_prize
		   }

def getAllResults(games):
	out = copy.deepcopy(games)

	for game in games:
		res = getGameResult(games[game])
		out[game].update(res)

	return out

