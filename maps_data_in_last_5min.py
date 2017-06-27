import requests
# get maps json data from https://pm25.lass-net.org/zh_tw/#api
d = requests.get('https://pm25.lass-net.org/data/last-all-maps.json').json()

for feed in d['feeds']:
    print(feed['device'], feed['device_id'], feed['SiteName'])
    print('時:分:秒 溫度 濕度 PM2.5')
    try:
        print(feed['time'], feed['s_t4'], feed['s_h4'], feed['s_d0'])
    except:
        print('DATA ERROR')
    print()

alive = []
for feed in d['feeds']:
    alive.append(feed['SiteName'])
print(sorted(alive))
print(len(d['feeds']),'MAPS alive')