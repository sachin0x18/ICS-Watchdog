# -*- coding: utf-8 -*-
"""
Created on Tue Nov 21 15:07:50 2017

@author: Tanay Shah
"""

import time
from datetime import datetime
import pandas as pd
import numpy as np
import random

date =[]
data = []
label= []
valid_values = [25 , 30 , 35]
invalid_values = [10 , 15, 45, 60 , 20]
for i in range(0, 100000):
    #print i
    decider = random.uniform(0 , 1)
    if decider > 0.7:
        date.append(datetime.now())
        data.append(invalid_values[i%5])
        label.append('N')
    else:
        date.append(datetime.now())
        data.append(invalid_values[i%3])
        label.append('Y')
    time.sleep(0.001)
    
simulatedData = pd.DataFrame()
simulatedData['Timestamp'] = date
simulatedData['Data'] = data
