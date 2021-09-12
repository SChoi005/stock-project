package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import project.db.dto.StockDto;
import project.service.StockService;

@Slf4j
@RestController
@RequestMapping("/api")
public class StockApiController{
    
    @Autowired
    private StockService stockService;
    
    @PostMapping("/stock")
    public ResponseEntity<?> create(@RequestBody StockDto stockDto) throws Exception{
        log.info("{}", stockDto);
        return ResponseEntity.ok(stockService.create(stockDto));
    }
    
    @PutMapping("/stock")
    public ResponseEntity<?> additionalPurchase(@RequestBody StockDto stockDto) throws Exception{
        log.info("{}", stockDto);
        return ResponseEntity.ok(stockService.update(stockDto));
    }
    
    @DeleteMapping("/stock/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws Exception{
        return ResponseEntity.ok(stockService.delete(id));
    }
}