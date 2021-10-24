package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import project.stockOpenApi.StockClient;
import project.stockOpenApi.dto.CCIRequest;
import project.stockOpenApi.dto.CompanyOverviewRequest;
import project.stockOpenApi.dto.ETFOverviewRequest;
import project.stockOpenApi.dto.ExchangeRateRequest;
import project.stockOpenApi.dto.ExchangeRateResponse;
import project.stockOpenApi.dto.NewsSearchRequest;
import project.stockOpenApi.dto.QuoteEndpointRequest;
import project.stockOpenApi.dto.QuoteEndpointResponse;
import project.stockOpenApi.dto.RSIRequest;
import project.stockOpenApi.dto.SymbolSearchRequest;
import project.stockOpenApi.dto.TimeSeriesRequest;

@RestController
@RequestMapping("/api")
@Slf4j
public class OpenApiController{
    
    @Autowired
    private StockClient stockClient;
    
    @GetMapping("/quote-endpoint/{symbol}")
    public ResponseEntity<?> searchQuoteEndpoint(@PathVariable String symbol){
        QuoteEndpointRequest req = new QuoteEndpointRequest();
        req.setSymbol(symbol);
        
        return ResponseEntity.ok(stockClient.searchQuoteEndpoint(req).getGlobalQuote());
    }
    
    @GetMapping("/search/{keywords}")
    public ResponseEntity<?> search(@PathVariable String keywords){
        SymbolSearchRequest req = new SymbolSearchRequest();
        req.setKeywords(keywords);
        
        return ResponseEntity.ok(stockClient.searchSymbol(req).getBestMatches());
    }
    
    @GetMapping("/overview/{symbol}")
    public ResponseEntity<?> searchCompanyOverview(@PathVariable String symbol){
        CompanyOverviewRequest req = new CompanyOverviewRequest();
        req.setSymbol(symbol);
        
        return ResponseEntity.ok(stockClient.searchCompanyOverview(req));
    }
    
    @GetMapping("/overview/etf/{symbol}")
    public ResponseEntity<?> searchETFOverview(@PathVariable String symbol){
        ETFOverviewRequest req = new ETFOverviewRequest();
        req.setSymbol(symbol);
        
        return ResponseEntity.ok(stockClient.getETFOverview(req));
    }
    
    @GetMapping("/exchangeRate")
    public ResponseEntity<?> getExchangeRate(){
        ExchangeRateRequest req = new ExchangeRateRequest();
        
        return ResponseEntity.ok(stockClient.getExchangeRate(req));
    }
    
    @GetMapping("/news/{symbol}")
    public ResponseEntity<?> searchNews(@PathVariable String symbol){
        NewsSearchRequest req = new NewsSearchRequest();
        req.setQuery(symbol);
        
        return ResponseEntity.ok(stockClient.searchNews(req));
    }
    
    @GetMapping("/time-series/{function}/{symbol}")
    public ResponseEntity<?> getTimeSeries(@PathVariable String function, @PathVariable String symbol){
        
        TimeSeriesRequest req = new TimeSeriesRequest();
        req.setFunction(function);
        req.setSymbol(symbol); 
        
        if(function.equals("TIME_SERIES_MONTHLY_ADJUSTED")){
            return ResponseEntity.ok(stockClient.getMonthlyTimeSeries(req));
        }
        else if(function.equals("TIME_SERIES_WEEKLY_ADJUSTED")){
            return ResponseEntity.ok(stockClient.getWeeklyTimeSeries(req));
        }
        else{
            return ResponseEntity.ok(stockClient.getDailyTimeSeries(req));
        }
    }
    
    @GetMapping("/rsi/{symbol}")
    public ResponseEntity<?> getRSI(@PathVariable String symbol){
        RSIRequest req = new RSIRequest();
        req.setSymbol(symbol);
        
        return ResponseEntity.ok(stockClient.getRSI(req));
    }
    
    @GetMapping("/cci/{symbol}")
    public ResponseEntity<?> getCCI(@PathVariable String symbol){
        CCIRequest req = new CCIRequest();
        req.setSymbol(symbol);
        
        return ResponseEntity.ok(stockClient.getCCI(req));
    }
}