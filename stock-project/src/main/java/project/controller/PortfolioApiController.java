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

import project.db.dto.PortfolioDto;
import project.service.PortfolioService;

@RestController
@RequestMapping("/api")
public class PortfolioApiController{
    
    @Autowired
    private PortfolioService portfolioService;
    
    @PostMapping("/portfolio")
    public ResponseEntity<?> create(@RequestBody PortfolioDto portfolioDto) throws Exception{
        return ResponseEntity.ok(portfolioService.create(portfolioDto));
    } 
    
    @DeleteMapping("/portfolio/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws Exception{
        return ResponseEntity.ok(portfolioService.delete(id));
    }
    
    @PutMapping("/portfolio")
    public ResponseEntity<?> update(@RequestBody PortfolioDto portfolioDto) throws Exception{
        return ResponseEntity.ok(portfolioService.update(portfolioDto));
    }
}