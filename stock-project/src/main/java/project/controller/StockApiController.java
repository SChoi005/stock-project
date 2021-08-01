package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
    public StockDto create(@RequestBody StockDto stockDto){
        return stockService.create(stockDto);
    }
}