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

class Indicator extends Component {
    constructor(props) {
        super(props);
        this.setSymbol = this.setSymbol.bind(this);
        this.state = {
            symbol:'',
            indicator: 'RSI',
            indicatorDescription:'',
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.stocks !== this.props.stocks) {
            if (this.props.stocks.length !== 0)
                this.setState({
                    symbol: this.props.stocks[0]['symbol'],
                    indicator: 'RSI'
                });
            else this.setState({ symbol: '', indicator: 'RSI'});
        }
    }
    
    componentDidMount(){
        if (this.props.stocks.length!==0)
            this.setState({symbol: this.props.stocks[0]['symbol']})
    }
    
    setIndicator(indicator) {
        // RSI,
        this.setState({ indicator: indicator });
    }
    setSymbol(e, symbol) {
        e.preventDefault();
        this.setState({ symbol: symbol });
    }

    getVariant(indicator) {
        if (this.state.indicator === indicator) return 'primary';
        else return 'secondary';
    }
    
    render() {
        return (
            <div className="col-12 col-lg-6 col-xl-6">
                <div className="h-100 card">
                    <div className="card-header">
                        <h2 className="card-heading">🛠️기술 지표</h2>
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
                            <div>만드는 중입니다..</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Indicator;