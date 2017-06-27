import requests
# get airbox json data from https://pm25.lass-net.org/zh_tw/#api
d = requests.get('https://pm25.lass-net.org/data/last-all-airbox.json').json()
for feed in d['feeds']:
    print(feed['device'], feed['device_id'], feed['SiteName'])
    print('時:分:秒 溫度 濕度 PM2.5')
    print(feed['time'], feed['s_t0'], feed['s_h0'], feed['s_d0'])
    print()
