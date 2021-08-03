package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
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
    public PortfolioDto create(@RequestBody PortfolioDto portfolioDto){
        return portfolioService.create(portfolioDto);
    }
    
}