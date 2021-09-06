package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.stockOpenApi.StockClient;
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
    
}