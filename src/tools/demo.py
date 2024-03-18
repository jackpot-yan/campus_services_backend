import json
import requests



def spider(page:int):
    headers = {'Content-Type': 'application/json;charset=utf-8'}
    for i in range(1, page):
        url = 'https://dtkapi.ffquan.cn/go_getway/proxy/search-v2?platform=1&page={}&px=zh&undefined=&version=2&api_v=1&flow_identifier=normal&app_token=false'.format(i)
        res = requests.get(url, headers=headers)
        content = res.json()
        data = content['data']
        commond = data['search']['list']
        json_data = {'data': []}
        index = 0
        for comm in commond:
            index = index + 1
            describe = comm['desc']
            png = comm['main_pic']
            price = comm['original_price']
            title = comm['sub_title']
            sales = comm['sales']
            add_time = comm['add_time']
            d = {'describe': describe, 'png': png, 'price': price, 'title': title, 'sales': sales, 'add_time': add_time, 'comm': index}
            json_data['data'].append(d)
    with open('data.json', 'w', encoding='utf-8') as f:
        f.write(json.dumps(json_data, ensure_ascii=False))


if __name__ == '__main__':
    spider(30)
