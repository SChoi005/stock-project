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
    Crosshair,
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
            yTitle: 'Percent',
            indicator: 'RSI',
            indicatorDescription:
                '# 상대 강도 지수 (RSI)는 주식 또는 기타 자산 가격의 과매수 또는 과매도 상태를 평가하기 위해 최근 가격 변동의 규모를 측정하는 모멘텀 지표를 설명합니다. (설정기간 : 14일)',
            hint: '',
            hintSlowD: '',
            hintHover: false,
            startDate: new Date(2021, 0, 1),
            endDate: new Date(),
            referenceUrl:
                'https://www.investopedia.com/articles/active-trading/042114/overbought-or-oversold-use-relative-strength-index-find-out.asp',
            stochValues: [],
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

        if (prevState.indicator !== this.state.indicator) {
            if (this.state.indicator === 'STOCH') this.setState({ stochValues: [] });
        }

        if (this.state.indicator === 'STOCH') {
            if (
                this.state.startDate !== prevState.startDate ||
                this.state.endDate !== prevState.endDate
            ) {
                this.setState({ stochValues: [] });
            }
        }
    }

    componentDidMount() {
        if (this.props.stocks.length !== 0)
            this.setState({ symbol: this.props.stocks[0]['symbol'] });
    }

    setIndicator(indicator) {
        // RSI,
        if (indicator === 'RSI')
            this.setState({
                indicator: indicator,
                indicatorDescription:
                    '# 상대 강도 지수 (RSI)는 주식 또는 기타 자산 가격의 과매수 또는 과매도 상태를 평가하기 위해 최근 가격 변동의 규모를 측정하는 모멘텀 지표를 설명합니다. (설정기간 : 14일)',
                referenceUrl:
                    'https://www.investopedia.com/articles/active-trading/042114/overbought-or-oversold-use-relative-strength-index-find-out.asp',
                yTitle: 'Percent',
            });
        if (indicator === 'CCI')
            this.setState({
                indicator: indicator,
                indicatorDescription:
                    '# 상품 채널 지수 (CCI)는 투자 수단이 과매수 또는 과매도 상태에 도달하는 시기를 판단하는 데 사용되는 모멘텀 기반 오실레이터입니다. (설정기간 : 20일)',
                referenceUrl:
                    'https://www.investopedia.com/investing/timing-trades-with-commodity-channel-index/',
                yTitle: 'Value',
            });
        if (indicator === 'STOCH')
            this.setState({
                indicator: indicator,
                indicatorDescription:
                    '# 스토캐스틱 오실레이터 (STOCH)는 증권의 특정 종가를 특정 기간 동안의 가격 범위와 비교하는 모멘텀 지표입니다.',
                referenceUrl: 'https://www.investopedia.com/terms/s/stochasticoscillator.asp',
                yTitle: 'Percent',
            });
        if (indicator === 'OBV')
            this.setState({
                indicator: indicator,
                indicatorDescription:
                    '# 균형 거래량 (OBV)은 양수 및 음수 거래량 흐름을 측정하는 모멘텀 지표입니다.',
                referenceUrl: 'https://www.investopedia.com/articles/technical/100801.asp',
                yTitle: 'Value',
            });
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
        } else if (this.state.indicator === 'CCI') {
            this.props.cci.forEach((r) => {
                if (r['Meta Data']['1: Symbol'] === this.state.symbol) {
                    for (var i in r['Technical Analysis: CCI']['series']) {
                        data.push({
                            x: new Date(i),
                            y: parseFloat(r['Technical Analysis: CCI']['series'][i]['CCI']),
                        });
                    }
                }
            });
        } else if (this.state.indicator === 'STOCH') {
            this.props.stoch.forEach((r) => {
                if (r['Meta Data']['1: Symbol'] === this.state.symbol) {
                    for (var i in r['Technical Analysis: STOCH']['series']) {
                        data.push({
                            x: new Date(i),
                            y: parseFloat(r['Technical Analysis: STOCH']['series'][i]['SlowK']),
                        });
                    }
                }
            });
        } else if (this.state.indicator === 'OBV') {
            this.props.obv.forEach((r) => {
                if (r['Meta Data']['1: Symbol'] === this.state.symbol) {
                    for (var i in r['Technical Analysis: OBV']['series']) {
                        data.push({
                            x: new Date(i),
                            y: parseFloat(r['Technical Analysis: OBV']['series'][i]['OBV']),
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

        data.forEach((d) => {
            if (start === -1 && this.state.startDate.getTime() <= d.x.getTime()) start = i;
            if (end === -1 && this.state.endDate.getTime() <= d.x.getTime()) end = i;
            i++;
        });

        if (end === -1) end = data.length;
        return data.slice(start, end);
    }

    getSlowD() {
        var data = [];

        this.props.stoch.forEach((r) => {
            if (r['Meta Data']['1: Symbol'] === this.state.symbol) {
                for (var i in r['Technical Analysis: STOCH']['series']) {
                    data.push({
                        x: new Date(i),
                        y: parseFloat(r['Technical Analysis: STOCH']['series'][i]['SlowD']),
                    });
                }
            }
        });

        data.sort(function (a, b) {
            return new Date(a.x) - new Date(b.x);
        });

        var start = -1,
            end = -1;
        var i = 0;

        data.forEach((d) => {
            if (start === -1 && this.state.startDate.getTime() <= d.x.getTime()) start = i;
            if (end === -1 && this.state.endDate.getTime() <= d.x.getTime()) end = i;
            i++;
        });

        if (end === -1) end = data.length;

        return data.slice(start, end);
    }

    getHintSection(isHintVisible) {
        if (this.state.indicator !== 'STOCH') {
            return isHintVisible ? (
                <Hint value={this.state.hint}>
                    <div className="card" style={{ opacity: '0.9', color: '#dc3545' }}>
                        <div className="card-body">
                            {this.state.hint.x.toString().substring(0, 16)}
                            <br />
                            {this.state.indicator} : {this.state.hint.y}{' '}
                            {this.state.indicator === 'RSI' ? '%' : null}
                            <br />
                        </div>
                    </div>
                </Hint>
            ) : null;
        } else {
            return isHintVisible ? (
                <Crosshair values={this.state.stochValues}>
                    <div
                        className="card"
                        style={{ opacity: '0.9', color: '#dc3545', width: '140px' }}
                    >
                        <div className="card-body">
                            {this.state.hint.x.toString().substring(0, 16)}
                            <br />
                            <span style={{ color: '#4285f4' }}>SlowK : {this.state.hint.y} %</span>
                            <br />
                            <span style={{ color: '#dc3545' }}>
                                SlowD : {this.state.hintSlowD.y} %
                            </span>
                        </div>
                    </div>
                </Crosshair>
            ) : null;
        }
    }

    mouseOver(datapoint) {
        this.setState({ hint: datapoint, hintHover: true });
    }

    mouseOverSlowD(datapoint) {
        this.setState({ hintSlowD: datapoint });
    }

    mouseOut() {
        if (this.state.indicator === 'STOCH') this.setState({ stochValues: [] });

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
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={this.state.referenceUrl}
                                    >
                                        {' '}
                                        참고자료
                                    </a>
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
                                    <YAxis
                                        title={this.state.yTitle}
                                        tickFormat={(v) => {
                                            if (this.state.indicator === 'OBV') {
                                                return v.toString().substring(0, 4);
                                            } else if (
                                                this.state.indicator === 'RSI' ||
                                                this.state.indicator === 'STOCH'
                                            )
                                                return v + '%';
                                            else return v;
                                        }}
                                    />
                                    {this.state.indicator === 'STOCH' ? (
                                        <LineSeries
                                            data={this.getSlowD()}
                                            className="linemark-series-example"
                                            style={{
                                                strokeWidth: '2px',
                                            }}
                                            stroke="#dc3545"
                                            onNearestX={(datapoint, event) => {
                                                this.mouseOverSlowD(datapoint);
                                            }}
                                        />
                                    ) : null}
                                    <LineSeries
                                        data={this.getData()}
                                        className="linemark-series-example"
                                        style={{
                                            strokeWidth: '2px',
                                        }}
                                        stroke="#4285f4"
                                        onNearestX={(datapoint, event) => {
                                            if (this.state.indicator === 'STOCH') {
                                                var arr = [];
                                                arr.push(datapoint);
                                                this.setState({ stochValues: arr });
                                            }
                                            this.mouseOver(datapoint);
                                        }}
                                    />
                                    {this.state.hintHover && this.state.indicator !== 'STOCH' && (
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