from datetime import datetime, date, timedelta
from . import db
from .models import User, Pointstable, Fixture, Squad
from .main import get_battingstats, get_bowlingstats, get_alltimeipl, get_allPT_records
import os, csv, re, pytz, requests, time
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Blueprint, jsonify, render_template, url_for, redirect, request, flash, Response, json, stream_with_context
from flask_login import login_required, current_user
from sqlalchemy import and_, or_
from sqlalchemy.sql import text
import requests
from bs4 import BeautifulSoup
from fuzzywuzzy import fuzz, process
from urllib.request import Request, urlopen

api = Blueprint('api', __name__)

@api.route('/api/battingstats')
def api_battingstats():
    """Return JSON for the batting stats (used by API)."""
    return jsonify(get_battingstats())

@api.route('/api/bowlingstats')
def api_bowlingstats():
    """Return JSON for the bowling stats (used by API)."""
    return jsonify(get_bowlingstats())

@api.route('/api/alltimeipl')
def api_alltime_page():
    """Return JSON for the All Time IPL data (same context as the HTML page)."""
    return jsonify(get_alltimeipl())

@api.route('/api/<page>')
def api_page(page):
    db_html = {'iplawards':['ipl_awards','ipl-awards.html'],
               'alltimept':['all_time_points_table','all-time-PT.html'],
               'resultrecords':['result_records','result-records.html'],
               'teamscoringrecords':['teams_scoring_records','team-scoring-records.html'],
               'individualbattingrecords':['individual_batting_records','individual-batting-records.html'],
               'individualbowlingrecords':['individual_bowling_records','individual-bowling-records.html'],
               'individualwicketkeepingrecords':['individual_wicket_keeping_records','individual-wicketkeeping-records.html'],
               'individualfieldingrecords':['individual_fielding_records','individual-fielding-records.html'],
               'individualrecords':['individual_records','individual-records.html'],
               'partnershiprecords':['partnership_records','partnership-records.html']}
    return jsonify(get_allPT_records(db_html[page][0]))