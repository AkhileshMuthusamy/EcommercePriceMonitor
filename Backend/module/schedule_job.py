import datetime as dt
from app import db
from module import utils


def product_price_notification():
    print(dt.datetime.now())
    products = fetch_products()
    for product in products:
        scraped_product = utils.scrap_product(product['url'])

        if not scraped_product:
            update_product(product['pid'], {'fetchError': True})
            continue

        if scraped_product[0] and product['currentPrice'] != scraped_product[0]:
            updated_product = {'currentPrice': scraped_product[0], 'fetchError': False}
            if product['bestPrice']['price'] > scraped_product[0]:
                updated_product['bestPrice'] = {'price': scraped_product[0], 'date': dt.datetime.utcnow()}
            has_product_updated = update_product(product['pid'], updated_product)

            if not has_product_updated:
                continue

            if has_price_reached_threshold(product, updated_product):
                email = get_user_email(product['uid'])
                if email:
                    utils.send_email_notification(email, product['title'], updated_product['currentPrice'])


def fetch_products():
    try:
        doc_ref = db.collection('products').where('needNotification', '==', True) \
            .where('hasNotifiedToday', '==', False)
        docs = doc_ref.stream()
        data = []
        for doc in docs:
            data.append(utils.product_response(doc))
        return data
    except:
        return []


def update_product(pid, data):
    try:
        doc_ref = db.collection('products')
        doc_ref.document(pid).update(data)
        return True
    except:
        return False


def has_price_reached_threshold(product, updated_product):
    price_variance = ((updated_product['currentPrice'] / product['initialPrice']) - 1) * 100
    return price_variance <= (product['notifyOnPercent'] * -1)


def get_user_email(uid):
    try:
        doc_ref = db.collection('users').document(uid)
        doc = doc_ref.get()
        user_data = doc.to_dict()
        return user_data['email']
    except:
        return None
