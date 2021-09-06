package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.db.dto.StockDto;
import project.service.StockService;

@RestController
@RequestMapping("/api")
public class StockApiController{
    
    @Autowired
    private StockService stockService;
    
    @PostMapping("/stock")
    public ResponseEntity<?> create(@RequestBody StockDto stockDto) throws Exception{
        return ResponseEntity.ok(stockService.create(stockDto));
    }
    
}