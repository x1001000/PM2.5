import requests
d = requests.get('https://pm25.lass-net.org/data/history.php?device_id=9E65F90C53A6').json()
t = sorted(d['feeds'][0]['MAPS'].items())[-1]
print('時:分:秒 溫度 濕度 PM2.5')
print(t[1]['time'], t[1]['s_t4'], t[1]['s_h4'], t[1]['s_d0'])
