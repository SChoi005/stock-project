import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from 'react';
import {
    FlexibleXYPlot,
    BarSeries,
    VerticalBarSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
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
            { x: 'Jan', y: 0 },
            { x: 'Feb', y: 0 },
            { x: 'Mar', y: 0 },
            { x: 'Apr', y: 0 },
            { x: 'May', y: 0 },
            { x: 'Jun', y: 0 },
            { x: 'Jul', y: 0 },
            { x: 'Aug', y: 0 },
            { x: 'Sep', y: 0 },
            { x: 'Oct', y: 0 },
            { x: 'Nov', y: 0 },
            { x: 'Dec', y: 0 },
        ];

        this.props.equityOverviews.forEach((i) => {
            this.props.stocks.forEach((s) => {
                if (s['symbol'] === i['Symbol']) {
                    const date = new Date(i['DividendDate']);
                    const month = date.getMonth();
                    console.log(month);
                    data[month].y += (i['DividendPerShare'] * s['quantity']) / 4;
                }
            });
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
                                        return '$'+v;
                                    }}
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