import { RadialChart, DiscreteColorLegend } from 'react-vis';
import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { PulseLoader } from 'react-spinners';

class StockBalanceStatus extends Component {
    constructor(props) {
        super(props);
    }

    getTotalAsset() {
        var sum = 0;
        this.props.stocks.forEach((i) => {
            this.props.endPoints.forEach((j)=>{
                if(j['01. symbol']===i['symbol'])
                    sum += j['05. price'] * i['quantity'];
            })
        });
        return sum.toFixed(4);
    }
    
    getInvestment(){
        var sum = 0;
        
        this.props.stocks.forEach((i)=>{
            sum += (i['quantity']*i['average_price']);
        })
        
        return sum.toFixed(4);
    }
    
    getYield(){
        var investment = this.getInvestment()
        return ((this.getTotalAsset()-investment)*100/investment).toFixed(2)+"%";        
    }
    
    getPreviousDayYield(){
        var previous = 0;
        this.props.stocks.forEach((i) => {
            this.props.endPoints.forEach((j)=>{
                if(j['01. symbol']===i['symbol'])
                    previous += j['08. previous close'] * i['quantity'];
            })
        });
        
        return ((this.getTotalAsset()-previous)*100/previous).toFixed(2)+"%";
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
                        price: "$"+j['05. price'],
                        averagePrice: "$"+i['average_price'],
                        quantity: i['quantity'],
                        percent: per,
                        previousDayPricePercent: j['10. change percent'].substring(0,j['10. change percent'].length-3)+'%'
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
                        <table>
                            <thead>
                                <tr>
                                    <th>주식명</th>
                                    <th>현재가</th>
                                    <th>평균단가</th>
                                    <th>수량</th>
                                    <th>수익률</th>
                                    <th>전일대비</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.getData().map((i) => {
                                    return (
                                        <tr key={i['symbol']}>
                                            <td>{i['symbol']}</td>
                                            <td>{i['price']}</td>
                                            <td>{i['averagePrice']}</td>
                                            <td>{i['quantity']}</td>
                                            <td>{i['percent']}</td>
                                            <td>{i['previousDayPricePercent']}</td>
                                        </tr>
                                    );
                                })}
                                <tr style={{fontWeight:"bold"}}>
                                    <td colSpan='2'>총자산</td>
                                    <td colSpan='2'>투자자산</td>
                                    <td>수익률</td>
                                    <td>전일대비</td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>{"$"+this.getTotalAsset()}</td>
                                    <td colSpan='2'>{"$"+this.getInvestment()}</td>
                                    <td>{this.getYield()}</td>
                                    <td>{this.getPreviousDayYield()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <PulseLoader color="#36D7B7" speedMultiplier={1}/>
                )}
            </div>
        );
    }
}

export default StockBalanceStatus;