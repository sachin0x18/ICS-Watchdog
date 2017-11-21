# -*- coding: utf-8 -*-
"""
Created on Tue Nov 21 11:49:35 2017

@author: Tanay Shah
"""

from sklearn.linear_model import LogisticRegression
import pandas as pd
import statsmodels.api as sm

legacy_data = pd.read_excel('legacy_data.xlsx')
lr = LogisticRegression()

prediction_input =[]
window_sizes = [60 , 300 , 1200,  10800 ]
for k in range(0 , len(legacy_data)):
    for i in range(0 , len(window_sizes)):
        data_window = legacy_data['Data'][len(legacy_data)-window_sizes[i]:len(legacy_data)]
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
        
lr.fit(legacy_data['Data'] , legacy_data['Normal'])
joblib.dump(lr,'anomaly.model',compress=3)

