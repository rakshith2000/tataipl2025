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