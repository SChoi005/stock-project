import React, { Component } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { PulseLoader } from 'react-spinners';
import {
    FlexibleXYPlot,
    LineSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    Hint,
    MarkSeries,
} from 'react-vis';
import 'react-vis/dist/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.setSymbol = this.setSymbol.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.state = {
            type: 'daily',
            symbol: '',
            hint: '',
            hintHover: false,
            startDate: new Date(2010, 1, 1),
            endDate: new Date(),
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.monthly !== this.props.monthly) {
            if (this.props.monthly.length !== 0)
                this.setState({
                    symbol: this.props.monthly[0]['Meta Data']['2. Symbol'],
                    type: 'daily',
                    hint: '',
                    hintHover: false,
                });
            else this.setState({ symbol: '', type: 'daily', hint: '', hintHover: false });
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
                            volume: s['Time Series (Daily)']['series'][i]['6. volume'],
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
                            volume: s['Weekly Adjusted Time Series']['series'][i]['6. volume'],
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
                            volume: s['Monthly Adjusted Time Series']['series'][i]['6. volume'],
                        });
                    }
                }
            });
        }

        data.sort(function (a, b) {
            return new Date(a.x) - new Date(b.x);
        });

        var start = -1,
            end = -1;
        var i = 0;

        data.map((d) => {
            if (start === -1 && this.state.startDate.getTime() <= d.x.getTime()) start = i;
            if (end === -1 && this.state.endDate.getTime() <= d.x.getTime()) end = i;
            i++;
        });

        if (end === -1) end = data.length;

        return data.slice(start, end);
    }

    getHintSection(isHintVisible) {
        return isHintVisible ? (
            <Hint value={this.state.hint}>
                <div className="card" style={{ opacity: '0.9', color: '#dc3545' }}>
                    <div className="card-body">
                        {this.state.hint.x.toString().substring(0, 16)}
                        <br />
                        가격 : ${this.state.hint.y}
                        <br />
                        거래량 :{' '}
                        {this.state.hint.volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </div>
                </div>
            </Hint>
        ) : null;
    }

    mouseOver(datapoint) {
        this.setState({ hint: datapoint, hintHover: true });
    }

    mouseOut() {
        this.setState({ hintHover: false });
    }

    getVariant(type) {
        if (this.state.type === type) return 'primary';
        else return 'secondary';
    }

    render() {
        return (
            <div className="col-12 col-lg-6 col-xl-6">
                {!this.props.isLoading ? (
                    <div className="h-100 card">
                        <div className="card-header">
                            <h2 className="card-heading">
                                📈보유주식 차트
                                <br />
                                <span className="sub-title">
                                    # 일일단위는 최대 100일까지만 가능합니다.
                                </span>
                            </h2>
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
                                <div className="card-heading">{this.state.symbol}</div>
                            </div>
                            <div className="btn-group">
                                <Button
                                    variant={this.getVariant('daily')}
                                    onClick={() => {
                                        this.setType('daily');
                                    }}
                                >
                                    D
                                </Button>
                                <Button
                                    variant={this.getVariant('weekly')}
                                    onClick={() => {
                                        this.setType('weekly');
                                    }}
                                >
                                    W
                                </Button>
                                <Button
                                    variant={this.getVariant('monthly')}
                                    onClick={() => {
                                        this.setType('monthly');
                                    }}
                                >
                                    M
                                </Button>
                            </div>
                            <div>
                                <div>
                                    <span>시작일 : </span>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={(date) =>
                                            this.setState({ startDate: new Date(date) })
                                        }
                                        selectsStart
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                    />
                                </div>
                                <div>
                                    <span>종료일 : </span>
                                    <DatePicker
                                        selected={this.state.endDate}
                                        onChange={(date) => this.setState({ endDate: new Date(date) })}
                                        selectsEnd
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        minDate={this.state.startDate}
                                    />
                                </div>
                            </div>
                            {this.props.monthly.length !== 0 ? (
                                <FlexibleXYPlot
                                    height={400}
                                    xType="time"
                                    onMouseLeave={this.mouseOut}
                                >
                                    <VerticalGridLines />
                                    <HorizontalGridLines />
                                    <XAxis title="Date" />
                                    <YAxis title="Price" />
                                    <LineSeries
                                        data={this.getData()}
                                        className="linemark-series-example"
                                        style={{
                                            strokeWidth: '2px',
                                        }}
                                        stroke="#4285f4"
                                        onNearestX={(datapoint, event) => {
                                            this.mouseOver(datapoint);
                                        }}
                                    />
                                    {this.state.hintHover && (
                                        <MarkSeries color="grey" data={[this.state.hint]} />
                                    )}
                                    {this.getHintSection(this.state.hintHover)}
                                </FlexibleXYPlot>
                            ) : (
                                null
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