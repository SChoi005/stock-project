import axios from 'axios';

class PortfolioService {
    async postPortfolio(name, id) {
        const token = JSON.parse(localStorage.getItem('user')).token;
        return axios({
            method: 'post',
            url: '/api/portfolio',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
            data: { id: 0, name: name, userid: id },
        });
    }

    async deletePortfolio(id) {
        const token = JSON.parse(localStorage.getItem('user')).token;
        return axios({
            method: 'delete',
            url: '/api/portfolio/' + id,
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        });
    }

    async putPortfolio(portfolioId, name, userId) {
        const token = JSON.parse(localStorage.getItem('user')).token;
        return axios({
            method: 'put',
            url: '/api/portfolio',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
            data: { id: portfolioId, name: name, userid: userId },
        });
    }
}
export default new PortfolioService();