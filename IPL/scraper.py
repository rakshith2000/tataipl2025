from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

teams = {
    'Chennai Super Kings':'CSK',
    'Delhi Capitals':'DC',
    'Gujarat Titans':'GT',
    'Kolkata Knight Riders':'KKR',
    'Lucknow Super Giants':'LSG',
    'Mumbai Indians':'MI',
    'Punjab Kings':'PBKS',
    'Rajasthan Royals':'RR',
    'Royal Challengers Bengaluru':'RCB',
    'Sunrisers Hyderabad':'SRH'
}
def update_points_table():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = None
    try:
        driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()),
            options=options
        )

        driver.get("https://www.ipltop4.com/")
        time.sleep(3)

        soup = BeautifulSoup(driver.page_source, 'html.parser')
        table = soup.find('table', class_='w-full min-w-full table-sticky-columns table-hover')

        # Import models HERE when needed
        from . import db
        from .models import Pointstable

        for row in table.find_all('tr')[1:]:
            cells = row.find_all('td')
            team_name = cells[1].text.strip()
            qual_pct = cells[8].text.strip()

            team = teams.get(team_name, team_name)

            team = Pointstable.query.filter_by(team_name=team).first()
            if team:
                team.qual = qual_pct
                db.session.commit()

    except Exception as e:
        db.session.rollback()
        raise e  # Let Flask-APScheduler handle retries

    finally:
        if driver:
            driver.quit()
        db.session.remove()  # Clean up DB connection