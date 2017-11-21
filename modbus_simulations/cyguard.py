#!/usr/bin/python

'''
Author: Sachin Parekh
Email ID: sachin.parekh1811@gmail.com

IDS code that sniffs Modbus data packets and performs deep packet inspection for identifying any anamoly

'''
from scapy.all import *
from scapy.utils import PcapWriter
import struct
import binascii
import time
from multiprocessing import Process
import thread
import sys
import os
from socketIO_client import SocketIO, LoggingNamespace
#conf.iface = "Npcap Loopback Adapter"
t1=0
t2=0
cmd="."
data="."
ip_src ="."
ip_dst ="."
unitID="."
danger_ip="."
danger_data ="0"
a=0


def pkt_callback(pkt):
        #a=list(str(pkt))
	#prn=lambda x: x.sprintf("%IP.src%:%TCP.sport% -> %IP.dst%:%TCP.dport%::%TCP.payload%")
        #pkt.show()
        global a
        global cmd,data,t1,t2,unitID ,ip_src , ip_dst, danger_ip , danger_data
        if(IP in pkt):
                ip_src=pkt[IP].src
                ip_dst=pkt[IP].dst
                tcp_sport=pkt[TCP].sport
                tcp_dport=pkt[TCP].dport
		danger_ip = "."
		danger_data = "0"
        #print(str(ip_src)+":"+str(tcp_sport)+" --> "+str(ip_dst)+":"+str(tcp_dport))
        payload=list(str(pkt))
        if(payload[-5]=='\x03'and payload[-4]=='\x00' and payload[-3]=='\x04'and payload[-2]=='\x00' and payload[-1]=='\x02'):
                cmd="Read"
                unitID=str(ord(payload[-6]))
                data="."
                print(cmd+" :"+data)
		print("ipsrc "+ip_src+" ipdst "+ip_dst+" cmd "+cmd+" danger_ip "+danger_ip+" danger_data "+danger_data)
        elif(payload[-5]=='\x06'and payload[-4]=='\x00' and payload[-3]=='\x04'):
                cmd="Write"
                t1=ord(payload[-1])
                t2=ord(payload[-2])
                data=str((t2*256)+(t1))
                unitID=str(ord(payload[-6]))
		if((ip_src!='192.168.0.21' and ip_src!='192.168.0.20') or (ip_dst!='192.168.0.21' and ip_dst!='192.168.0.20')):
                	danger_ip =ip_src
			danger_data = "1"
        	else:
			danger_ip="."	        
			if(int(data)<500 or int(data) >10000):
	            		danger_data ="1" 
	        	else:
		    		danger_data ="0" 
                print(cmd+" :"+data)
		print("ipsrc "+ip_src+" ipdst "+ip_dst+" cmd "+cmd+" danger_ip "+danger_ip+" danger_data "+danger_data)
        elif(payload[-6]=='\x03' and payload[-5]=='\x04' and payload[-7]=='\x07'):
                cmd="Response"
                unitID=str(ord(payload[-7]))
                t1=ord(payload[-3])
                t2=ord(payload[-4])
                data=str((t2*256)+(t1))
                print(cmd+" :"+data)
		print("ipsrc "+ip_src+" ipdst "+ip_dst+" cmd "+cmd+" danger_ip "+danger_ip+" danger_data "+danger_data)
        if((ip_src!='192.168.0.21' and ip_src!='192.168.0.20') or (ip_dst!='192.168.0.21' and ip_dst!='192.168.0.20')):
                danger_ip =ip_src
		danger_data = "1"
        else:
		danger_ip="."
		danger_data = "0"

	with SocketIO('localhost', 3000, LoggingNamespace) as socketIO:
		socketIO.emit('scc', {"ipsrc": ip_src  , "ipdst": ip_dst , "cmd": cmd , "data" : data , "unitID" : unitID , "dangerip" :danger_ip , "dangerdata" :danger_data})
		#socketIO.wait(seconds=1)



def sniffkar():
        sniff(prn=pkt_callback,store=2,filter="tcp and port 502")


if __name__=='__main__':
        sniffkar()