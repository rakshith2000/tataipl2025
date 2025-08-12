from . import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(100))

class Pointstable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    logo_path = db.Column(db.String)
    team_name = db.Column(db.String)
    P = db.Column(db.Integer)
    W = db.Column(db.Integer)
    L = db.Column(db.Integer)
    NR = db.Column(db.Integer)
    Points = db.Column(db.Integer)
    NRR = db.Column(db.Float)
    For = db.Column(db.JSON)
    Against = db.Column(db.JSON)
    Win_List = db.Column(db.String)
    qed = db.Column(db.String)
    qual = db.Column(db.String)
    top2 = db.Column(db.String)

class Fixture(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Match_No = db.Column(db.String)
    Date = db.Column(db.Date)
    Time = db.Column(db.Time)
    Team_A = db.Column(db.String)
    Team_B = db.Column(db.String)
    Venue = db.Column(db.String)
    Result = db.Column(db.String)
    A_info = db.Column(db.JSON)
    B_info = db.Column(db.JSON)
    Win_T = db.Column(db.String)

class Squad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Player_ID = db.Column(db.Integer)
    Name = db.Column(db.String)
    Team = db.Column(db.String)
    Captain = db.Column(db.String)
    Keeper = db.Column(db.String)
    Overseas = db.Column(db.String)
    Role = db.Column(db.String)
    Batting = db.Column(db.String)
    Bowling = db.Column(db.String)
    Nationality = db.Column(db.String)
    DOB = db.Column(db.Date)
    Full_Name = db.Column(db.String)

class CurrentTeams(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team = db.Column(db.String)
    city = db.Column(db.String)
    home_ground = db.Column(db.String)
    debut = db.Column(db.Integer)
    captain = db.Column(db.String)
    head_coach = db.Column(db.String)
    owner = db.Column(db.JSON)

class DefunctTeams(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    home_ground = db.Column(db.String)
    debut = db.Column(db.Integer)
    dissolved = db.Column(db.Integer)
    owner = db.Column(db.String)

class TournamentSummary(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team = db.Column(db.String)
    won = db.Column(db.JSON)
    runner_up = db.Column(db.JSON)
    playoffs = db.Column(db.Integer)
    played = db.Column(db.Integer)

class EditionsAndResults(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer)
    winner = db.Column(db.JSON)
    result = db.Column(db.String)
    runner_up = db.Column(db.JSON)
    venue = db.Column(db.String)
    potm = db.Column(db.JSON)
    pots = db.Column(db.JSON)

class PerformanceByTeams(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team = db.Column(db.String)
    season_stats = db.Column(db.JSON)
    defunct = db.Column(db.Boolean, default=False)

class PositionEachSeason(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer)
    stats = db.Column(db.JSON)

class AllTimeStandings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team = db.Column(db.String)
    total = db.Column(db.Integer)
    first = db.Column(db.Integer)
    latest = db.Column(db.Integer)
    best_result = db.Column(db.JSON)
    played = db.Column(db.Integer)
    won = db.Column(db.Integer)
    lost = db.Column(db.Integer)
    tiedW = db.Column(db.Integer)
    tiedL = db.Column(db.Integer)
    NR = db.Column(db.Integer)
    winP = db.Column(db.Float)
    defunct = db.Column(db.Boolean, default=False)

class MostAppearances(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player = db.Column(db.String)
    team = db.Column(db.JSON)
    years = db.Column(db.String)
    apps = db.Column(db.Integer)
    runs = db.Column(db.Integer)
    wkts = db.Column(db.Integer)