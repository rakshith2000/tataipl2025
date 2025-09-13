from flask import Flask
from flask_apscheduler import APScheduler
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from werkzeug.security import generate_password_hash, check_password_hash
import os, requests, pytz, re

db = SQLAlchemy()
scheduler = APScheduler()

def bold_substring(value):
    # Bold everything from the start up to and including the first '!'
    return re.sub(r'^(.*?!)', r'<b>\1</b>', value, count=1)

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'secret-key'
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') #'sqlite:///IPL.sqlite'

    app.jinja_env.filters['bold_substring'] = bold_substring

    db.init_app(app)
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)
    scheduler.init_app(app)

    from .models import User
    #
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    with app.app_context():
        setup_scheduler(app)
        db.create_all()


    return app


def setup_scheduler(app):
    """Configure scheduled tasks after app is fully initialized"""
    from .scraper import update_points_table  # Local import to avoid circularity

    if scheduler.running:
        return

    ist = pytz.timezone('Asia/Kolkata')

    #@scheduler.task('interval', id='scrape', minutes=1)
    #def run_am_scrape():
    #    with app.app_context():
    #        app.logger.info("Starting 3 AM scrape")
    #        update_points_table()

    # Morning scrape (3 AM IST)
    #@scheduler.task('cron', id='scrape_am', hour=3, minute=0, timezone=ist)
    #def run_am_scrape():
    #    with app.app_context():
    #        app.logger.info("Starting 3 AM scrape")
    #        update_points_table()

    # Afternoon scrape (3 PM IST)
    #@scheduler.task('cron', id='scrape_pm', hour=15, minute=0, timezone=ist)
    #def run_pm_scrape():
    #    with app.app_context():
    #        app.logger.info("Starting 3 PM scrape")
    #        update_points_table()

    # Keepalive ping
    @scheduler.task('interval', id='ping', minutes=10,  misfire_grace_time=120)
    def ping():
        try:
            requests.get("https://tataipl2025.onrender.com/login", timeout=5)
        except Exception as e:
            app.logger.error(f"Ping failed: {e}")

    scheduler.start()