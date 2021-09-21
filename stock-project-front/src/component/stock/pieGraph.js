import { RadialChart, DiscreteColorLegend } from 'react-vis';
import { Button } from 'react-bootstrap';
import React, { Component } from 'react';

class PieGraph extends Component {
    constructor(props) {
        super(props);
        this.assetClick = this.assetClick.bind(this);
        this.allocationClick = this.allocationClick.bind(this);
        this.clickValue = this.clickValue.bind(this);
        this.state = {
            isAssetOpen: true,
            chartValue: '총 자산 : $' + this.getTotalAsset(),
            fixd: false,
            data: this.getAssetData(),
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.stocks !== prevProps.stocks) {
            this.setState({
                data: this.getAssetData(),
                chartValue: '총 자산 : $' + this.getTotalAsset(),
            });
        }
    }

    getTotalAsset() {
        var sum = 0;
        this.props.stocks.forEach((i) => {
            sum += i['average_price'] * i['quantity'];
        });
        return sum;
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
        var sum = 0;
        var data = [];
        this.props.stocks.forEach((i) => {
            sum += i['average_price'] * i['quantity'];
        });

        var num = 0;
        this.props.stocks.forEach((i) => {
            const price = i['average_price'] * i['quantity'];
            const percent = (price / sum) * 100;
            data.push({
                title: i['symbol'] + ' (' + percent.toFixed(1) + '%) $' + price,
                label: i['symbol'],
                angle: percent,
                color: colors[num++],
                innerRadius: 75,
                radius: 115,
                strokeWidth: 4,
            });
        });
        return data;
    }

    assetClick(e) {
        this.setState({ isAssetOpen: true, chartValue: '총 자산 : $' + this.getTotalAsset() });
    }

    allocationClick(e) {
        this.setState({ isAssetOpen: false, chartValue: '연 배당금 : $' });
    }

    clickValue(e, v) {
        var temp = this.getAssetData();
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
                <h4>포트폴리오 구성</h4>
                <Button onClick={this.assetClick}>자산구성</Button>
                <Button onClick={this.allocationClick}>배당구성</Button>
                {this.state.isAssetOpen ? (
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
                                        isAssetOpen: true,
                                        chartValue: v.title,
                                        fixed: false,
                                    });
                            }}
                            onValueMouseOut={(v) => {
                                if (!this.state.fixed)
                                    this.setState({
                                        isAssetOpen: true,
                                        chartValue: '총 자산 : $' + this.getTotalAsset(),
                                        fixed: false,
                                    });
                            }}
                            onValueClick={(v, event) => {
                                this.clickValue(event, v);
                                this.setState({
                                    isAssetOpen: true,
                                    chartValue: v.title,
                                });
                            }}
                        />
                        {JSON.stringify(this.state.data) !== '[]' ? (
                            <div>{this.state.chartValue}</div>
                        ) : (
                            <div></div>
                        )}
                        <DiscreteColorLegend items={this.state.data} />
                    </div>
                ) : (
                    <div>{this.state.chartValue}</div>
                )}
            </div>
        );
    }
}

export default PieGraph;