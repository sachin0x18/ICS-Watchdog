# -*- coding: utf-8 -*-
"""
Created on Tue Nov 21 10:38:12 2017

@author: Tanay Shah
"""

import statsmodels.api as sm
import pandas as pd
import threading , Queue
import datetime
import math
from statsmodels.robust.scale import mad
import joblib

def detect_anomaly(master_data):
    window_sizes = [60 , 300 , 1200,  10800 ]
    prediction_input =[]
    for i in range(0 , len(window_sizes)):
        data_window = list(master_data.queue)[master_data.qsize()-window_sizes[i]:master_data.qsize()]
        date_window =[]        
        for j in range(0 , len(data_window)):
            date_window.append(pd.Timestamp(datetime.now()))
        sequenceDf = pd.DataFrame()
        sequenceDf['Date']= date_window
        sequenceDf['data']= data_window
        sequenceDf.interpolate(inplace=True)
        res = sm.tsa.seasonal_decompose(sequenceDf)
        trend = res.trend
        residue = res.resid
        seasonal = res.seasonal
        median_abs_dev= mad(residue)
        prediction_input.append(median_abs_dev)
    model = joblib.load('anomaly_model.model')
    anomaly_flag = model.predict(prediction_input)
    print anomaly_flag
        
def get_realtime_data(current_data , master_data):
    now = datetime.datetime.now()
    current_data = 10*math.sin(2*3.14*now.second/60)
    while master_data.qsize() >= 10801:
        master_data.get()
    master_data.put(curr_data)
    
master_data = Queue.Queue()
current_data=1

thread1 = threading.Thread( detect_anomaly, (master_data, ) )
thread2 = threading.Thread( get_realtime_data , (current_data, master_data,))

thread1.start()
thread2.start()