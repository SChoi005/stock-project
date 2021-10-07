import React, { Component } from 'react';
import { PulseLoader } from 'react-spinners';

class StockBalanceStatus extends Component {
    getTotalAsset() {
        var sum = 0;
        this.props.stocks.forEach((i) => {
            this.props.endPoints.forEach((j) => {
                if (j['01. symbol'] === i['symbol']) sum += j['05. price'] * i['quantity'];
            });
        });
        return sum.toFixed(4);
    }

    getInvestment() {
        var sum = 0;

        this.props.stocks.forEach((i) => {
            sum += i['quantity'] * i['average_price'];
        });

        return sum.toFixed(4);
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

    getData() {
        var data = [];

        this.props.stocks.forEach((i) => {
            this.props.endPoints.forEach((j) => {
                if (i['symbol'] === j['01. symbol']) {
                    var per = j['05. price'] - i['average_price'];
                    per = ((100 * per) / i['average_price']).toFixed(2) + '%';

                    data.push({
                        symbol: i['symbol'],
                        price: '$' + j['05. price'],
                        averagePrice: '$' + i['average_price'],
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
                            <h2 className="card-heading">💰주식잔고 현황<span className="sub-title">전일기준</span></h2>
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
                                                            {i['price']}
                                                        </td>
                                                    ) : (
                                                        <td style={{ color: '#dc143c' }}>
                                                            {i['price']}
                                                        </td>
                                                    )}
                                                    <td>{i['averagePrice']}</td>
                                                    <td>{i['quantity']}</td>
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
                                                            ${i['plusAndLoss']}
                                                        </td>
                                                    ) : (
                                                        <td style={{ color: '#dc143c' }}>
                                                            ${i['plusAndLoss']}
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
                                                    {'$' + this.getTotalAsset()}
                                                </td>
                                            ) : (
                                                <td style={{ color: '#dc143c' }}>
                                                    {'$' + this.getTotalAsset()}
                                                </td>
                                            )}
                                            <td>{'$' + this.getInvestment()}</td>
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
                                                    ${this.getTotalPlusAndLoss()}
                                                </td>
                                            ) : (
                                                <td style={{ color: '#dc143c' }}>
                                                    ${this.getTotalPlusAndLoss()}
                                                </td>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
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
                                <PulseLoader
                                    className="loading"
                                    color="#4285f4"
                                    speedMultiplier={1}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default StockBalanceStatus;