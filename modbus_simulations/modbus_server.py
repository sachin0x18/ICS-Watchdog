#!/usr/bin/python

'''
A test code simulating legitimate Modbus server

'''

from socketIO_client import SocketIO, LoggingNamespace
import sys

cmd="Read"
data=str(sys.argv[1])
ip_src ="192.168.0.21"
ip_dst ="192.168.0.20"
unitID = str(sys.argv[2])
danger_ip="."
danger_data ="0"


while 1:
	try:
		print("ipsrc "+ip_src+" ipdst "+ip_dst+" cmd "+cmd+" danger_ip "+danger_ip+ " danger_data "+danger_data)
		with SocketIO('localhost', 3000, LoggingNamespace) as socketIO:
			socketIO.emit('scc', {"ipsrc": ip_src  , "ipdst": ip_dst , "cmd": cmd , "data" : data , "unitID" : unitID , "dangerip" :danger_ip , "dangerdata" :danger_data})
			socketIO.wait(seconds=0.2)
	except KeyboardInterrupt:
		sys.exit()

