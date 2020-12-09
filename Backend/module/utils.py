from bs4 import BeautifulSoup
import urllib
import urllib.request
import re


def scrap_product(url):

    price_tag = None
    website = None

    if len(url) < 5:
        return None

    if url.find('www.amazon') > 0:
        website = 'AMAZON'
    elif url.find('www.flipkart') > 0:
        website = 'FLIPKART'
    else:
        return None

    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
        })
        with urllib.request.urlopen(req) as response:
            html = response.read()
    except:
        return None

    if not html:
        return None

    soup = BeautifulSoup(html, 'lxml')
    title = ''
    if website == 'AMAZON':
        price_tag = soup.find_all(id="priceblock_ourprice")
        if price_tag.__len__() == 0:
            price_tag = soup.find_all(id="displayedPrice")
        title_tag = soup.find_all(id='productTitle')
        title = title_tag[0].get_text()
    elif website == 'FLIPKART':
        price_tag = soup.find_all("div", {"class": "_30jeq3 _16Jk6d"})
        title_tag = soup.find_all("span", {"class": "B_NuCI"})
        title = title_tag[0].get_text()

    price_text = price_tag[0].get_text()
    currency = re.sub('([^₹$])+', '', price_text)
    price_str = re.sub('([^0-9.])+', '', price_text)
    price = float(price_str)

    return price, title, currency
