import React, { Component } from 'react';
import axios from 'axios';
import PieGraph from './stock/pieGraph';
import StockBalanceStatus from './stock/stockBalanceStatus';
import News from './stock/news';
import Chart from './stock/chart';
import Indicator from './stock/indicator';
import AllocationCalendar from './stock/allocationCalendar';
import { Button, Modal, Collapse, Dropdown, DropdownButton } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import PortfolioService from '../service/portfolioService';
import StockService from '../service/stockService';
import OpenApiService from '../service/openApiService';
import { BarLoader } from 'react-spinners';

class Main extends Component {
    constructor(props) {
        super(props);
        this.createPortfolio = this.createPortfolio.bind(this);
        this.removePortfolio = this.removePortfolio.bind(this);
        this.updatePortfolio = this.updatePortfolio.bind(this);
        this.searchStock = this.searchStock.bind(this);
        this.createStock = this.createStock.bind(this);
        this.removeStock = this.removeStock.bind(this);
        this.updateStock = this.updateStock.bind(this);
        this.state = {
            createShowHide: false,
            deleteShowHide: false,
            stockShowHide: false,
            isOpenStock: false,
            isRename: false,
            exchangeRate: '',
            portfolioName: '',
            averagePrice: '',
            quantity: '',
            ownAveragePrice: '',
            ownQuantity: '',
            keywords: '',
            stocks: [],
            searchStocks: [],
            searchMessage: '',
            currentUser: {
                portfolios: [],
            },
            selectedPortfolio: {},
            selectedStocks: {},
            postPortfolioErrorMessage: '',
            postPortfolioCheck: false,
            portfolioUpdateName: '',
            portfolioUpdateCheck: false,
            portfolioUpdateErrorMessage: '',
            deletePortfolioErrorMessage: '',
            stockErrorMessage: '',
            ownStockErrorMessage: '',
            disabled: false,
            overviews: [],
            endPoints: [],
            endPointLoading: false,
            overviewLoading: false,
            exchangeLoading: true,
            news: [],
            newsLoading: false,
            timeSeriesMonthly: [],
            timeSeriesWeekly: [],
            timeSeriesDaily: [],
            timeSeriesMonthlyLoading: false,
            timeSeriesWeeklyLoading: false,
            timeSeriesDailyLoading: false,
            rsi: [],
            rsiLoading: false,
            cci: [],
            cciLoading: false,
            stoch: [],
            stochLoading: false,
            obv: [],
            obvLoading: false,
        };
    }

    componentDidMount() {
        this.getUser();
        OpenApiService.getExchangeRate().then((res) => {
            this.setState({
                exchangeRate: res.data['Realtime Currency Exchange Rate'],
                exchangeLoading: false,
            });
        });
    }

    dollarString(str, a) {
        return (
            str.substring(0, str.length - a - 1).replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
            str.substring(str.length - a - 1, str.length)
        );
    }
    
    async getUser() {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const data = await axios
            .get('/api/user/' + token, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                return res.data;
            })
            .catch(() => {
                localStorage.removeItem('user');
                window.location.reload();
            });

        this.setState({ currentUser: data });
    }

    /*ModalShowHide*/
    handleCreateModalShowHide() {
        this.setState({ createShowHide: !this.state.createShowHide });
    }

    handleDeleteModalShowHide() {
        this.setState({ deleteShowHide: !this.state.deleteShowHide });
    }

    handleStockModalShowHide() {
        this.setState({ stockShowHide: !this.state.stockShowHide });
    }

    /*toggle*/
    toggleStock(item) {
        var map = this.state.searchStocks;
        var value = map.get(item['item']['1. symbol']);

        if (value) {
            map.set(item['item']['1. symbol'], false);
        } else {
            this.state.stocks.forEach((i) => {
                map.set(i['1. symbol'], false);
            });
            map.set(item['item']['1. symbol'], true);
        }
        this.setState({
            searchStocks: map,
            averagePrice: '',
            quantity: '',
            stockErrorMessage: '',
        });
    }

    valueToggleStock(item) {
        var map = this.state.searchStocks;

        if (JSON.stringify(map) === '[]') return false;
        else {
            return map.get(item['item']['1. symbol']);
        }
    }

    toggleMyStock(item) {
        var map = this.state.selectedStocks;
        var value = map.get(item['item']['symbol']);

        if (value) {
            map.set(item['item']['symbol'], false);
        } else {
            this.state.selectedPortfolio.stocks.forEach((i) => {
                map.set(i['symbol'], false);
            });
            map.set(item['item']['symbol'], true);
        }
        map.set(item['item']['symbol'], !value);
        this.setState({
            selectedStocks: map,
            ownAveragePrice: '',
            ownQuantity: '',
            ownStockErrorMessage: '',
        });
    }

    valueToggleMyStock(item) {
        var map = this.state.selectedStocks;
        return map.get(item['item']['symbol']);
    }

    /*portfolio*/
    selectPortfolio(e, item) {
        e.preventDefault();
        this.setState({
            overviewLoading: true,
            endPointLoading: true,
            newsLoading: true,
            timeSeriesMonthlyLoading: true,
            timeSeriesWeeklyLoading: true,
            timeSeriesDailyLoading: true,
            rsiLoading: true,
            cciLoading: true,
            stochLoading: true,
            obvLoading: true,
        });

        var tempOverview = [];
        var tempEndPoint = [];
        var tempNews = [];
        var tempTimeSeriesMonthly = [];
        var tempTimeSeriesWeekly = [];
        var tempTimeSeriesDaily = [];
        var tempRSI = [];
        var tempCCI = [];
        var tempSTOCH = [];
        var tempOBV = [];
        if (JSON.stringify(item) !== '{}') {
            var map = new Map();
            item.stocks.forEach((i) => {
                map.set(i['symbol'], false);
                if (i['type'] !== 'ETF') {
                    tempOverview.push(OpenApiService.getStockOverview(i['symbol']));
                } else {
                    // etf 가능하면 작성
                }
                tempNews.push(OpenApiService.searchNews(i['name']));
                tempEndPoint.push(OpenApiService.getQuoteEndpoint(i['symbol']));
                tempTimeSeriesMonthly.push(
                    OpenApiService.getTimeSeries('TIME_SERIES_MONTHLY_ADJUSTED', i['symbol'])
                );
                tempTimeSeriesWeekly.push(
                    OpenApiService.getTimeSeries('TIME_SERIES_WEEKLY_ADJUSTED', i['symbol'])
                );
                tempTimeSeriesDaily.push(
                    OpenApiService.getTimeSeries('TIME_SERIES_DAILY_ADJUSTED', i['symbol'])
                );
                tempRSI.push(OpenApiService.getRSI(i['symbol']));
                tempCCI.push(OpenApiService.getCCI(i['symbol']));
                tempSTOCH.push(OpenApiService.getSTOCH(i['symbol']));
                tempOBV.push(OpenApiService.getOBV(i['symbol']));
            });
            this.setState({ selectedStocks: map, selectedPortfolio: item });
        } else {
            this.setState({ selectedStocks: {}, selectedPortfolio: item });
        }

        Promise.all(tempEndPoint).then((res) => {
            var arr = [];
            res.forEach((i) => {
                arr.push(i.data);
            });
            this.setState({ endPoints: arr, endPointLoading: false });
        });
        Promise.all(tempOverview).then((res) => {
            var arr = [];
            res.forEach((i) => {
                arr.push(i.data);
            });
            this.setState({ overviews: arr, overviewLoading: false });
        });

        Promise.all(tempNews).then((res) => {
            var arr = [];
            res.forEach((i) => {
                arr.push(i.data);
            });

            this.setState({ news: arr, newsLoading: false });
        });

        Promise.all(tempTimeSeriesMonthly).then((res) => {
            var arr = [];
            res.forEach((i) => {
                arr.push(i.data);
            });

            this.setState({ timeSeriesMonthly: arr, timeSeriesMonthlyLoading: false });
        });

        Promise.all(tempTimeSeriesWeekly).then((res) => {
            var arr = [];
            res.forEach((i) => {
                arr.push(i.data);
            });

            this.setState({ timeSeriesWeekly: arr, timeSeriesWeeklyLoading: false });
        });

        Promise.all(tempTimeSeriesDaily).then((res) => {
            var arr = [];
            res.forEach((i) => {
                arr.push(i.data);
            });
            this.setState({ timeSeriesDaily: arr, timeSeriesDailyLoading: false });
        });

        Promise.all(tempRSI).then((res) => {
            var arr = [];
            res.forEach((i) => {
                arr.push(i.data);
            });
            this.setState({ rsi: arr, rsiLoading: false });
        });

        Promise.all(tempCCI).then((res) => {
            var arr = [];
            res.forEach((i) => {
                arr.push(i.data);
            });
            this.setState({ cci: arr, cciLoading: false });
        });
        Promise.all(tempSTOCH).then((res) => {
            var arr = [];
            res.forEach((i) => {
                arr.push(i.data);
            });
            this.setState({ stoch: arr, stochLoading: false });
        });
        Promise.all(tempOBV).then((res) => {
            var arr = [];
            res.forEach((i) => {
                arr.push(i.data);
            });
            this.setState({ obv: arr, obvLoading: false });
        });
    }

    createPortfolio(e) {
        e.preventDefault();
        if (this.state.postPortfolioCheck) {
            this.setState({ disabled: true });
            PortfolioService.postPortfolio(this.state.portfolioName, this.state.currentUser.id)
                .then(() => {
                    // 모달끄고
                    this.handleCreateModalShowHide();
                    this.getUser().then(() => {
                        this.state.currentUser.portfolios.forEach((i) => {
                            if (i['name'] === this.state.portfolioName) {
                                this.setState({
                                    selectedPortfolio: i,
                                    selectedStocks: new Map(),
                                    isOpen: false,
                                    disabled: false,
                                });
                            }
                        });
                        // 초기화
                        this.emptyPortfolioName();
                    });
                })
                .catch((error) => {
                    console.log(error.message);
                    this.setState({
                        postPortfolioErrorMessage: '중복된 포트폴리오 이름입니다.',
                        disabled: false,
                    });
                });
        }
    }

    removePortfolio(e) {
        e.preventDefault();
        if (this.state.portfolioName === this.state.selectedPortfolio.name) {
            this.setState({ disabled: true });
            PortfolioService.deletePortfolio(this.state.selectedPortfolio.id)
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error.message);
                    this.setState({ disabled: false });
                });
        } else {
            this.setState({ deletePortfolioErrorMessage: '해당 포트폴리오와 이름이 다릅니다.' });
        }
    }

    updatePortfolio(e) {
        e.preventDefault();

        if (this.state.portfolioUpdateCheck) {
            this.setState({ disabled: true });
            PortfolioService.putPortfolio(
                this.state.selectedPortfolio.id,
                this.state.portfolioUpdateName.trim(),
                this.state.currentUser.id
            )
                .then(() => {
                    this.getUser().then(() => {
                        this.state.currentUser.portfolios.forEach((item) => {
                            if (item['name'] === this.state.portfolioUpdateName.trim()) {
                                var map = new Map();
                                item.stocks.forEach((i) => {
                                    map.set(i['symbol'], false);
                                });
                                this.setState({
                                    selectedPortfolio: item,
                                    selectedStocks: map,
                                    portfolioUpdateName: '',
                                    isRename: false,
                                    disabled: false,
                                });
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ disabled: false });
                });
        }
    }

    emptyPortfolioName() {
        this.setState({
            portfolioName: '',
            postPortfolioErrorMessage: '',
            deletePortfolioErrorMessage: '',
        });
    }

    /*stock*/
    searchStock(e) {
        e.preventDefault();
        this.setState({ disabled: true });
        OpenApiService.searchSymbolSearch(this.state.keywords)
            .then((res) => {
                if (JSON.stringify(res.data) === '[]')
                    this.setState({ searchMessage: '검색결과가 없습니다.' });
                else this.setState({ searchMessage: '' });
                this.setState({ stocks: res.data });
            })
            .then(() => {
                const map = new Map();
                this.state.stocks.forEach((item) => {
                    map.set(item['1. symbol'], false);
                });
                this.setState({
                    searchStocks: map,
                    disabled: false,
                });
            })
            .catch((error) => {
                this.setState({
                    searchMessage: '검색어를 입력해주십시오.',
                    searchStocks: [],
                    disabled: false,
                });
            });
    }

    createStock(e, item) {
        e.preventDefault();

        this.setState({
            endPointLoading: true,
            overviewLoading: true,
            newsLoading: true,
            timeSeriesDailyLoading: true,
            timeSeriesWeeklyLoading: true,
            timeSeriesMonthlyLoading: true,
            rsiLoading: true,
            cciLoading: true,
            stochLoading: true,
            obvLoading: true,
        });

        if (this.state.averagePrice <= 0 || this.state.quantity <= 0) {
            this.setState({
                averagePrice: '',
                quantity: '',
                stockErrorMessage: '형식이 맞지않습니다.',
                endPointLoading: false,
                overviewLoading: false,
                newsLoading: false,
                timeSeriesDailyLoading: false,
                timeSeriesWeeklyLoading: false,
                timeSeriesMonthlyLoading: false,
                rsiLoading: false,
                cciLoading: false,
                stochLoading: false,
                obvLoading: false,
            });
            return '';
        }

        var check = false;

        this.state.selectedPortfolio.stocks.forEach((stock) => {
            if (stock['symbol'] === item['item']['1. symbol']) {
                StockService.putAdditionPurchaseStock(
                    item,
                    stock,
                    this.state.averagePrice,
                    this.state.quantity,
                    this.state.selectedPortfolio.id
                )
                    .then(() => {
                        this.getUser().then(() => {
                            const name = this.state.selectedPortfolio.name;
                            var m = this.state.searchStocks;
                            m.set(item['item']['1. symbol'], false);
                            this.state.currentUser.portfolios.forEach((i) => {
                                if (i['name'] === name) {
                                    var map = new Map();
                                    var tempOverview = [];
                                    i.stocks.forEach((s) => {
                                        map.set(s['symbol'], false);
                                        if (s['type'] !== 'ETF')
                                            tempOverview.push(
                                                OpenApiService.getStockOverview(s['symbol'])
                                            );
                                        else {
                                            // etf 가능하면 작성
                                        }
                                    });
                                    Promise.all(tempOverview).then((res) => {
                                        var arr = [];
                                        res.forEach((i) => {
                                            arr.push(i.data);
                                        });
                                        this.setState({
                                            selectedPortfolio: i,
                                            selectedStocks: map,
                                            searchStocks: m,
                                            overviews: arr,
                                            endPointLoading: false,
                                            overviewLoading: false,
                                            newsLoading: false,
                                            timeSeriesDailyLoading: false,
                                            timeSeriesWeeklyLoading: false,
                                            timeSeriesMonthlyLoading: false,
                                            rsiLoading: false,
                                            cciLoading: false,
                                            stochLoading: false,
                                            obvLoading: false,
                                        });
                                    });
                                }
                            });
                        });
                    })
                    .catch((error) => {
                        console.log(error.message);
                        this.setState({
                            stockErrorMessage: '형식이 맞지않습니다.',
                            endPointLoading: false,
                            overviewLoading: false,
                            newsLoading: false,
                            timeSeriesDailyLoading: false,
                            timeSeriesWeeklyLoading: false,
                            timeSeriesMonthlyLoading: false,
                            rsiLoading: false,
                            cciLoading: false,
                            stochLoading: false,
                            obvLoading: false,
                        });
                    });

                this.setState({ averagePrice: '', quantity: '' });
                check = true;
                return '';
            }
        });

        if (!check) {
            StockService.postStock(
                item,
                this.state.quantity,
                this.state.averagePrice,
                this.state.selectedPortfolio.id
            )
                .then(() => {
                    this.getUser().then(() => {
                        const name = this.state.selectedPortfolio.name;
                        var m = this.state.searchStocks;
                        m.set(item['item']['1. symbol'], false);
                        this.state.currentUser.portfolios.forEach((i) => {
                            if (i['name'] === name) {
                                var map = new Map();
                                var tempOverview = [];
                                var tempEndPoint = [];
                                var tempNews = [];
                                var tempTimeSeriesMonthly = [];
                                var tempTimeSeriesWeekly = [];
                                var tempTimeSeriesDaily = [];
                                var tempRSI = [];
                                var tempCCI = [];
                                var tempSTOCH = [];
                                var tempOBV = [];
                                i.stocks.forEach((s) => {
                                    map.set(s['symbol'], false);
                                    if (s['type'] !== 'ETF')
                                        tempOverview.push(
                                            OpenApiService.getStockOverview(s['symbol'])
                                        );
                                    else {
                                        // etf 가능하면 작성
                                    }
                                    tempEndPoint.push(OpenApiService.getQuoteEndpoint(s['symbol']));
                                    tempNews.push(OpenApiService.searchNews(s['name']));
                                    tempTimeSeriesMonthly.push(
                                        OpenApiService.getTimeSeries(
                                            'TIME_SERIES_MONTHLY_ADJUSTED',
                                            s['symbol']
                                        )
                                    );
                                    tempTimeSeriesWeekly.push(
                                        OpenApiService.getTimeSeries(
                                            'TIME_SERIES_WEEKLY_ADJUSTED',
                                            s['symbol']
                                        )
                                    );
                                    tempTimeSeriesDaily.push(
                                        OpenApiService.getTimeSeries(
                                            'TIME_SERIES_DAILY_ADJUSTED',
                                            s['symbol']
                                        )
                                    );
                                    tempRSI.push(OpenApiService.getRSI(s['symbol']));
                                    tempCCI.push(OpenApiService.getCCI(s['symbol']));
                                    tempSTOCH.push(OpenApiService.getSTOCH(s['symbol']));
                                    tempOBV.push(OpenApiService.getOBV(s['symbol']));
                                });
                                Promise.all(tempEndPoint).then((res) => {
                                    var arr = [];
                                    res.forEach((i) => {
                                        arr.push(i.data);
                                    });
                                    this.setState({
                                        endPoints: arr,
                                        selectedPortfolio: i,
                                        selectedStocks: map,
                                        searchStocks: m,
                                        endPointLoading: false,
                                    });
                                });
                                Promise.all(tempNews).then((res) => {
                                    var arr = [];
                                    res.forEach((i) => {
                                        arr.push(i.data);
                                    });
                                    this.setState({ news: arr, newsLoading: false });
                                });
                                Promise.all(tempOverview).then((res) => {
                                    var arr = [];
                                    res.forEach((i) => {
                                        arr.push(i.data);
                                    });
                                    this.setState({
                                        overviews: arr,
                                        overviewLoading: false,
                                    });
                                });
                                Promise.all(tempTimeSeriesDaily).then((res) => {
                                    var arr = [];
                                    res.forEach((i) => {
                                        arr.push(i.data);
                                    });
                                    this.setState({
                                        timeSeriesDaily: arr,
                                        timeSeriesDailyLoading: false,
                                    });
                                });
                                Promise.all(tempTimeSeriesWeekly).then((res) => {
                                    var arr = [];
                                    res.forEach((i) => {
                                        arr.push(i.data);
                                    });
                                    this.setState({
                                        timeSeriesWeekly: arr,
                                        timeSeriesWeeklyLoading: false,
                                    });
                                });
                                Promise.all(tempTimeSeriesMonthly).then((res) => {
                                    var arr = [];
                                    res.forEach((i) => {
                                        arr.push(i.data);
                                    });
                                    this.setState({
                                        timeSeriesMonthly: arr,
                                        timeSeriesMonthlyLoading: false,
                                    });
                                });
                                Promise.all(tempRSI).then((res) => {
                                    var arr = [];
                                    res.forEach((i) => {
                                        arr.push(i.data);
                                    });
                                    this.setState({
                                        rsi: arr,
                                        rsiLoading: false,
                                    });
                                });
                                Promise.all(tempCCI).then((res) => {
                                    var arr = [];
                                    res.forEach((i) => {
                                        arr.push(i.data);
                                    });
                                    this.setState({
                                        cci: arr,
                                        cciLoading: false,
                                    });
                                });
                                Promise.all(tempSTOCH).then((res) => {
                                    var arr = [];
                                    res.forEach((i) => {
                                        arr.push(i.data);
                                    });
                                    this.setState({
                                        stoch: arr,
                                        stochLoading: false,
                                    });
                                });
                                Promise.all(tempOBV).then((res) => {
                                    var arr = [];
                                    res.forEach((i) => {
                                        arr.push(i.data);
                                    });
                                    this.setState({
                                        obv: arr,
                                        obvLoading: false,
                                    });
                                });
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log(error.message);
                    this.setState({
                        stockErrorMessage: '형식이 맞지않습니다.',
                        endPointLoading: false,
                        overviewLoading: false,
                        newsLoading: false,
                        timeSeriesDailyLoading: false,
                        timeSeriesWeeklyLoading: false,
                        timeSeriesMonthlyLoading: false,
                        rsiLoading: false,
                        cciLoading: false,
                        stochLoading: false,
                        obvLoading: false,
                    });
                });
            this.setState({ averagePrice: '', quantity: '' });
        }
    }

    removeStock(e, item) {
        e.preventDefault();
        this.setState({
            endPointLoading: true,
            overviewLoading: true,
            newsLoading: true,
            timeSeriesDailyLoading: true,
            timeSeriesWeeklyLoading: true,
            timeSeriesMonthlyLoading: true,
            rsiLoading: true,
            cciLoading: true,
            stochLoading: true,
            obvLoading: true,
        });

        StockService.deleteStock(item)
            .then(() => {
                this.getUser().then(() => {
                    const name = this.state.selectedPortfolio.name;
                    this.state.currentUser.portfolios.forEach((i) => {
                        if (i['name'] === name) {
                            var map = new Map();
                            var tempOverview = [];
                            var tempEndPoint = [];
                            var tempNews = [];
                            var tempTimeSeriesMonthly = [];
                            var tempTimeSeriesWeekly = [];
                            var tempTimeSeriesDaily = [];
                            var tempRSI = [];
                            var tempCCI = [];
                            var tempSTOCH = [];
                            var tempOBV = [];
                            i.stocks.forEach((s) => {
                                map.set(s['symbol'], false);
                                if (s['type'] !== 'ETF')
                                    tempOverview.push(OpenApiService.getStockOverview(s['symbol']));
                                else {
                                    // etf 가능하면 작성
                                }
                                tempEndPoint.push(OpenApiService.getQuoteEndpoint(s['symbol']));
                                tempNews.push(OpenApiService.searchNews(s['name']));
                                tempTimeSeriesMonthly.push(
                                    OpenApiService.getTimeSeries(
                                        'TIME_SERIES_MONTHLY_ADJUSTED',
                                        s['symbol']
                                    )
                                );
                                tempTimeSeriesWeekly.push(
                                    OpenApiService.getTimeSeries(
                                        'TIME_SERIES_WEEKLY_ADJUSTED',
                                        s['symbol']
                                    )
                                );
                                tempTimeSeriesDaily.push(
                                    OpenApiService.getTimeSeries(
                                        'TIME_SERIES_DAILY_ADJUSTED',
                                        s['symbol']
                                    )
                                );
                                tempRSI.push(OpenApiService.getRSI(s['symbol']));
                                tempCCI.push(OpenApiService.getCCI(s['symbol']));
                                tempSTOCH.push(OpenApiService.getSTOCH(s['symbol']));
                                tempOBV.push(OpenApiService.getOBV(s['symbol']));
                            });
                            Promise.all(tempEndPoint).then((res) => {
                                var arr = [];
                                res.forEach((i) => {
                                    arr.push(i.data);
                                });
                                this.setState({
                                    endPoints: arr,
                                    selectedPortfolio: i,
                                    selectedStocks: map,
                                    endPointLoading: false,
                                });
                            });
                            Promise.all(tempNews).then((res) => {
                                var arr = [];
                                res.forEach((i) => {
                                    arr.push(i.data);
                                });
                                this.setState({ news: arr, newsLoading: false });
                            });
                            Promise.all(tempOverview).then((res) => {
                                var arr = [];
                                res.forEach((i) => {
                                    arr.push(i.data);
                                });
                                this.setState({
                                    overviews: arr,
                                    overviewLoading: false,
                                });
                            });
                            Promise.all(tempTimeSeriesDaily).then((res) => {
                                var arr = [];
                                res.forEach((i) => {
                                    arr.push(i.data);
                                });
                                this.setState({
                                    timeSeriesDaily: arr,
                                    timeSeriesDailyLoading: false,
                                });
                            });
                            Promise.all(tempTimeSeriesWeekly).then((res) => {
                                var arr = [];
                                res.forEach((i) => {
                                    arr.push(i.data);
                                });
                                this.setState({
                                    timeSeriesWeekly: arr,
                                    timeSeriesWeeklyLoading: false,
                                });
                            });
                            Promise.all(tempTimeSeriesMonthly).then((res) => {
                                var arr = [];
                                res.forEach((i) => {
                                    arr.push(i.data);
                                });
                                this.setState({
                                    timeSeriesMonthly: arr,
                                    timeSeriesMonthlyLoading: false,
                                });
                            });
                            Promise.all(tempRSI).then((res) => {
                                var arr = [];
                                res.forEach((i) => {
                                    arr.push(i.data);
                                });
                                this.setState({
                                    rsi: arr,
                                    rsiLoading: false,
                                });
                            });
                            Promise.all(tempCCI).then((res) => {
                                var arr = [];
                                res.forEach((i) => {
                                    arr.push(i.data);
                                });
                                this.setState({
                                    cci: arr,
                                    cciLoading: false,
                                });
                            });
                            Promise.all(tempSTOCH).then((res) => {
                                var arr = [];
                                res.forEach((i) => {
                                    arr.push(i.data);
                                });
                                this.setState({
                                    stoch: arr,
                                    stochLoading: false,
                                });
                            });
                            Promise.all(tempOBV).then((res) => {
                                var arr = [];
                                res.forEach((i) => {
                                    arr.push(i.data);
                                });
                                this.setState({
                                    obv: arr,
                                    obvLoading: false,
                                });
                            });
                        }
                    });
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    updateStock(e, item) {
        e.preventDefault();
        this.setState({ disabled: true });

        if (this.state.ownQuantity <= 0 || this.state.ownAveragePrice <= 0) {
            this.setState({
                ownAveragePrice: '',
                ownQuantity: '',
                ownStockErrorMessage: '형식이 맞지 않습니다.',
                disabled: false,
            });
            return '';
        }

        StockService.putStock(
            item,
            this.state.ownQuantity,
            this.state.ownAveragePrice,
            this.state.selectedPortfolio.id
        )
            .then(() => {
                this.getUser().then(() => {
                    const name = this.state.selectedPortfolio.name;
                    this.state.currentUser.portfolios.forEach((i) => {
                        if (i['name'] === name) {
                            var map = new Map();
                            var temp = [];
                            i.stocks.forEach((s) => {
                                map.set(s['symbol'], false);
                                if (s['type'] !== 'ETF')
                                    temp.push(OpenApiService.getStockOverview(s['symbol']));
                                else {
                                    // etf 가능하면 작성
                                }
                            });
                            Promise.all(temp).then((res) => {
                                var arr = [];
                                res.forEach((i) => {
                                    arr.push(i.data);
                                });
                                this.setState({
                                    selectedPortfolio: i,
                                    selectedStocks: map,
                                    overviews: arr,
                                    disabled: false,
                                });
                            });
                        }
                    });
                });
            })
            .catch((error) => {
                this.setState({
                    ownStockErrorMessage: '형식이 맞지 않습니다.',
                    disabled: false,
                });
            });
    }

    render() {
        // console.log(JSON.stringify(this.state.currentUser, null, 2));
        //console.log(JSON.stringify(this.state.selectedPortfolio, null, 2));
        
        if(!localStorage.getItem('user')){
            window.location.reload('/');
        }
        
        const isEmpty = (item) => {
            return Object.keys(item).length;
        };

        var loading =
            this.state.disabled ||
            this.state.endPointLoading ||
            this.state.overviewLoading ||
            this.state.newsLoading ||
            this.state.timeSeriesDailyLoading ||
            this.state.timeSeriesWeeklyLoading ||
            this.state.timeSeriesMonthlyLoading ||
            this.state.rsiLoading ||
            this.state.cciLoading ||
            this.state.stochLoading ||
            this.state.obvLoading;
        // console.log(JSON.stringify(this.state.searchStocks));
        // console.log(this.state.selectedStocks);
        return (
            <div className="container">
                <div className="col-12 col-md-5 col-lg-5 col-xl-4">
                    <div className="h-100 card">
                        <div className="card-body">
                            <div>
                                <DropdownButton id="dropdown-basic-button" title="">
                                    {this.state.currentUser.portfolios.map((item) => {
                                        return (
                                            <Dropdown.Item
                                                href="/"
                                                onClick={(event) => {
                                                    this.selectPortfolio(event, item);
                                                }}
                                                role="button"
                                                key={item.name}
                                                disabled={loading}
                                            >
                                                {item.name}
                                            </Dropdown.Item>
                                        );
                                    })}
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        href="/"
                                        onClick={(event) => this.selectPortfolio(event, {})}
                                        disabled={loading}
                                    >
                                        Select Portfolio!
                                    </Dropdown.Item>
                                </DropdownButton>
                                {isEmpty(this.state.selectedPortfolio) !== 0 ? (
                                    <div>
                                        {this.state.isRename ? (
                                            <div style={{ marginLeft: '40px' }}>
                                                <Form
                                                    onSubmit={this.updatePortfolio}
                                                    ref={(c) => {
                                                        this.form = c;
                                                    }}
                                                    className="input-group"
                                                >
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="portfolioName"
                                                        value={this.state.portfolioUpdateName}
                                                        placeholder={
                                                            this.state.selectedPortfolio.name
                                                        }
                                                        onChange={(e) => {
                                                            if (e.target.value.trim().length > 0) {
                                                                if (
                                                                    e.target.value ===
                                                                    this.state.selectedPortfolio
                                                                        .name
                                                                )
                                                                    this.setState({
                                                                        portfolioUpdateCheck: false,
                                                                        portfolioUpdateErrorMessage:
                                                                            '동일한 이름 입니다.',
                                                                    });
                                                                else {
                                                                    this.setState({
                                                                        portfolioUpdateCheck: true,
                                                                        portfolioUpdateErrorMessage:
                                                                            '',
                                                                    });
                                                                }
                                                            } else
                                                                this.setState({
                                                                    portfolioUpdateCheck: false,
                                                                    portfolioUpdateErrorMessage:
                                                                        '포트폴리오 이름을 입력해주십시오',
                                                                });
                                                            this.setState({
                                                                portfolioUpdateName: e.target.value,
                                                            });
                                                        }}
                                                        disabled={loading}
                                                    />
                                                    <Button
                                                        variant="secondary"
                                                        type="submit"
                                                        disabled={loading}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            className="bi bi-check-square"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                            <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                                                        </svg>
                                                    </Button>
                                                </Form>
                                                <div className="validation">
                                                    {this.state.portfolioUpdateErrorMessage}
                                                </div>
                                            </div>
                                        ) : (
                                            <h2
                                                style={{ marginLeft: '40px' }}
                                                className="card-heading text-truncate"
                                            >
                                                {this.state.selectedPortfolio.name}
                                            </h2>
                                        )}
                                        <div className="btn-group btn-menu">
                                            <Button
                                                variant="outline-primary"
                                                onClick={() => {
                                                    if (this.state.isRename)
                                                        this.setState({
                                                            portfolioUpdateName: '',
                                                            portfolioUpdateErrorMessage: '',
                                                        });
                                                    this.setState({
                                                        isRename: !this.state.isRename,
                                                    });
                                                }}
                                                disabled={loading}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-pencil-square"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                                    />
                                                </svg>
                                            </Button>
                                            <Button
                                                variant="outline-primary"
                                                onClick={() => this.handleStockModalShowHide()}
                                                disabled={loading}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-currency-dollar"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                                                </svg>
                                            </Button>
                                            <Button
                                                variant="outline-primary"
                                                onClick={() => this.handleDeleteModalShowHide()}
                                                disabled={loading}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-x-square"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                            </Button>
                                            <Button
                                                variant="outline-primary"
                                                onClick={() => this.handleCreateModalShowHide()}
                                                disabled={loading}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-plus-square"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="btn-menu">
                                        <h2 style={{ marginLeft: '40px' }} className="card-heading">
                                            Select Portfolio!
                                        </h2>
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => this.handleCreateModalShowHide()}
                                            disabled={loading}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-plus-square"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                            </svg>
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div style={{ clear: 'both' }}></div>
                        </div>
                    </div>
                </div>

                {/* Stock Component*/}
                {JSON.stringify(this.state.selectedPortfolio) !== '{}' &&
                JSON.stringify(this.state.selectedPortfolio.stocks) !== '[]' ? (
                    <div>
                        <div className="row">
                            <PieGraph
                                stocks={this.state.selectedPortfolio.stocks}
                                equityOverviews={this.state.overviews}
                                endPoints={this.state.endPoints}
                                isLoading={this.state.overviewLoading || this.state.endPointLoading}
                            />
                            <StockBalanceStatus
                                stocks={this.state.selectedPortfolio.stocks}
                                exchangeRate={this.state.exchangeRate}
                                endPoints={this.state.endPoints}
                                isLoading={this.state.endPointLoading || this.state.exchangeLoading}
                            />
                        </div>
                        <div className="row">
                            <Chart
                                portfolio={this.state.selectedPortfolio}
                                monthly={this.state.timeSeriesMonthly}
                                weekly={this.state.timeSeriesWeekly}
                                daily={this.state.timeSeriesDaily}
                                isLoading={
                                    this.state.timeSeriesMonthlyLoading ||
                                    this.state.timeSeriesWeeklyLoading ||
                                    this.state.timeSeriesDailyLoading
                                }
                            />
                            <Indicator
                                isLoading={
                                    this.state.rsiLoading ||
                                    this.state.cciLoading ||
                                    this.state.stochLoading ||
                                    this.state.obvLoading
                                }
                                rsi={this.state.rsi}
                                cci={this.state.cci}
                                stoch={this.state.stoch}
                                obv={this.state.obv}
                                stocks={this.state.selectedPortfolio.stocks}
                            />
                        </div>
                        <div className="row">
                            <AllocationCalendar
                                stocks={this.state.selectedPortfolio.stocks}
                                monthly={this.state.timeSeriesMonthly}
                                equityOverviews={this.state.overviews}
                                isLoading={
                                    this.state.overviewLoading ||
                                    this.state.timeSeriesMonthlyLoading
                                }
                            />
                            <News news={this.state.news} isLoading={this.state.newsLoading} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="row empty-component">
                            <div className="col-12 col-lg-5 col-xl-5">
                                <div className="h-100 card">
                                    <div className="card-header">
                                        <h2 className="card-heading">📊포트폴리오 구성</h2>
                                    </div>
                                    <div className="card-body"></div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-7 col-xl-7">
                                <div className="h-100 card">
                                    <div className="card-header">
                                        <h2 className="card-heading">💰주식잔고 현황</h2>
                                    </div>
                                    <div className="card-body"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-6 col-xl-6">
                                <div className="h-100 card">
                                    <div className="card-header">
                                        <h2 className="card-heading">📈보유주식 차트</h2>
                                    </div>
                                    <div className="card-body"></div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 col-xl-6">
                                <div className="h-100 card">
                                    <div className="card-header">
                                        <h2 className="card-heading">🛠️기술 지표</h2>
                                    </div>
                                    <div className="card-body"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-5 col-xl-5">
                                <div className="h-100 card">
                                    <div className="card-header">
                                        <h2 className="card-heading">📅배당 캘린더</h2>
                                    </div>
                                    <div className="card-body"></div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-7 col-xl-7">
                                <div className="h-100 card">
                                    <div className="card-header">
                                        <h2 className="card-heading">📰나만의 뉴스</h2>
                                    </div>
                                    <div className="card-body"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/*Portfolio Delete Modal*/}
                <Modal show={this.state.deleteShowHide}>
                    <Modal.Header>
                        <Modal.Title>⚠️포트폴리오 삭제</Modal.Title>
                    </Modal.Header>
                    {this.state.disabled ? (
                        <BarLoader width="100%" color="#4285f4" />
                    ) : (
                        <BarLoader width="100%" color="#fff" />
                    )}
                    <Form
                        onSubmit={this.removePortfolio}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <Modal.Body>
                            <div className="mb-2">삭제할 포트폴리오를 입력해주십시오.</div>
                            <div className="form-group form-floating mb-3">
                                <input
                                    id="floatingInput"
                                    className="form-control"
                                    type="text"
                                    name="portfolioName"
                                    value={this.state.portfolioName}
                                    onChange={(e) =>
                                        this.setState({ portfolioName: e.target.value })
                                    }
                                    placeholder={this.state.selectedPortfolio.name}
                                    disabled={this.state.disabled}
                                />
                                <label htmlFor="floatingInput">
                                    {this.state.selectedPortfolio.name}
                                </label>
                            </div>
                            <div className="validation">
                                {this.state.deletePortfolioErrorMessage}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" disabled={this.state.disabled}>
                                삭제
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    this.handleDeleteModalShowHide();
                                    this.emptyPortfolioName();
                                }}
                            >
                                닫기
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                {/*Portfolio Create Modal*/}
                <Modal show={this.state.createShowHide}>
                    <Modal.Header>
                        <Modal.Title>💡포트폴리오 추가</Modal.Title>
                    </Modal.Header>
                    {this.state.disabled ? (
                        <BarLoader width="100%" color="#4285f4" />
                    ) : (
                        <BarLoader width="100%" color="#fff" />
                    )}
                    <Form
                        onSubmit={this.createPortfolio}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <Modal.Body>
                            <div className="mb-2">생성할 포트폴리오 이름을 입력하십시오.</div>
                            <div className="form-group form-floating mb-3">
                                <input
                                    id="floatingInput"
                                    placeholder="Portfolio Name"
                                    className="form-control"
                                    type="text"
                                    name="portfolioName"
                                    value={this.state.portfolioName}
                                    onChange={(e) => {
                                        if (e.target.value.length > 0)
                                            this.setState({
                                                postPortfolioErrorMessage: '',
                                                postPortfolioCheck: true,
                                            });
                                        else
                                            this.setState({
                                                postPortfolioErrorMessage:
                                                    '포트폴리오 이름을 입력해주십시오',
                                                postPortfolioCheck: false,
                                            });
                                        this.setState({ portfolioName: e.target.value });
                                    }}
                                    disabled={this.state.disabled}
                                />
                                <label htmlFor="floatingInput">Portfolio Name</label>
                            </div>
                            <div className="validation">{this.state.postPortfolioErrorMessage}</div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" disabled={this.state.disabled}>
                                추가
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    this.handleCreateModalShowHide();
                                    this.emptyPortfolioName();
                                }}
                            >
                                닫기
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                {/*Stock Modal*/}
                <Modal show={this.state.stockShowHide} scrollable={true}>
                    <Modal.Header>
                        <Modal.Title className="card-heading">💸주식 추가/삭제</Modal.Title>
                    </Modal.Header>
                    {this.state.disabled ? (
                        <BarLoader width="100%" color="#4285f4" />
                    ) : (
                        <BarLoader width="100%" color="#fff" />
                    )}
                    <Modal.Body>
                        <Form
                            className="input-group"
                            onSubmit={(event) => {
                                this.searchStock(event);
                            }}
                            ref={(c) => {
                                this.form = c;
                            }}
                        >
                            <input
                                className="form-control"
                                type="text"
                                name="stockName"
                                placeholder="Search Stock (미국상장 주식만 가능)"
                                value={this.state.keywords}
                                onChange={(e) => this.setState({ keywords: e.target.value })}
                                disabled={loading}
                            />
                            <Button variant="secondary" type="submit" disabled={loading}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-search"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </Button>
                        </Form>
                        <div className="validation">{this.state.searchMessage}</div>
                        {this.state.stocks.length === 0 ? (
                            <div className="mb-3"></div>
                        ) : (
                            <div className="list-group mb-3">
                                {this.state.stocks.map((item) => {
                                    if (item['4. region'] !== 'United States') return null;
                                    return (
                                        <div key={item['1. symbol']}>
                                            <button
                                                className="list-group-item list-group-item-action"
                                                onClick={() => this.toggleStock({ item })}
                                                aria-controls="collapse-text"
                                                aria-expanded={this.valueToggleStock({ item })}
                                                disabled={loading}
                                            >
                                                <span>{item['1. symbol']}</span>{' '}
                                                <span className="search-company-name">
                                                    ({item['2. name']})
                                                </span>
                                            </button>

                                            <Collapse in={this.valueToggleStock({ item })}>
                                                <div className="list-group-item" id="collapse-text">
                                                    <Form
                                                        onSubmit={(event) =>
                                                            this.createStock(event, { item })
                                                        }
                                                        ref={(c) => {
                                                            this.form = c;
                                                        }}
                                                    >
                                                        <div className="form-group form-floating mb-3">
                                                            <input
                                                                id="floatingAveragePrice"
                                                                className="form-control"
                                                                type="text"
                                                                name="averagePrice"
                                                                placeholder="평균단가"
                                                                value={this.state.averagePrice}
                                                                onChange={(e) =>
                                                                    this.setState({
                                                                        averagePrice: e.target.value.trim(),
                                                                    })
                                                                }
                                                                disabled={loading}
                                                            />
                                                            <label htmlFor="floatingAveragePrice">
                                                                평균단가 ex) 123.5
                                                            </label>
                                                        </div>
                                                        <div className="form-group form-floating mb-3">
                                                            <input
                                                                id="floatingQuantity"
                                                                className="form-control"
                                                                type="text"
                                                                name="quantity"
                                                                placeholder="갯수"
                                                                value={this.state.quantity}
                                                                onChange={(e) =>
                                                                    this.setState({
                                                                        quantity: e.target.value.trim(),
                                                                    })
                                                                }
                                                                disabled={loading}
                                                            />
                                                            <label htmlFor="floatingQuantity">
                                                                갯수 ex) 10
                                                            </label>
                                                        </div>
                                                        <Button type="submit" disabled={loading}>
                                                            매수
                                                        </Button>
                                                        <div className="validation">
                                                            {this.state.stockErrorMessage}
                                                        </div>
                                                    </Form>
                                                </div>
                                            </Collapse>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {isEmpty(this.state.selectedPortfolio) !== 0 ? (
                            <div>
                                <div className="mb-2">💳보유 주식</div>
                                {this.state.selectedPortfolio.stocks.map((item) => {
                                    return (
                                        <div key={item['symbol']} className="list-group-item">
                                            <div>
                                                <div>
                                                    주식명 : {item['name']} ( {item['symbol']} )
                                                </div>
                                                <div>평균단가 : ${this.dollarString(item['average_price'].toFixed(4),4)}</div>
                                                <div>수량 : {item['quantity'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                                <div className="btn-group mb-3">
                                                    <Button
                                                        onClick={() => this.toggleMyStock({ item })}
                                                        aria-controls="collapse-text"
                                                        aria-expanded={this.valueToggleMyStock({
                                                            item,
                                                        })}
                                                        disabled={loading}
                                                    >
                                                        수정
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        onClick={(event) => {
                                                            this.removeStock(event, { item });
                                                        }}
                                                        disabled={loading}
                                                    >
                                                        삭제
                                                    </Button>
                                                </div>
                                            </div>
                                            <Collapse in={this.valueToggleMyStock({ item })}>
                                                <div className="list-group-item" id="collapse-text">
                                                    <Form
                                                        onSubmit={(event) =>
                                                            this.updateStock(event, { item })
                                                        }
                                                        ref={(c) => {
                                                            this.form = c;
                                                        }}
                                                    >
                                                        <div className="form-group form-floating mb-3">
                                                            <input
                                                                id="floatingOwnAveragePrice"
                                                                className="form-control"
                                                                type="text"
                                                                name="averagePrice"
                                                                placeholder="평균단가"
                                                                value={this.state.ownAveragePrice}
                                                                onChange={(e) =>
                                                                    this.setState({
                                                                        ownAveragePrice: e.target.value.trim(),
                                                                    })
                                                                }
                                                                disabled={loading}
                                                            />
                                                            <label htmlFor="floatingOwnAveragePrice">
                                                                평균단가 ex) 123.5
                                                            </label>
                                                        </div>
                                                        <div className="form-group form-floating mb-3">
                                                            <input
                                                                id="floatingOwnQuantity"
                                                                className="form-control"
                                                                type="text"
                                                                name="quantity"
                                                                placeholder="갯수"
                                                                value={this.state.ownQuantity}
                                                                onChange={(e) =>
                                                                    this.setState({
                                                                        ownQuantity: e.target.value.trim(),
                                                                    })
                                                                }
                                                                disabled={loading}
                                                            />
                                                            <label htmlFor="floatingOwnQuantity">
                                                                갯수 ex) 10
                                                            </label>
                                                        </div>
                                                        <Button type="submit" disabled={loading}>
                                                            확인
                                                        </Button>
                                                        <div className="validation">
                                                            {this.state.ownStockErrorMessage}
                                                        </div>
                                                    </Form>
                                                </div>
                                            </Collapse>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                this.handleStockModalShowHide();
                                this.setState({ stocks: [], keywords: '' });
                            }}
                            disabled={loading}
                        >
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Main;