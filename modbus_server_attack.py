from dweet import Dweet
from socketIO_client import SocketIO, LoggingNamespace

import time
cmd="Write"
data="3000"
ip_src ="192.168.0.45"
ip_dst ="192.168.0.20"
ip_src_prev ="."
ip_dst_prev ="."
cmd_prev="."
data_prev="."
unitID="7"
unitID_prev="."
danger_ip=ip_src
danger_data ="1"
count = 0


'''
while 1:
	dweet = Dweet()
	dweet.dweet_by_name(name="netdata", data={"ipsrc": ip_src  , "ipdst": ip_dst , "cmd": cmd , "data" : data , "unitID" : unitID , "dangerip" :danger_ip , "dangerdata" :danger_data})
	time.sleep(1)
	count+=1
	if(count >10 and count<15):
		dweet.dweet_by_name(name="netdata", data={"ipsrc": "192.168.0.66"  , "ipdst": ip_dst , "cmd": "Write" , "data" : "5000" , "unitID" : unitID , "dangerip" :"192.168.0.66" , "dangerdata" : "1"})	
'''

for i in range(0,10):
	print("ipsrc "+ip_src+" ipdst "+ip_dst+" cmd "+cmd+" danger_ip "+danger_ip+ " danger_data "+danger_data)
	with SocketIO('localhost', 3000, LoggingNamespace) as socketIO:
		socketIO.emit('scc', {"ipsrc": ip_src  , "ipdst": ip_dst , "cmd": cmd , "data" : data , "unitID" : unitID , "dangerip" :danger_ip , "dangerdata" :danger_data})
		socketIO.wait(seconds=0.2)