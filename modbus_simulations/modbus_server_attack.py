#!/usr/bin/python

'''

A test code simulating a Modbus attack

'''

from socketIO_client import SocketIO, LoggingNamespace


cmd="Write"
data="30"
ip_src ="192.168.0.45"
ip_dst ="192.168.0.20"
unitID="7"
danger_ip=ip_src
danger_data ="1"

for i in range(0,10):
	print("ipsrc "+ip_src+" ipdst "+ip_dst+" cmd "+cmd+" danger_ip "+danger_ip+ " danger_data "+danger_data)
	with SocketIO('localhost', 3000, LoggingNamespace) as socketIO:
		socketIO.emit('scc', {"ipsrc": ip_src  , "ipdst": ip_dst , "cmd": cmd , "data" : data , "unitID" : unitID , "dangerip" :danger_ip , "dangerdata" :danger_data})
		socketIO.wait(seconds=0.2)
