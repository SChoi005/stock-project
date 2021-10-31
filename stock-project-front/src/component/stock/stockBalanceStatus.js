import React, { Component } from 'react';
import { PulseLoader } from 'react-spinners';

class StockBalanceStatus extends Component {
    dollarString(str) {
        return (
            str.substring(0, str.length - 5).replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
            str.substring(str.length - 5, str.length)
        );
    }

    getTotalAsset() {
        var sum = 0;
        this.props.stocks.forEach((i) => {
            this.props.endPoints.forEach((j) => {
                if (j['01. symbol'] === i['symbol']) sum += j['05. price'] * i['quantity'];
            });
        });

        return sum.toFixed(4);
    }

    getTotalWonAsset() {
        var sum = 0;
        this.props.stocks.forEach((i) => {
            this.props.endPoints.forEach((j) => {
                if (j['01. symbol'] === i['symbol']) sum += j['05. price'] * i['quantity'];
            });
        });

        sum = (sum * this.props.exchangeRate['5. Exchange Rate']).toFixed(0);

        return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    getInvestment() {
        var sum = 0;

        this.props.stocks.forEach((i) => {
            sum += i['quantity'] * i['average_price'];
        });

        return sum.toFixed(4);
    }

    getWonInvestment() {
        var sum = 0;

        this.props.stocks.forEach((i) => {
            sum += i['quantity'] * i['average_price'];
        });

        sum = (sum * this.props.exchangeRate['5. Exchange Rate']).toFixed(0);

        return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    getYield() {
        var investment = this.getInvestment();
        return (((this.getTotalAsset() - investment) * 100) / investment).toFixed(2) + '%';
    }

    getPreviousDayYield() {
        var previous = 0;
        this.props.stocks.forEach((i) => {
            this.props.endPoints.forEach((j) => {
                if (j['01. symbol'] === i['symbol'])
                    previous += j['08. previous close'] * i['quantity'];
            });
        });

        return (((this.getTotalAsset() - previous) * 100) / previous).toFixed(2) + '%';
    }

    getTotalPlusAndLoss() {
        var sum = 0;

        this.props.stocks.forEach((i) => {
            this.props.endPoints.forEach((j) => {
                if (j['01. symbol'] === i['symbol'])
                    sum += (j['05. price'] - i['average_price']) * i['quantity'];
            });
        });

        return sum.toFixed(4);
    }

    getWonTotalPlusAndLoss() {
        var sum = 0;

        this.props.stocks.forEach((i) => {
            this.props.endPoints.forEach((j) => {
                if (j['01. symbol'] === i['symbol'])
                    sum += (j['05. price'] - i['average_price']) * i['quantity'];
            });
        });
        sum = (sum * this.props.exchangeRate['5. Exchange Rate']).toFixed(0);

        return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    getData() {
        var data = [];

        this.props.stocks.forEach((i) => {
            this.props.endPoints.forEach((j) => {
                if (i['symbol'] === j['01. symbol']) {
                    var per = j['05. price'] - i['average_price'];
                    per = ((100 * per) / i['average_price']).toFixed(2) + '%';

                    data.push({
                        symbol: i['symbol'],
                        price: j['05. price'],
                        averagePrice: i['average_price'],
                        quantity: i['quantity'],
                        percent: per,
                        previousDayPricePercent:
                            j['10. change percent'].substring(
                                0,
                                j['10. change percent'].length - 3
                            ) + '%',
                        plusAndLoss: (
                            (j['05. price'] - i['average_price']) *
                            i['quantity']
                        ).toFixed(4),
                    });
                }
            });
        });

        return data;
    }

    render() {
        return (
            <div className="col-12 col-lg-7 col-xl-7">
                {!this.props.isLoading ? (
                    <div className="h-100 card">
                        <div className="card-header">
                            <h2 className="card-heading">
                                💰주식잔고 현황
                                {this.props.endPoints.length !== 0 ? (
                                    <span className="sub-title">
                                        {this.props.endPoints[0]['07. latest trading day']} 기준
                                    </span>
                                ) : (
                                    <span className="sub-title"></span>
                                )}
                            </h2>
                        </div>
                        {this.props.stocks.length !== 0 ? (
                            <div className="card-body table-responsive">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>주식명</th>
                                            <th>현재가</th>
                                            <th>평균단가</th>
                                            <th>수량</th>
                                            <th>수익률</th>
                                            <th>전일대비</th>
                                            <th>평가손익</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getData().map((i) => {
                                            return (
                                                <tr key={i['symbol']}>
                                                    <td>{i['symbol']}</td>

                                                    {i['previousDayPricePercent'][0] === '-' ? (
                                                        <td style={{ color: '#4285f4' }}>
                                                            ${this.dollarString(i['price'])}
                                                        </td>
                                                    ) : (
                                                        <td style={{ color: '#dc143c' }}>
                                                            ${this.dollarString(i['price'])}
                                                        </td>
                                                    )}
                                                    <td>
                                                        $
                                                        {this.dollarString(
                                                            i['averagePrice'].toFixed(4)
                                                        )}
                                                    </td>
                                                    <td>
                                                        {i['quantity']
                                                            .toString()
                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    </td>
                                                    {i['percent'][0] === '-' ? (
                                                        <td style={{ color: '#4285f4' }}>
                                                            {i['percent']}
                                                        </td>
                                                    ) : (
                                                        <td style={{ color: '#dc143c' }}>
                                                            {i['percent']}
                                                        </td>
                                                    )}

                                                    {i['previousDayPricePercent'][0] === '-' ? (
                                                        <td style={{ color: '#4285f4' }}>
                                                            {i['previousDayPricePercent']}
                                                        </td>
                                                    ) : (
                                                        <td style={{ color: '#dc143c' }}>
                                                            {i['previousDayPricePercent']}
                                                        </td>
                                                    )}
                                                    {i['percent'][0] === '-' ? (
                                                        <td style={{ color: '#4285f4' }}>
                                                            ${this.dollarString(i['plusAndLoss'])}
                                                        </td>
                                                    ) : (
                                                        <td style={{ color: '#dc143c' }}>
                                                            ${this.dollarString(i['plusAndLoss'])}
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <table className="table table-sm">
                                    <thead>
                                        <tr style={{ fontWeight: 'bold' }}>
                                            <th>총자산</th>
                                            <th>투자자산</th>
                                            <th>수익률</th>
                                            <th>전일대비</th>
                                            <th>평가손익</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {this.getPreviousDayYield()[0] === '-' ? (
                                                <td style={{ color: '#4285f4' }}>
                                                    {'$' + this.dollarString(this.getTotalAsset())}
                                                </td>
                                            ) : (
                                                <td style={{ color: '#dc143c' }}>
                                                    {'$' + this.dollarString(this.getTotalAsset())}
                                                </td>
                                            )}
                                            <td>{'$' + this.dollarString(this.getInvestment())}</td>
                                            {this.getYield()[0] === '-' ? (
                                                <td style={{ color: '#4285f4' }}>
                                                    {this.getYield()}
                                                </td>
                                            ) : (
                                                <td style={{ color: '#dc143c' }}>
                                                    {this.getYield()}
                                                </td>
                                            )}
                                            {this.getPreviousDayYield()[0] === '-' ? (
                                                <td style={{ color: '#4285f4' }}>
                                                    {this.getPreviousDayYield()}
                                                </td>
                                            ) : (
                                                <td style={{ color: '#dc143c' }}>
                                                    {this.getPreviousDayYield()}
                                                </td>
                                            )}
                                            {this.getYield()[0] === '-' ? (
                                                <td style={{ color: '#4285f4' }}>
                                                    ${this.dollarString(this.getTotalPlusAndLoss())}
                                                </td>
                                            ) : (
                                                <td style={{ color: '#dc143c' }}>
                                                    ${this.dollarString(this.getTotalPlusAndLoss())}
                                                </td>
                                            )}
                                        </tr>
                                        <tr>
                                            {this.getPreviousDayYield()[0] === '-' ? (
                                                <td style={{ color: '#4285f4' }}>
                                                    {'₩' + this.getTotalWonAsset()}
                                                </td>
                                            ) : (
                                                <td style={{ color: '#dc143c' }}>
                                                    {'₩' + this.getTotalWonAsset()}
                                                </td>
                                            )}
                                            <td>{'₩' + this.getWonInvestment()}</td>
                                            <td colSpan="2"></td>
                                            {this.getYield()[0] === '-' ? (
                                                <td style={{ color: '#4285f4' }}>
                                                    ₩{this.getWonTotalPlusAndLoss()}
                                                </td>
                                            ) : (
                                                <td style={{ color: '#dc143c' }}>
                                                    ₩{this.getWonTotalPlusAndLoss()}
                                                </td>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
                                <span className="sub-title">
                                    {this.props.exchangeRate['6. Last Refreshed'].substring(0, 11)}
                                    기준 / 1 USD :{' '}
                                    {this.props.exchangeRate['5. Exchange Rate'].substring(
                                        0,
                                        7
                                    )}{' '}
                                    KRW
                                </span>
                            </div>
                        ) : (
                            <div className="card-body"></div>
                        )}
                    </div>
                ) : (
                    <div className="empty-component">
                        <div className="h-100 card">
                            <div className="card-header">
                                <h2 className="card-heading">💰주식잔고 현황</h2>
                            </div>
                            <div className="card-body">
                                <PulseLoader color="#4285f4" speedMultiplier={1} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default StockBalanceStatus;