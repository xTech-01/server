import requests
from bs4 import BeautifulSoup

def extract():

    url = 'https://www.tori.fi/koko_suomi?q=ilmastointi&cg=3010&w=102&st=s&st=k&st=u&st=h&st=g&c=0&ps=&pe=&ca=18&l=0&md=th'

    print('making request to: ' + url)
    response = requests.get(url)

    print('response received, status code: ' + str(response.status_code))
    print('parsing...')
    # Create a BeautifulSoup object to parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')


    data = soup.find_all('p', class_='list_price ineuros')
    print(data)

    return data
