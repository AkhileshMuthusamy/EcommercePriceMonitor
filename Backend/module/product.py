from flask import jsonify
from flask_restful import Resource, reqparse
from bs4 import BeautifulSoup
import urllib
import urllib.request
import re
import datetime as dt
from app import db

parser = reqparse.RequestParser()


class Product(Resource):

    def post(self):
        parser.add_argument('uid', type=str)
        parser.add_argument('url', type=str)
        args = parser.parse_args()

        try:
            if args['uid'] and args['url']:

                try:
                    with urllib.request.urlopen(args['url']) as response:
                        html = response.read()
                except:
                    return jsonify({'message': 'Invalid URL', 'error': True, 'data': None})

                soup = BeautifulSoup(html, 'lxml')
                price_tag = soup.find_all(id="priceblock_ourprice")
                price_text = price_tag[0].get_text()
                price_str = re.sub('([^0-9.])+', '', price_text)
                price = float(price_str)

                title_tag = soup.find_all('title')
                title = title_tag[0].get_text()

                if len(price_tag) > 0:
                    doc_ref = db.collection('products')
                    doc_ref.document().set({
                        'dateAdded': dt.datetime.utcnow(),
                        'url': args['url'],
                        'uid': args['uid'],
                        'initialPrice': price,
                        'currentPrice': price,
                        'bestPrice': {
                          'price': price,
                          'date': dt.datetime.utcnow()
                        },
                        'tile': title,
                        'needNotification': True,
                        'hasNotifiedToday': False
                    })
                    return jsonify({'message': 'Product added successfully!', 'error': False, 'data': None})
                else:
                    return jsonify({'message': 'Unable to retrieve price', 'error': True, 'data': None})
            else:
                return jsonify({'message': 'Field missing', 'error': True, 'data': None})
        except:
            return jsonify({'message': 'Error while adding product', 'error': True, 'data': None})
