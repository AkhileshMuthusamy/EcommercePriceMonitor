from flask import jsonify
from flask_restful import Resource, reqparse
import datetime as dt
from app import db
from module import utils
import ast

parser = reqparse.RequestParser()


class Product(Resource):

    def post(self):
        parser.add_argument('uid', type=str)
        parser.add_argument('url', type=str)
        args = parser.parse_args()

        try:
            if args['uid'] and args['url']:

                product = utils.scrap_product(args['url'])
                # print(product)
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
                        'hasNotifiedToday': False,
                        'notifyOnPercent': 10
                    })
                    return jsonify({'message': 'Product added successfully!', 'error': False, 'data': None})
                else:
                    return jsonify({'message': 'Unable to retrieve product info', 'error': True, 'data': None})
            else:
                return jsonify({'message': 'Field missing', 'error': True, 'data': None})
        except Exception as e:
            return jsonify({'message': 'Error while adding product: ' + str(e), 'error': True, 'data': None})

    def get(self):
        parser.add_argument('uid', type=str)
        args = parser.parse_args()

        try:
            if args['uid']:
                doc_ref = db.collection('products').where('uid', '==', args['uid'])
                docs = doc_ref.stream()
                data = []
                for doc in docs:
                    data.append(doc.to_dict())
                return jsonify({'message': 'Product fetched successfully!', 'error': False, 'data': data})
            else:
                return jsonify({'message': 'Unable to retrieve product info', 'error': True, 'data': None})
        except Exception as e:
            return jsonify({'message': 'Error while fetching product', 'error': True, 'data': str(e)})

    def delete(self):
        parser.add_argument('uid', type=str)
        args = parser.parse_args()
        try:
            if args['uid']:

                # if product:
                doc_ref = db.collection('products')
                docs = doc_ref.stream()
                response = {}
                count = 0
                for doc in docs:
                    data = doc.to_dict()
                    if data['uid'] == args['uid']:
                        doc.reference.delete()
                return jsonify({'message': 'Product Deleted successfully!', 'response': response,
                                'error': False, 'data': None})
            else:
                return jsonify({'message': 'Unable to delete product', 'error': True, 'data': None})
        except:
            return jsonify({'message': 'Error while Deleting product', 'error': True, 'data': None})

    def put(self):
        parser.add_argument('pid', type=str)
        parser.add_argument('data', type=str)
        args = parser.parse_args()

        try:
            doc_ref = db.collection('products')
            doc_ref.document(args['pid']).update(ast.literal_eval(args['data']))
            return jsonify({'message': 'Product updated successfully!', 'error': False, 'data': None})
        except Exception as e:
            return jsonify({'message': 'Error while update product', 'error': True, 'data': str(e)})

