package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.stockOpenApi.StockClient;
import project.stockOpenApi.dto.CompanyOverviewRequest;
import project.stockOpenApi.dto.ExchangeRateRequest;
import project.stockOpenApi.dto.ExchangeRateResponse;
import project.stockOpenApi.dto.NewsSearchRequest;
import project.stockOpenApi.dto.QuoteEndpointRequest;
import project.stockOpenApi.dto.QuoteEndpointResponse;
import project.stockOpenApi.dto.SymbolSearchRequest;

@RestController
@RequestMapping("/api")
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
    
}