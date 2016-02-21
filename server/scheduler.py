from apscheduler.schedulers.background import BackgroundScheduler, BlockingScheduler
from updateData import update_db

sched = BackgroundScheduler()
def print_ln():
	update_db()

sched.add_job(print_ln, 'interval', seconds=3)
sched.start()
