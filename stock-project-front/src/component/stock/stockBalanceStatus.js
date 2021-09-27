import { RadialChart, DiscreteColorLegend } from 'react-vis';
import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { PulseLoader } from 'react-spinners';

class StockBalanceStatus extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {}

    getData() {
        var data = [];

        this.props.stocks.forEach((i) => {
            this.props.endPoints.forEach((j) => {
                if (i['symbol'] === j['01. symbol']) {
                    var per;
                    var temp = j['05. price'] - i['average_price'];
                    if (temp < 0) {
                        per = '-' + (((100 * temp) / i['average_price']) * -1).toFixed(2) + '%';
                    } else per = ((100 * temp) / i['average_price']).toFixed(2) + '%';

                    data.push({
                        symbol: i['symbol'],
                        price: j['05. price'],
                        averagePrice: i['average_price'],
                        quantity: i['quantity'],
                        percent: per,
                    });
                }
            });
        });

        return data;
    }

    render() {
        return (
            <div>
                {!this.props.isLoading ? (
                    <div>
                        <h4>주식잔고 현황</h4>
                        {this.getData().map((i) => {
                            return <div>{JSON.stringify(i)}</div>;
                        })}
                    </div>
                ) : (
                    <PulseLoader color="#36D7B7" speedMultiplier={1}/>
                )}
            </div>
        );
    }
}

export default StockBalanceStatus;