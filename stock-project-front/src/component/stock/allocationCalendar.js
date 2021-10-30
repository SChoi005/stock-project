import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from 'react';
import {
    FlexibleXYPlot,
    VerticalBarSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    LabelSeries,
} from 'react-vis';
import 'react-vis/dist/style.css';

import { PulseLoader } from 'react-spinners';
class AllocationCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            localizer: momentLocalizer(moment),
        };
    }

    getEvents() {
        var events = [];

        this.props.equityOverviews.forEach((i) => {
            const dividendDate = i['DividendDate'];
            events.push({
                title: i['Symbol'],
                allDay: true,
                start: new Date(dividendDate),
                end: new Date(dividendDate),
            });
        });

        return events;
    }

    getData() {
        var data = [
            { x: 'Jan', y: 0, label: '' },
            { x: 'Feb', y: 0, label: '' },
            { x: 'Mar', y: 0, label: '' },
            { x: 'Apr', y: 0, label: '' },
            { x: 'May', y: 0, label: '' },
            { x: 'Jun', y: 0, label: '' },
            { x: 'Jul', y: 0, label: '' },
            { x: 'Aug', y: 0, label: '' },
            { x: 'Sep', y: 0, label: '' },
            { x: 'Oct', y: 0, label: '' },
            { x: 'Nov', y: 0, label: '' },
            { x: 'Dec', y: 0, label: '' },
        ];

        this.props.equityOverviews.forEach((i) => {
            var monthly = [];
            var dividendMonth = [];

            this.props.monthly.forEach((m) => {
                if (m['Meta Data']['2. Symbol'] === i['Symbol']) {
                    monthly = Object.keys(m['Monthly Adjusted Time Series']['series']);
                    monthly.sort(function (a, b) {
                        return new Date(a) - new Date(b);
                    });

                    monthly = monthly.slice(monthly.length - 12, monthly.length);

                    monthly.forEach((d) => {
                        if (
                            m['Monthly Adjusted Time Series']['series'][d]['7. dividend amount'] !==
                            '0.0000'
                        )
                            dividendMonth.push(d);
                    });
                }
            });
            
            this.props.stocks.forEach((s) => {
                if (s['symbol'] === i['Symbol']) {
                    var divMonth = new Date(i['DividendDate']).getMonth();
                    if(dividendMonth.length === 12){
                        data[0].y +=((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *0.86;
                        data[1].y +=((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *0.86;
                        data[2].y +=((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *0.86;
                        data[3].y +=((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *0.86;
                        data[4].y +=((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *0.86;
                        data[5].y +=((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *0.86;
                        data[6].y +=((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *0.86;
                        data[7].y +=((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *0.86;
                        data[8].y +=((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *0.86;
                        data[9].y +=((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *0.86;
                        data[10].y +=((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *0.86;
                        data[11].y +=((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *0.86;
                    }
                    
                    //Quarter
                    if (dividendMonth.length === 4) {
                        if (divMonth === 0 || divMonth === 3 || divMonth === 6 || divMonth === 9) {
                            data[0].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[3].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[6].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[9].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                        }
                        if (divMonth === 1 || divMonth === 4 || divMonth === 7 || divMonth === 10) {
                            data[1].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[4].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[7].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[10].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                        }
                        if (divMonth === 2 || divMonth === 5 || divMonth === 8 || divMonth === 11) {
                            data[2].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[5].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[8].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[11].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                        }
                    }

                    //Semi-Annual
                    if (dividendMonth.length === 2) {
                        if (divMonth === 0 || divMonth === 6) {
                            data[0].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[6].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                        }
                        if (divMonth === 1 || divMonth === 7) {
                            data[1].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[7].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                        }
                        if (divMonth === 2 || divMonth === 8) {
                            data[2].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[8].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                        }
                        if (divMonth === 3 || divMonth === 9) {
                            data[3].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[9].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                        }
                        if (divMonth === 4 || divMonth === 10) {
                            data[4].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[10].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                        }
                        if (divMonth === 5 || divMonth === 11) {
                            data[5].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                            data[11].y +=
                                ((i['DividendPerShare'] * s['quantity']) / dividendMonth.length) *
                                0.86;
                        }
                    }

                    //Annual
                    if (dividendMonth.length === 1) {
                        data[new Date(i['DividendDate']).getMonth()].y +=
                            i['DividendPerShare'] * s['quantity'] * 0.86;
                    }
                }
            });
        });
        
        data.forEach((d) => {
            d.label = '$' + d.y.toFixed(1);
        });

        return data;
    }

    render() {
        const BarSeries = VerticalBarSeries;

        return (
            <div className="col-12 col-lg-5 col-xl-5">
                {!this.props.isLoading ? (
                    <div className="h-100 card">
                        <div className="card-header">
                            <h2 className="card-heading">
                                📅배당 캘린더
                                <br />
                                <span className="sub-title">
                                    # ETF의 배당캘린더는 현재 준비중입니다.
                                </span>
                            </h2>
                        </div>
                        <div className="card-body">
                            <Calendar
                                className="mb-3"
                                localizer={this.state.localizer}
                                events={this.getEvents()}
                                views={['month']}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 400 }}
                            />
                            <FlexibleXYPlot
                                className="clustered-stacked-bar-chart-example"
                                xType="ordinal"
                                stackBy="y"
                                height={150}
                            >
                                <VerticalGridLines />
                                <HorizontalGridLines />
                                <XAxis />
                                <YAxis
                                    tickFormat={(v) => {
                                        return '$' + v;
                                    }}
                                />
                                <LabelSeries
                                    data={this.getData()}
                                    labelAnchorX="middle"
                                    labelAnchorY="text-middle"
                                    style={{ fontSize: '11px', fontWeight : 'bold' }}
                                />
                                <BarSeries color="#4285f4" data={this.getData()} />
                            </FlexibleXYPlot>
                        </div>
                    </div>
                ) : (
                    <div className="empty-component">
                        <div className="h-100 card">
                            <div className="card-header">
                                <h2 className="card-heading">📅배당 캘린더</h2>
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

export default AllocationCalendar;