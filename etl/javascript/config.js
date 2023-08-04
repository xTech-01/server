
// const url_gigantti = 'https://www.gigantti.fi/kodin-pienkoneet/ilmastointi-ja-lammitys/ilmastointi/ilmastointilaitteet?as_templateId=9539&gclid=CjwKCAjw44mlBhAQEiwAqP3eVrqsu-i5fTTAwCMdQalur56eS9Y2L7lvcJIOkLYWbpm_CI8qIXffbRoClngQAvD_BwE'; // Replace this with the URL of the one-page application
const url_gigantti = 'https://www.gigantti.fi/kodin-pienkoneet/siivous-ja-vaatehuolto'
const url_tori = 'https://www.tori.fi/koko_suomi?q=ilmastointi&cg=3010&w=102&st=s&st=k&st=u&st=h&st=g&c=0&ps=&pe=&ca=18&l=0&md=th'
const url_prisma = 'https://www.prisma.fi/haku?search=imuri'


const selector_prisma = '#main-content > div.Layout_layout__mNelZ > div.search_searchResultContainer__DDxzr > div.ProductsList_productsListContainer__T3neT > div > ul > li:nth-child(1) > div > div.ProductCard_content__R9MKX > h2 > a'
const selector_gigantti = '#products > elk-component-loader-wrapper > elk-product-and-content-listing-view > div.product-listproducts.ng-star-inserted > elk-product-tile-ff-wc-wrapper:nth-child(1) > elk-product-tile > div > div.product-tileinformation.information > elk-price > span > span'




const proxy_list = ["https://8wkthpru0k.execute-api.us-east-1.amazonaws.com/prod/Proxy", "https://2oqccuezdk.execute-api.us-east-1.amazonaws.com/prod/Proxy", "https://p3pjducm9h.execute-api.us-east-1.amazonaws.com/prod/Proxy"]

const USER_AGENTS = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 13.0; rv:106.0) Gecko/20100101 Firefox/106.0',
        'Mozilla/5.0 (X11; Linux i686; rv:106.0) Gecko/20100101 Firefox/106.0',
        'Mozilla/5.0 (X11; Linux x86_64; rv:106.0) Gecko/20100101 Firefox/106.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
        'Mozilla/5.0 (iPad; CPU OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35',
        'Mozilla/5.0 (Linux; Android 10; HD1913) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.91 Mobile Safari/537.36 EdgA/107.0.1418.28',
        'Mozilla/5.0 (Windows Mobile 10; Android 10.0; Microsoft; Lumia 950XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36 Edge/40.15254.603'
]

const COOKIE="exp_pref=EUR; seen_uk=1"


module.exports = {
    url_gigantti,
    url_tori,
    url_prisma,
    selector_gigantti,
    selector_prisma,
    
    proxy_list,
    USER_AGENTS,
    COOKIE
}

