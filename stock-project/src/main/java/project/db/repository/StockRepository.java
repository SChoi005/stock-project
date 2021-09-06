package project.db.repository;

import com.google.common.base.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import project.db.entity.Portfolio;
import project.db.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Long>{
    Optional<Stock> findBySymbolAndPortfolio(String symbol, Portfolio portfolio);
}