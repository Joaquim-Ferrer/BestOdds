from apscheduler.schedulers.background import BackgroundScheduler, BlockingScheduler
from updateData import update_db

sched = BackgroundScheduler()
def update():
	update_db()

sched.add_job(update, 'interval', hours=2)
sched.start()
