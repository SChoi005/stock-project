import axios from 'axios';

class OpenApiService {
    async getStockOverview(symbol) {
        const token = JSON.parse(localStorage.getItem('user')).token;
        return axios({
            method: 'get',
            url: '/api/overview/' + symbol,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
    }

    async searchSymbolSearch(keywords) {
        const token = JSON.parse(localStorage.getItem('user')).token;
        return axios({
            method: 'get',
            url: '/api/search/' + keywords,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
    }
    
    async getQuoteEndpoint(symbol){
        const token = JSON.parse(localStorage.getItem('user')).token;
        return axios({
            method: 'get',
            url: '/api/quote-endpoint/' + symbol,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
    }
    
    async getExchangeRate(){
        const token = JSON.parse(localStorage.getItem('user')).token;
        return axios({
            method: 'get',
            url: '/api/exchangeRate/',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
    }
}

export default new OpenApiService();