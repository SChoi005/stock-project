package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.stockOpenApi.StockClient;
import project.stockOpenApi.dto.QuoteEndpointRequest;
import project.stockOpenApi.dto.QuoteEndpointResponse;

@RestController
@RequestMapping("/open-api")
public class OpenApiController{
    
    @Autowired
    private StockClient stockClient;
    
    @GetMapping("/quote-endpoint")
    public QuoteEndpointResponse searchQuoteEndpoint(@RequestParam String symbol){
        QuoteEndpointRequest req = new QuoteEndpointRequest();
        req.setSymbol(symbol);
        
        return stockClient.searchQuoteEndpoint(req);
    }
    
}