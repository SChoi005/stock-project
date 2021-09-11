import React, { Component } from 'react';
import axios from 'axios';
//import PieGraph from './stock/pieGraph';
import { Button, Modal, Collapse } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

class Main extends Component {
    constructor(props) {
        super(props);
        this.createPortfolio = this.createPortfolio.bind(this);
        this.removePortfolio = this.removePortfolio.bind(this);
        this.updatePortfolio = this.updatePortfolio.bind(this);
        this.searchStock = this.searchStock.bind(this);
        this.createStock = this.createStock.bind(this);
        this.state = {
            createShowHide: false,
            deleteShowHide: false,
            stockShowHide: false,
            isOpen: false,
            isOpenStock: false,
            isRename: false,
            portfolioName: '',
            averagePrice: '',
            quantity:'',
            keywords:'',
            stocks:[],
            currentUser: {
                portfolios: [],
            },
            selectedPortfolio: {},
        };
    }

    componentDidMount() {
        this.getUser();
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

    async postPortfolio() {
        const token = JSON.parse(localStorage.getItem('user')).token;
        await axios({
                method: 'post',
                url: '/api/portfolio',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                data: {
                    id: 0,
                    name: this.state.portfolioName,
                    userid: this.state.currentUser.id,
                },
            })
            .then(() => {
                this.emptyPortfolioName();
                window.location.reload();
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    async deletePortfolio() {
        const token = JSON.parse(localStorage.getItem('user')).token;
        await axios({
                method: 'delete',
                url: '/api/portfolio/' + this.state.selectedPortfolio.id,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            })
            .then(() => {
                this.emptyPortfolioName();
                window.location.reload();
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    async putPortfolio() {
        const token = JSON.parse(localStorage.getItem('user')).token;
        await axios({
                method: 'put',
                url: '/api/portfolio',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                data: {
                    id: this.state.selectedPortfolio.id,
                    name: this.state.portfolioName,
                    userid: this.state.currentUser.id,
                },
            })
            .then(() => {
                this.emptyPortfolioName();
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async searchSymbolSearch(){
        const token = JSON.parse(localStorage.getItem('user')).token;
        await axios({
                method: 'get',
                url: '/api/search/'+this.state.keywords,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
            .then((res)=>{
                this.setState({stocks:res.data});
            })
            .catch((error)=>{console.log('/open-api/search/'+this.state.keywords);});
    }
    
    async postStock(item){
        const token = JSON.parse(localStorage.getItem('user')).token;
        await axios({
                method: 'post',
                url: '/api/stock',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                data: {
                    id:0,
                    symbol:item["item"]["1. symbol"],
                    name:item["item"]["2. name"],
                    type:item["item"]["3. type"],
                    quantity:this.state.quantity,
                    averageprice:this.state.averagePrice,
                    region:item["item"]["4. region"],
                    marketopen:item["item"]["5. marketOpen"],
                    marketclose:item["item"]["6. marketClose"],
                    timezone:item["item"]["7. timezone"],
                    currency:item["item"]["8. currency"],
                    portfolioid:this.state.selectedPortfolio.id,
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
    
    async putAdditionPurchaseStock(item, stock){
        const token = JSON.parse(localStorage.getItem('user')).token;
        
        const updateQuantity = (+this.state.quantity)+(+stock["quantity"]);
        const updateAveragePrice = ((+this.state.averagePrice)*(+this.state.quantity)+(+stock["average_price"])*(+stock["quantity"]))/updateQuantity;
        
        await axios({
                method: 'put',
                url: '/api/stock/addition',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                data: {
                    id:stock["id"],
                    symbol:item["item"]["1. symbol"],
                    name:item["item"]["2. name"],
                    type:item["item"]["3. type"],
                    quantity:updateQuantity,
                    averageprice:updateAveragePrice,
                    region:item["item"]["4. region"],
                    marketopen:item["item"]["5. marketOpen"],
                    marketclose:item["item"]["6. marketClose"],
                    timezone:item["item"]["7. timezone"],
                    currency:item["item"]["8. currency"],
                    portfolioid:this.state.selectedPortfolio.id,
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
    
    handleCreateModalShowHide() {
        this.setState({ createShowHide: !this.state.createShowHide });
    }

    handleDeleteModalShowHide() {
        this.setState({ deleteShowHide: !this.state.deleteShowHide });
    }

    handleStockModalShowHide() {
        this.setState({ stockShowHide: !this.state.stockShowHide });
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }
    
    toggleStock() {
        this.setState({ isOpenStock: !this.state.isOpenStock });
    }

    /*portfolio*/
    selectPortfolio(e, item) {
        e.preventDefault();
        this.setState({ selectedPortfolio: item });
        this.toggle();
    }

    createPortfolio(e) {
        e.preventDefault();
        this.postPortfolio();
    }

    removePortfolio(e) {
        e.preventDefault();
        if (this.state.portfolioName === this.state.selectedPortfolio.name) this.deletePortfolio();
    }

    updatePortfolio(e) {
        e.preventDefault();
        this.putPortfolio();
    }

    emptyPortfolioName() {
        this.setState({ portfolioName: '' });
    }
    
    /*stock*/
    searchStock(e){
        e.preventDefault();
        this.searchSymbolSearch();
    }
    
    createStock(e, item){
        e.preventDefault();
        
        var check = false;
        
        this.state.selectedPortfolio.stocks.forEach((stock)=>{
            console.log(item["item"]["1. symbol"]);
            if(stock["symbol"]===item["item"]["1. symbol"]){
                this.putAdditionPurchaseStock(item, stock).then(()=>{
                    this.setState({averagePrice:'', quantity:''});
                    this.getUser();
                    window.location.reload();
                })
                check = true;
                return "";
            }
        })
        
        if(!check){
            this.postStock(item).then(()=>{
                this.setState({averagePrice:'', quantity:''});
                this.getUser();
                window.location.reload();
            });
        }
    }
    
    render() {
        console.log(JSON.stringify(this.state.currentUser, null, 2));
        console.log(JSON.stringify(this.state.selectedPortfolio, null, 2));
        const isEmpty = (item)=>{return Object.keys(item).length;};
        return (
            <div>
                <div>
                    <Button
                        variant="primary"
                        onClick={() => this.toggle()}
                        aria-controls="collapse-text"
                        aria-expanded={this.state.isOpen}
                    >
                        R
                    </Button>
                    {isEmpty(this.state.selectedPortfolio) !== 0 ? (
                        <div>
                            {this.state.isRename ? (
                                <Form
                                    onSubmit={this.updatePortfolio}
                                    ref={(c) => {
                                        this.form = c;
                                    }}
                                >
                                    <Input
                                        type="text"
                                        name="portfolioName"
                                        value={this.state.portfolioName}
                                        placeholder={this.state.selectedPortfolio.name}
                                        onChange={(e) =>
                                            this.setState({ portfolioName: e.target.value })
                                        }
                                    />
                                </Form>
                            ) : (
                                <h2>{this.state.selectedPortfolio.name}</h2>
                            )}
                            <Button
                                variant="primary"
                                onClick={() => {
                                    this.setState({ isRename: !this.state.isRename });
                                }}
                            >
                                U
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => this.handleDeleteModalShowHide()}
                            >
                                D
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => this.handleStockModalShowHide()}
                            >
                                +
                            </Button>
                        </div>
                    ) : (
                        <h2>Select Portfolio!</h2>
                    )}
                    <Button variant="primary" onClick={() => this.handleCreateModalShowHide()}>
                        +
                    </Button>
                </div>

                {/* folding */}
                <Collapse in={this.state.isOpen}>
                    <div id="collapse-text">
                        {this.state.currentUser.portfolios.map((item) => {
                            return (
                                <li key={item.name}>
                                    <a
                                        href="/"
                                        onClick={(event) => this.selectPortfolio(event, item)}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            );
                        })}
                        <li>
                            <a href="/" onClick={(event) => this.selectPortfolio(event, {})}>
                                default
                            </a>
                        </li>
                    </div>
                </Collapse>

                {/* Stock Component
                <div>
                    <PieGraph></PieGraph>
                    <div>
                        <h2>Component2</h2>
                    </div>
                    <div>
                        <h2>Component3</h2>
                    </div>
                    <div>
                        <h2>Component4</h2>
                    </div>
                </div>
                */}

                {/*Portfolio Delete Modal*/}
                <Modal show={this.state.deleteShowHide}>
                    <Modal.Header>
                        <Modal.Title>포트폴리오 삭제</Modal.Title>
                    </Modal.Header>
                    <Form
                        onSubmit={this.removePortfolio}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <Modal.Body>
                            <label>삭제할 포트폴리오를 입력해주십시오.</label>
                            <Input
                                type="text"
                                name="portfolioName"
                                value={this.state.portfolioName}
                                onChange={(e) => this.setState({ portfolioName: e.target.value })}
                                placeholder={this.state.selectedPortfolio.name}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Delete</Button>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    this.handleDeleteModalShowHide();
                                    this.emptyPortfolioName();
                                }}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                {/*Portfolio Create Modal*/}
                <Modal show={this.state.createShowHide}>
                    <Modal.Header>
                        <Modal.Title>포트폴리오 추가</Modal.Title>
                    </Modal.Header>
                    <Form
                        onSubmit={this.createPortfolio}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <Modal.Body>
                            <label>Portfolio Name</label>
                            <Input
                                type="text"
                                name="portfolioName"
                                value={this.state.portfolioName}
                                onChange={(e) => this.setState({ portfolioName: e.target.value })}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">create</Button>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    this.handleCreateModalShowHide();
                                    this.emptyPortfolioName();
                                }}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                {/*Stock Modal*/}
                <Modal show={this.state.stockShowHide}>
                    <Modal.Header>
                        <Modal.Title>주식 추가/삭제</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            onSubmit={(event)=>{this.searchStock(event)}}
                            ref={(c) => {
                                this.form = c;
                            }}    
                        >
                            <Input
                                type="text"
                                name="stockName"
                                placeholder="Search Stock Name"
                                value={this.state.keywords}
                                onChange={(e) => this.setState({ keywords: e.target.value })}
                            />
                        </Form>
                        
                        {this.state.stocks.length === 0 ?
                            <div></div>
                            :
                            (this.state.stocks.map((item)=>{
                                return (
                                    <div key={item["1. symbol"]}>
                                        <Button
                                            variant="primary"
                                            onClick={() => this.toggleStock()}
                                            aria-controls="collapse-text"
                                            aria-expanded={this.state.isOpenStock}    
                                        >{item["1. symbol"]} ({item["2. name"]})</Button>
                                        
                                        <Collapse in={this.state.isOpenStock}>
                                            <div id="collapse-text">
                                                <Form
                                                    onSubmit={(event)=>this.createStock(event, {item})}
                                                    ref={(c) => {
                                                    this.form = c;
                                                    }}    
                                                >
                                                    <label>평균단가</label>
                                                    <Input
                                                        type="text"
                                                        name="averagePrice"
                                                        placeholder="평균단가"
                                                        value={this.state.averagePrice}
                                                        onChange={(e) => this.setState({ averagePrice: e.target.value })}    
                                                    />
                                                    <label>갯수</label>
                                                    <Input
                                                        type="text"
                                                        name="quantity"
                                                        placeholder="갯수"
                                                        value={this.state.quantity}
                                                        onChange={(e) => this.setState({ quantity: e.target.value })}    
                                                    />
                                                    <Button type="submit">매수</Button>
                                                </Form>
                                            </div>
                                        </Collapse>
                                    </div>
                                );                                
                            }))
                        }
                        
                        <div>
                            <span>보유 주식</span>
                             
                        </div>
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                this.handleStockModalShowHide();
                                this.setState({stocks:[], keywords:''});
                                window.location.reload();
                            }}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Main;