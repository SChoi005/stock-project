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
        this.removeStock = this.removeStock.bind(this);
        this.updateStock = this.updateStock.bind(this);
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
            ownAveragePrice: '',
            ownQuantity:'',
            keywords:'',
            stocks:[],
            searchStocks:[],
            searchMessage:"",
            currentUser: {
                portfolios: [],
            },
            selectedPortfolio: {},
            selectedStocks:{},
            postPortfolioErrorMessage:"",
            postPortfolioCheck:false,
            portfolioUpdateName:"",
            portfolioUpdateCheck:false,
            portfolioUpdateErrorMessage:"",
            deletePortfolioErrorMessage:"",
            stockErrorMessage:"",
            ownStockErrorMessage:"",
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
                // 모달끄고
                this.handleCreateModalShowHide();
                this.getUser().then(()=>{
                    this.state.currentUser.portfolios.forEach((i)=>{
                        console.log(i["name"]);
                        console.log(this.state.portfolioName);
                        if(i["name"]===this.state.portfolioName){
                            this.setState({
                                selectedPortfolio:i,
                                selectedStocks: new Map(),
                                isOpen : false
                            });
                        }
                    })                
                    // 초기화
                    this.emptyPortfolioName();
                })
            })
            .catch((error) => {
                console.log(error.message);
                this.setState({postPortfolioErrorMessage:"중복된 포트폴리오 이름입니다."});
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
                    name: this.state.portfolioUpdateName.trim(),
                    userid: this.state.currentUser.id,
                },
            })
            .then(() => {
                this.getUser().then(()=>{
                   this.state.currentUser.portfolios.forEach((item)=>{
                       if(item["name"]===this.state.portfolioUpdateName.trim()){
                           var map = new Map();
                           item.stocks.forEach((i)=>{
                               map.set(i["symbol"],false);
                           })
                           this.setState({ 
                               selectedPortfolio:item,
                               selectedStocks:map,
                               portfolioUpdateName: '',
                               isRename:false
                           });
                       }
                   }) 
                });
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
                if(JSON.stringify(res.data)==="[]")
                    this.setState({searchMessage:"검색결과가 없습니다."});
                else
                    this.setState({searchMessage:""});
                this.setState({stocks:res.data});
            })
            .then(()=>{
                const map = new Map();
                this.state.stocks.forEach((item)=>{
                    map.set(item["1. symbol"],false);
                })
                this.setState({searchStocks:map});
            })
            .catch((error)=>{
                this.setState({searchMessage:"검색어를 입력해주십시오."});
                this.setState({searchStocks:[]});
            });
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
            .then(() => {
                this.getUser().then(()=>{
                    const name = this.state.selectedPortfolio.name;
                    this.state.currentUser.portfolios.forEach((i)=>{
                        if(i["name"]===name){
                            var map = new Map();
                            i.stocks.forEach((s)=>{
                                map.set(s["symbol"],false);
                            })
                            this.setState({ 
                                selectedPortfolio:i,
                                selectedStocks:map
                            });
                        }
                    })
                })
            })
            .catch((error) => {
                console.log(error.message);
                this.setState({stockErrorMessage:"형식이 맞지않습니다."});
            });
    }
    
    async putAdditionPurchaseStock(item, stock){
        const token = JSON.parse(localStorage.getItem('user')).token;
        
        const updateQuantity = (+this.state.quantity)+(+stock["quantity"]);
        const updateAveragePrice = ((+this.state.averagePrice)*(+this.state.quantity)+(+stock["average_price"])*(+stock["quantity"]))/updateQuantity;
        
        await axios({
                method: 'put',
                url: '/api/stock',
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
            .then(() => {
                this.getUser().then(()=>{
                    const name = this.state.selectedPortfolio.name;
                    this.state.currentUser.portfolios.forEach((i)=>{
                        if(i["name"]===name){
                            var map = new Map();
                            i.stocks.forEach((s)=>{
                                map.set(s["symbol"],false);
                            })
                            this.setState({ 
                                selectedPortfolio:i,
                                selectedStocks:map
                            });
                        }
                    })
                })
            })
            .catch((error) => {
                console.log(error.message);
                this.setState({stockErrorMessage:"형식이 맞지않습니다."});
            });
    }
    
    async putStock(item){
        const token = JSON.parse(localStorage.getItem('user')).token;
        await axios({
                method: 'put',
                url: '/api/stock',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                data: {
                    id:item["item"]["id"],
                    symbol:item["item"]["symbol"],
                    name:item["item"]["name"],
                    type:item["item"]["type"],
                    quantity:this.state.ownQuantity,
                    averageprice:this.state.ownAveragePrice,
                    region:item["item"]["region"],
                    marketopen:item["item"]["market_open"],
                    marketclose:item["item"]["market_close"],
                    timezone:item["item"]["timezone"],
                    currency:item["item"]["currency"],
                    portfolioid:this.state.selectedPortfolio.id,
                },
            })
            .then(() => {
                this.getUser().then(()=>{
                    const name = this.state.selectedPortfolio.name;
                    this.state.currentUser.portfolios.forEach((i)=>{
                        if(i["name"]===name){
                            var map = new Map();
                            i.stocks.forEach((s)=>{
                                map.set(s["symbol"],false);
                            })
                            this.setState({ 
                                selectedPortfolio:i,
                                selectedStocks:map
                            });
                        }
                    })
                })
            })
            .catch((error) => {
                console.log(error.message);
                this.setState({ownStockErrorMessage:"형식이 맞지 않습니다."});
            });
    }
    
    async deleteStock(item){
        const token = JSON.parse(localStorage.getItem('user')).token;
        
        await axios({
                method: 'delete',
                url: '/api/stock/'+item["item"]["id"],
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
            .then(() => {
                this.getUser().then(()=>{
                    const name = this.state.selectedPortfolio.name;
                    this.state.currentUser.portfolios.forEach((i)=>{
                        if(i["name"]===name){
                            var map = new Map();
                            i.stocks.forEach((s)=>{
                                map.set(s["symbol"],false);
                            })
                            this.setState({ 
                                selectedPortfolio:i,
                                selectedStocks:map
                            });
                        }
                    })
                });
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
    
    toggleStock(item) {
        var map = this.state.searchStocks;
        var value = map.get(item["item"]["1. symbol"]);
        
        if(value){
            map.set(item["item"]["1. symbol"], false);
        }
        else{
            this.state.stocks.forEach((i)=>{
                map.set(i["1. symbol"], false);
            })
            map.set(item["item"]["1. symbol"], true);
        }
        this.setState({
            searchStocks:map,
            averagePrice: '',
            quantity:'',
            stockErrorMessage:''
        });
    }

    valueToggleStock(item){
        var map = this.state.searchStocks;
        
        if(JSON.stringify(map)==="[]")
            return false;
        else{
            return map.get(item["item"]["1. symbol"]);
        }
    }
    
    toggleMyStock(item){
        var map = this.state.selectedStocks;
        var value = map.get(item["item"]["symbol"]);
        
        if(value){
            map.set(item["item"]["symbol"], false);
        }
        else{
            this.state.selectedPortfolio.stocks.forEach((i)=>{
                map.set(i["symbol"], false);
            })
            map.set(item["item"]["symbol"], true);
        }
        map.set(item["item"]["symbol"], !value);
        this.setState({
            selectedStocks:map,
            ownAveragePrice: '',
            ownQuantity:'',
            ownStockErrorMessage:''
        });
    }
    
    valueToggleMyStock(item){
        var map = this.state.selectedStocks;
        return map.get(item["item"]["symbol"]);
    }
    
    /*portfolio*/
    selectPortfolio(e, item) {
        e.preventDefault();
        this.setState({ selectedPortfolio:item });
        
        if(JSON.stringify(item)!=='{}'){
            var map = new Map();
            item.stocks.forEach((i)=>{
                map.set(i["symbol"],false);
            })
            this.setState({ selectedStocks:map });
        }
        else{
            this.setState({ selectedStocks:{} });
        }
        
        this.toggle();
    }

    createPortfolio(e) {
        e.preventDefault();
        if(this.state.postPortfolioCheck)
            this.postPortfolio();
    }

    removePortfolio(e) {
        e.preventDefault();
        if (this.state.portfolioName === this.state.selectedPortfolio.name) 
            this.deletePortfolio();
        else{
            this.setState({deletePortfolioErrorMessage:"해당 포트폴리오와 이름이 다릅니다."})
        }
    }

    updatePortfolio(e) {
        e.preventDefault();
        if(this.state.portfolioUpdateCheck)
            this.putPortfolio();
    }

    emptyPortfolioName() {
        this.setState({ 
            portfolioName: '',
            postPortfolioErrorMessage:"",
            deletePortfolioErrorMessage:"",
        });
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
                })
                check = true;
                return "";
            }
        })
        
        if(!check){
            this.postStock(item).then(()=>{
                this.setState({averagePrice:'', quantity:''});
            });
        }
    }
    
    removeStock(e, item){
        e.preventDefault();
        this.deleteStock(item);
    }
    
    updateStock(e, item){
        e.preventDefault();
        this.putStock(item);
    }
    
    render() {
        console.log(JSON.stringify(this.state.currentUser, null, 2));
        console.log(JSON.stringify(this.state.selectedPortfolio, null, 2));
        const isEmpty = (item)=>{return Object.keys(item).length;};
        console.log(JSON.stringify(this.state.searchStocks));
        console.log(this.state.selectedStocks);
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
                                        value={this.state.portfolioUpdateName}
                                        placeholder={this.state.selectedPortfolio.name}
                                        onChange={(e) =>{
                                            if(e.target.value.trim().length > 0){
                                                if(e.target.value === this.state.selectedPortfolio.name)
                                                    this.setState({ 
                                                        portfolioUpdateCheck: false ,
                                                        portfolioUpdateErrorMessage:"동일한 이름 입니다."
                                                    })
                                                else{
                                                    this.setState({ 
                                                        portfolioUpdateCheck: true ,
                                                        portfolioUpdateErrorMessage:""
                                                    })
                                                }
                                            }
                                            else
                                                this.setState({ 
                                                    portfolioUpdateCheck: false ,
                                                    portfolioUpdateErrorMessage:"포트폴리오 이름을 입력해주십시오"
                                                })
                                            this.setState({ portfolioUpdateName: e.target.value })
                                        }}
                                    />
                                </Form>
                            ) : (
                                <h2>{this.state.selectedPortfolio.name}</h2>
                            )}
                            <Button
                                variant="primary"
                                onClick={() => {
                                    if(this.state.isRename)
                                        this.setState({portfolioUpdateName:"", portfolioUpdateErrorMessage:""});
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
                            <div>{this.state.portfolioUpdateErrorMessage}</div>
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
                            {this.state.deletePortfolioErrorMessage}
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
                                onChange={(e) => {
                                    if(e.target.value.length > 0)
                                        this.setState({
                                            postPortfolioErrorMessage:"",
                                            postPortfolioCheck:true
                                        })
                                    else
                                        this.setState({
                                            postPortfolioErrorMessage:"포트폴리오 이름을 입력해주십시오",
                                            postPortfolioCheck:false
                                        })
                                    this.setState({ portfolioName: e.target.value })
                                }}
                            />
                            {this.state.postPortfolioErrorMessage}
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
                        {this.state.searchMessage}
                        {this.state.stocks.length === 0 ?
                            <div></div>
                            :
                            (this.state.stocks.map((item)=>{
                                return (
                                    <div key={item["1. symbol"]}>
                                        <Button
                                            variant="primary"
                                            onClick={() => this.toggleStock({item})}
                                            aria-controls="collapse-text"
                                            aria-expanded={this.valueToggleStock({item})}    
                                        >{item["1. symbol"]} ({item["2. name"]})</Button>
                                        
                                        <Collapse in={this.valueToggleStock({item})}>
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
                                                        onChange={(e) => this.setState({ averagePrice: e.target.value.trim() })}    
                                                    />
                                                    <label>갯수</label>
                                                    <Input
                                                        type="text"
                                                        name="quantity"
                                                        placeholder="갯수"
                                                        value={this.state.quantity}
                                                        onChange={(e) => this.setState({ quantity: e.target.value.trim() })}    
                                                    />
                                                    <Button type="submit">매수</Button>
                                                    {this.state.stockErrorMessage}
                                                </Form>
                                            </div>
                                        </Collapse>
                                    </div>
                                );                                
                            }))
                        }
                        
                        {isEmpty(this.state.selectedPortfolio) !== 0 ?
                            (<div>
                                <div>보유 주식</div>
                                {
                                    this.state.selectedPortfolio.stocks.map((item)=>{
                                        return (
                                            <div key={item["symbol"]}>
                                                {item["symbol"]} {item["average_price"]} {item["quantity"]}
                                                <Button
                                                    variant="primary"
                                                    onClick={() => this.toggleMyStock({item})}
                                                    aria-controls="collapse-text"
                                                    aria-expanded={this.valueToggleMyStock({item})} 
                                                >U</Button>
                                                <Button onClick={(event)=>{this.removeStock(event,{item})}}>D</Button>
                                                
                                                <Collapse in={this.valueToggleMyStock({item})}>
                                                    <div id="collapse-text">
                                                        <Form
                                                            onSubmit={(event)=>this.updateStock(event, {item})}
                                                            ref={(c) => {
                                                            this.form = c;
                                                            }}    
                                                        >
                                                            <label>평균단가</label>
                                                            <Input
                                                                type="text"
                                                                name="averagePrice"
                                                                placeholder="평균단가"
                                                                value={this.state.ownAveragePrice}
                                                                onChange={(e) => this.setState({ ownAveragePrice: e.target.value.trim() })}    
                                                            />
                                                            <label>갯수</label>
                                                            <Input
                                                                type="text"
                                                                name="quantity"
                                                                placeholder="갯수"
                                                                value={this.state.ownQuantity}
                                                                onChange={(e) => this.setState({ ownQuantity: e.target.value.trim() })}    
                                                            />
                                                            <Button type="submit">수정</Button>
                                                            {this.state.ownStockErrorMessage}
                                                        </Form>
                                                    </div>
                                                </Collapse>
                                            </div>
                                        )
                                    })
                                }
                            </div>)
                            :
                            <div></div>
                        }
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                this.handleStockModalShowHide();
                                this.setState({stocks:[], keywords:''});
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