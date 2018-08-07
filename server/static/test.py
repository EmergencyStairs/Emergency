import os
import sys
import netifaces

def mac():
	a = []
	for i in netifaces.interfaces():
		addrs  = netifaces.ifaddresses(i)
		try:
			mac = addrs[netifaces.AF_LINK][0]['addr']
		except IndexError:
			mac = []
		if mac:
			a.append(mac)
	return a
    
def main():
    macAddr = mac()
    print(macAddr)

if __name__ == '__main__':
    main()
