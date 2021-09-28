import { RadialChart, DiscreteColorLegend } from 'react-vis';
import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { PulseLoader } from "react-spinners";
class PieGraph extends Component {
    constructor(props) {
        super(props);
        this.assetClick = this.assetClick.bind(this);
        this.allocationClick = this.allocationClick.bind(this);
        this.clickValue = this.clickValue.bind(this);
        this.state = {
            switch: true,
            chartValue: '총 자산 : $' + this.getTotalAsset(),
            fixd: false,
            data: this.getAssetData(),
        };
    }    
    
    componentDidUpdate(prevProps, prevState) {
        
        if (this.props.equityOverviews !== prevProps.equityOverviews) {
            this.setState({
                data: this.getAssetData(),
                chartValue: '총 자산 : $' + this.getTotalAsset(),
                switch: true,
            });
        }
        if (this.props.stocks !== prevProps.stocks) {
            this.setState({
                data: this.getAssetData(),
                chartValue: '총 자산 : $' + this.getTotalAsset(),
                switch: true,
            });
        }
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

    getTotalAllocation() {
        var sum = 0;
        this.props.stocks.forEach((i) => {
            this.props.equityOverviews.forEach((j) => {
                if (j['Symbol'] === i['symbol']) {
                    if (j['DividendPerShare'] !== 'None')
                        sum += i['quantity'] * j['DividendPerShare']*0.86;
                }
            });
        });
        return sum.toFixed(2);
    }

    getAssetData() {
        const colors = [
            '#e2854c',
            '#698b69',
            '#747ba1',
            '#ffba77',
            '#cdc9c9',
            '#eee5de',
            '#eee9bf',
            '#698b69',
            '#d4af37',
            '#789048',
            '#602b2b',
            '#fffafa',
            '#eee9e9',
            '#cdc9a5',
            '#cdcdc1',
            '#e2854c',
            '#4d5886',
            '#d11141',
        ];
        var sum = this.getTotalAsset();
        var data = [];

        var num = 0;
        this.props.stocks.forEach((i) => {
            this.props.endPoints.forEach((j)=>{
                if(j['01. symbol']===i['symbol']){
                    const price = j['05. price'] * i['quantity'];
                    const percent = (price / sum) * 100;
                    data.push({
                        title: i['symbol'] + ' (' + percent.toFixed(1) + '%) $' + price.toFixed(4),
                        label: i['symbol'],
                        angle: percent,
                        color: colors[num++],
                        innerRadius: 75,
                        radius: 115,
                        strokeWidth: 4,
                    });
                }
            })
            
        });
        return data;
    }

    getAllocationData() {
        const colors = [
            '#e2854c',
            '#698b69',
            '#747ba1',
            '#ffba77',
            '#cdc9c9',
            '#eee5de',
            '#eee9bf',
            '#698b69',
            '#d4af37',
            '#789048',
            '#602b2b',
            '#fffafa',
            '#eee9e9',
            '#cdc9a5',
            '#cdcdc1',
            '#e2854c',
            '#4d5886',
            '#d11141',
        ];
        // stock
        // 시가배당률 DividendYield
        // 주당배당금 DividendPerShare
        // 배당일    DividendDate
        // 배당락일  ExDividendDate
        var sum = this.getTotalAllocation();
        var data = [];
        var num = 0;
        this.props.stocks.forEach((i) => {
            this.props.equityOverviews.forEach((j) => {
                if (j['Symbol'] === i['symbol']) {
                    if (j['DividendPerShare'] !== 'None') {
                        const dividend = i['quantity'] * j['DividendPerShare']*0.86;
                        const percent = (dividend / sum) * 100;
                        data.push({
                            title: j['Symbol'] + ' (' + percent.toFixed(1) + '%) $' + dividend.toFixed(2),
                            label: j['Symbol'],
                            angle: percent,
                            color: colors[num++],
                            innerRadius: 75,
                            radius: 115,
                            strokeWidth: 4,
                        });
                    }
                }
            });
        });

        return data;

        // etf는...
    }

    assetClick(e) {
        this.setState({
            switch: true,
            chartValue: '총 자산 : $' + this.getTotalAsset(),
            data: this.getAssetData(),
            fixed: false,
        });
    }

    allocationClick(e) {
        this.setState({
            switch: false,
            chartValue: '연 배당금 : $' + this.getTotalAllocation(),
            data: this.getAllocationData(),
            fixed: false,
        });
    }

    clickValue(e, v) {
        var temp = [];
        if (this.state.switch) temp = this.getAssetData();
        else temp = this.getAllocationData();
        var newData = [];
        temp.forEach((i) => {
            if (i.label === v.label) {
                if (v.radius === 130) {
                    this.setState({ fixed: false });
                    i.radius = 115;
                } else {
                    this.setState({ fixed: true });
                    i.radius = 130;
                }
                newData.push(i);
            } else {
                newData.push(i);
            }
        });

        this.setState({ data: newData });
    }

    render() {
        return (
            <div>
                {!this.props.isLoading ? (
                    <div>
                        <h4>포트폴리오 구성</h4>
                        <Button onClick={this.assetClick}>자산구성</Button>
                        <Button onClick={this.allocationClick}>배당구성</Button>
                        {this.state.data.length !== 0 ? (
                            <div>
                                <RadialChart
                                    data={this.state.data}
                                    width={250}
                                    height={250}
                                    animation={'gentle'}
                                    showLabels={false}
                                    orientation="vertical"
                                    colorType="literal"
                                    padAngle={0.04}
                                    onValueMouseOver={(v) => {
                                        if (!this.state.fixed)
                                            this.setState({
                                                chartValue: v.title,
                                                fixed: false,
                                            });
                                    }}
                                    onValueMouseOut={(v) => {
                                        if (!this.state.fixed) {
                                            if (this.state.switch)
                                                this.setState({
                                                    chartValue:
                                                        '총 자산 : $' + this.getTotalAsset(),
                                                    fixed: false,
                                                });
                                            else
                                                this.setState({
                                                    chartValue:
                                                        '연 배당금 : $' + this.getTotalAllocation(),
                                                    fixed: false,
                                                });
                                        }
                                    }}
                                    onValueClick={(v, event) => {
                                        this.clickValue(event, v);
                                        this.setState({
                                            chartValue: v.title,
                                        });
                                    }}
                                />
                                <div>{this.state.chartValue}</div>
                                <DiscreteColorLegend items={this.state.data} />
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                ) : (
                    <PulseLoader color="#36D7B7" speedMultiplier={1}/>
                )}
            </div>
        );
    }
}

export default PieGraph;