import React, { Component } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { PulseLoader } from 'react-spinners';
import {
    FlexibleXYPlot ,
    LineSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
} from 'react-vis';
import 'react-vis/dist/style.css';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.setSymbol = this.setSymbol.bind(this);
        this.state = {
            type: 'daily',
            symbol: '',
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.monthly !== this.props.monthly) {
            if (this.props.monthly.length !== 0)
                this.setState({ symbol: this.props.monthly[0]['Meta Data']['2. Symbol'] });
            else this.setState({ symbol: '' });
        }
    }

    setType(type) {
        this.setState({ type: type });
    }

    setSymbol(e, symbol) {
        e.preventDefault();
        this.setState({ symbol: symbol });
    }

    getData() {
        var data = [];
        if (this.state.type === 'daily') {
            this.props.daily.forEach((s) => {
                if (s['Meta Data']['2. Symbol'] === this.state.symbol) {
                    for (var i in s['Time Series (Daily)']['series']) {
                        data.push({
                            x: new Date(i),
                            y: parseFloat(s['Time Series (Daily)']['series'][i]['4. close']),
                        });
                    }
                }
            });
        } else if (this.state.type === 'weekly') {
            this.props.weekly.forEach((s) => {
                if (s['Meta Data']['2. Symbol'] === this.state.symbol) {
                    for (var i in s['Weekly Adjusted Time Series']['series']) {
                        data.push({
                            x: new Date(i),
                            y: parseFloat(
                                s['Weekly Adjusted Time Series']['series'][i]['4. close']
                            ),
                        });
                    }
                }
            });
        } else {
            this.props.monthly.forEach((s) => {
                if (s['Meta Data']['2. Symbol'] === this.state.symbol) {
                    for (var i in s['Monthly Adjusted Time Series']['series']) {
                        data.push({
                            x: new Date(i),
                            y: parseFloat(
                                s['Monthly Adjusted Time Series']['series'][i]['4. close']
                            ),
                        });
                    }
                }
            });
        }

        data.sort(function (a, b) {
            return new Date(a.x) - new Date(b.x);
        });
        return data;
    }

    render() {
        return (
            <div className="col-12 col-lg-6 col-xl-6">
                {!this.props.isLoading ? (
                    <div className="h-100 card">
                        <div className="card-header">
                            <h2 className="card-heading">📈보유주식 차트</h2>
                        </div>
                        <div className="card-body">
                            <div>
                                <DropdownButton id="dropdown-basic-button" title="">
                                    {this.props.monthly.map((s) => {
                                        return (
                                            <Dropdown.Item
                                                href="/"
                                                onClick={(event) => {
                                                    this.setSymbol(
                                                        event,
                                                        s['Meta Data']['2. Symbol']
                                                    );
                                                }}
                                                role="button"
                                                key={s['Meta Data']['2. Symbol']}
                                            >
                                                {s['Meta Data']['2. Symbol']}
                                            </Dropdown.Item>
                                        );
                                    })}
                                </DropdownButton>
                                <div>{this.state.symbol}</div>
                            </div>
                            <div className="btn-group">
                                <Button
                                    onClick={() => {
                                        this.setType('daily');
                                    }}
                                >
                                    D
                                </Button>
                                <Button
                                    onClick={() => {
                                        this.setType('weekly');
                                    }}
                                >
                                    W
                                </Button>
                                <Button
                                    onClick={() => {
                                        this.setType('monthly');
                                    }}
                                >
                                    M
                                </Button>
                            </div>
                            {this.props.monthly.length !== 0 ? (
                                <FlexibleXYPlot height={500}>
                                    <VerticalGridLines />
                                    <HorizontalGridLines />
                                    <XAxis title="Date"/>
                                    <YAxis title="Price"/>
                                    <LineSeries
                                        data={this.getData()}
                                        className="linemark-series-example"
                                        style={{
                                            strokeWidth: '2px',
                                        }}
                                        stroke="#4285f4"
                                    />
                                </FlexibleXYPlot >
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="empty-component">
                        <div className="h-100 card">
                            <div className="card-header">
                                <h2 className="card-heading">📈보유주식 차트</h2>
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

export default Chart;