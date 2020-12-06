from flask import jsonify
from flask_restful import Resource, reqparse
import datetime as dt
from app import db
import module.utils as utils

parser = reqparse.RequestParser()


class Product(Resource):

    def post(self):
        parser.add_argument('uid', type=str)
        parser.add_argument('url', type=str)
        args = parser.parse_args()

        try:
            if args['uid'] and args['url']:

                product = utils.scrap_product(args['url'])
                print(product)
                if product:
                    doc_ref = db.collection('products')
                    doc_ref.document().set({
                        'dateAdded': dt.datetime.utcnow(),
                        'url': args['url'],
                        'uid': args['uid'],
                        'initialPrice': product[0],
                        'currentPrice': product[0],
                        'bestPrice': {
                          'price': product[0],
                          'date': dt.datetime.utcnow()
                        },
                        'title': product[1],
                        'needNotification': True,
                        'hasNotifiedToday': False
                    })
                    return jsonify({'message': 'Product added successfully!', 'error': False, 'data': None})
                else:
                    return jsonify({'message': 'Unable to retrieve product info', 'error': True, 'data': None})
            else:
                return jsonify({'message': 'Field missing', 'error': True, 'data': None})
        except:
            return jsonify({'message': 'Error while adding product', 'error': True, 'data': None})
