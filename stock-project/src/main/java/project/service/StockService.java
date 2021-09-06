package project.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import project.db.dto.StockDto;
import project.db.entity.Stock;
import project.db.repository.PortfolioRepository;
import project.db.repository.StockRepository;

@Slf4j
@Service
public class StockService{
    
    @Autowired
    private StockRepository stockRepository;
    
    @Autowired
    private PortfolioRepository portfolioRepository;
    
    
    //c
    public StockDto create(StockDto stockDto) throws Exception{
        
        if(stockRepository.findBySymbolAndPortfolio(stockDto.getSymbol(), portfolioRepository.getOne(stockDto.getPortfolioid())).isPresent()){
            throw new Exception("Exist Exception");
        }else{
            Stock stock = new Stock();
            stock.setSymbol(stockDto.getSymbol());
            stock.setName(stockDto.getName());
            stock.setType(stockDto.getType());
            stock.setQuantity(stockDto.getQuantity());
            stock.setAveragePrice(stockDto.getAverageprice());
            stock.setRegion(stockDto.getRegion());
            stock.setMarketOpen(stockDto.getMarketopen());
            stock.setMarketClose(stockDto.getMarketclose());
            stock.setTimezone(stockDto.getTimezone());
            stock.setCurrency(stockDto.getCurrency());
            stock.setPortfolio(portfolioRepository.getOne(stockDto.getPortfolioid()));
            
            stockRepository.save(stock);
            
            return stockDto;
        }
    }
    //r
    
    //u
    
    //d
        
}