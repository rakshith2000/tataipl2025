import requests
from bs4 import BeautifulSoup

# IPL team mapping
teams = {
    'Chennai Super Kings': 'CSK',
    'Delhi Capitals': 'DC',
    'Gujarat Titans': 'GT',
    'Kolkata Knight Riders': 'KKR',
    'Lucknow Super Giants': 'LSG',
    'Mumbai Indians': 'MI',
    'Punjab Kings': 'PBKS',
    'Rajasthan Royals': 'RR',
    'Royal Challengers Bengaluru': 'RCB',
    'Sunrisers Hyderabad': 'SRH'
}

def update_points_table():
    API_KEY = '99efbe729d195fd8ed448bc227e4228a'  # Replace with your real key
    url = 'https://www.ipltop4.com/'

    params = {
        'api_key': API_KEY,
        'url': url,
        'render': 'true'
    }

    try:
        response = requests.get('http://api.scraperapi.com', params=params)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        table = soup.find('table', class_='w-full min-w-full table-sticky-columns table-hover')

        from . import db
        from .models import Pointstable

        for row in table.find_all('tr')[1:]:
            cells = row.find_all('td')
            team_name = cells[1].text.strip()
            qual_pct = cells[8].text.strip()

            team = teams.get(team_name, team_name)

            team_obj = Pointstable.query.filter_by(team_name=team).first()
            if team_obj:
                team_obj.qual = qual_pct
                db.session.commit()

    except Exception as e:
        db.session.rollback()
        raise e

    finally:
        db.session.remove()
