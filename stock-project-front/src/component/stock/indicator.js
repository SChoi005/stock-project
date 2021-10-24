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

class Indicator extends Component {
    constructor(props) {
        super(props);
        this.setSymbol = this.setSymbol.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.state = {
            symbol: '',
            indicator: 'RSI',
            indicatorDescription: '# 상대 강도 지수(RSI)는 주식 또는 기타 자산 가격의 과매수 또는 과매도 상태를 평가하기 위해 최근 가격 변동의 규모를 측정하는 모멘텀 지표를 설명합니다.',
            hint: '',
            hintHover: false,
            startDate: new Date(2021, 1, 1),
            endDate: new Date(),
            referenceUrl:"https://www.investopedia.com/articles/active-trading/042114/overbought-or-oversold-use-relative-strength-index-find-out.asp"
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.stocks !== this.props.stocks) {
            if (this.props.stocks.length !== 0)
                this.setState({
                    symbol: this.props.stocks[0]['symbol'],
                    indicator: 'RSI',
                });
            else this.setState({ symbol: '', indicator: 'RSI' });
        }
    }

    componentDidMount() {
        if (this.props.stocks.length !== 0)
            this.setState({ symbol: this.props.stocks[0]['symbol'] });
    }

    setIndicator(indicator) {
        // RSI,
        if(indicator === "RSI")
            this.setState({ indicator: indicator, indicatorDescription: '# 상대 강도 지수(RSI)는 주식 또는 기타 자산 가격의 과매수 또는 과매도 상태를 평가하기 위해 최근 가격 변동의 규모를 측정하는 모멘텀 지표를 설명합니다.', referenceUrl:"https://www.investopedia.com/articles/active-trading/042114/overbought-or-oversold-use-relative-strength-index-find-out.asp" });
        if(indicator === "CCI")
            this.setState({ indicator: indicator, indicatorDescription: '# 상품 채널 지수 (CCI)는 투자 수단이 과매수 또는 과매도 상태에 도달하는 시기를 판단하는 데 사용되는 모멘텀 기반 오실레이터입니다.', referenceUrl:"https://www.investopedia.com/investing/timing-trades-with-commodity-channel-index/" });
        if(indicator === "STOCH")
            this.setState({ indicator: indicator, indicatorDescription: '# 스토캐스틱 오실레이터 (STOCH)는 증권의 특정 종가를 특정 기간 동안의 가격 범위와 비교하는 모멘텀 지표입니다.', referenceUrl:"https://www.investopedia.com/terms/s/stochasticoscillator.asp" });
        if(indicator === "OBV")
            this.setState({ indicator: indicator, indicatorDescription: '# 균형 거래량 (OBV)은 양수 및 음수 거래량 흐름을 측정하는 모멘텀 지표입니다.', referenceUrl:"https://www.investopedia.com/articles/technical/100801.asp" });
    }
    setSymbol(e, symbol) {
        e.preventDefault();
        this.setState({ symbol: symbol });
    }

    getVariant(indicator) {
        if (this.state.indicator === indicator) return 'primary';
        else return 'secondary';
    }

    getData() {
        var data = [];
        if (this.state.indicator === 'RSI') {
            this.props.rsi.forEach((r) => {
                if (r['Meta Data']['1: Symbol'] === this.state.symbol) {
                    for (var i in r['Technical Analysis: RSI']['series']) {
                        data.push({
                            x: new Date(i),
                            y: parseFloat(r['Technical Analysis: RSI']['series'][i]['RSI']),
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
                        {this.state.indicator} : {this.state.hint.y} %
                        <br />
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

    render() {
        return (
            <div className="col-12 col-lg-6 col-xl-6">
                {!this.props.isLoading ? (
                    <div className="h-100 card">
                        <div className="card-header">
                            <h2 className="card-heading">
                                🛠️기술 지표
                                <br />
                                <p className="sub-title">
                                    {this.state.indicatorDescription}
                                    <a target="_blank" href={this.state.referenceUrl}> 참고자료</a>
                                </p>
                            </h2>
                        </div>
                        <div className="card-body">
                            <div>
                                <DropdownButton id="dropdown-basic-button" title="">
                                    {this.props.stocks.map((s) => {
                                        return (
                                            <Dropdown.Item
                                                href="/"
                                                onClick={(event) => {
                                                    this.setSymbol(event, s['symbol']);
                                                }}
                                                role="button"
                                                key={s['symbol']}
                                            >
                                                {s['symbol']}
                                            </Dropdown.Item>
                                        );
                                    })}
                                </DropdownButton>
                                <div className="card-heading">{this.state.symbol}</div>
                            </div>
                            <div className="btn-group">
                                <Button
                                    variant={this.getVariant('RSI')}
                                    onClick={() => {
                                        this.setIndicator('RSI');
                                    }}
                                >
                                    RSI
                                </Button>
                                <Button
                                    variant={this.getVariant('CCI')}
                                    onClick={() => {
                                        this.setIndicator('CCI');
                                    }}
                                >
                                    CCI
                                </Button>
                                <Button
                                    variant={this.getVariant('STOCH')}
                                    onClick={() => {
                                        this.setIndicator('STOCH');
                                    }}
                                >
                                    STOCH
                                </Button>
                                <Button
                                    variant={this.getVariant('OBV')}
                                    onClick={() => {
                                        this.setIndicator('OBV');
                                    }}
                                >
                                    OBV
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
                                        onChange={(date) =>
                                            this.setState({ endDate: new Date(date) })
                                        }
                                        selectsEnd
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        minDate={this.state.startDate}
                                    />
                                </div>
                            </div>
                            {this.props.rsi.length !== 0 ? (
                                <FlexibleXYPlot
                                    height={400}
                                    xType="time"
                                    onMouseLeave={this.mouseOut}
                                >
                                    <VerticalGridLines />
                                    <HorizontalGridLines />
                                    <XAxis title="Date" />
                                    <YAxis title="Percent" />
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
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <div className="empty-component">
                        <div className="h-100 card">
                            <div className="card-header">
                                <h2 className="card-heading">🛠️기술 지표</h2>
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

export default Indicator;