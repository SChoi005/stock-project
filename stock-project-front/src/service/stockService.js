import axios from 'axios';

class StockService {
    async postStock(item, quantity, averagePrice, id) {
        const token = JSON.parse(localStorage.getItem('user')).token;
        await axios({
            method: 'post',
            url: '/api/stock',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            data: {
                id: 0,
                symbol: item['item']['1. symbol'],
                name: item['item']['2. name'],
                type: item['item']['3. type'],
                quantity: quantity,
                averageprice: averagePrice,
                region: item['item']['4. region'],
                marketopen: item['item']['5. marketOpen'],
                marketclose: item['item']['6. marketClose'],
                timezone: item['item']['7. timezone'],
                currency: item['item']['8. currency'],
                portfolioid: id,
            },
        });
    }

    async putAdditionPurchaseStock(item, stock, averagePrice, quantity, id) {
        const token = JSON.parse(localStorage.getItem('user')).token;

        const updateQuantity = +quantity + +stock['quantity'];
        const updateAveragePrice =
            (+averagePrice * +quantity + +stock['average_price'] * +stock['quantity']) /
            updateQuantity;

        return axios({
            method: 'put',
            url: '/api/stock',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            data: {
                id: stock['id'],
                symbol: item['item']['1. symbol'],
                name: item['item']['2. name'],
                type: item['item']['3. type'],
                quantity: updateQuantity,
                averageprice: updateAveragePrice,
                region: item['item']['4. region'],
                marketopen: item['item']['5. marketOpen'],
                marketclose: item['item']['6. marketClose'],
                timezone: item['item']['7. timezone'],
                currency: item['item']['8. currency'],
                portfolioid: id,
            },
        });
    }

    async putStock(item, ownQuantity, ownAveragePrice, id) {
        const token = JSON.parse(localStorage.getItem('user')).token;
        return axios({
            method: 'put',
            url: '/api/stock',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            data: {
                id: item['item']['id'],
                symbol: item['item']['symbol'],
                name: item['item']['name'],
                type: item['item']['type'],
                quantity: ownQuantity,
                averageprice: ownAveragePrice,
                region: item['item']['region'],
                marketopen: item['item']['market_open'],
                marketclose: item['item']['market_close'],
                timezone: item['item']['timezone'],
                currency: item['item']['currency'],
                portfolioid: id,
            },
        });
    }

    async deleteStock(item) {
        const token = JSON.parse(localStorage.getItem('user')).token;
        return axios({
            method: 'delete',
            url: '/api/stock/' + item['item']['id'],
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
    }
}

export default new StockService();