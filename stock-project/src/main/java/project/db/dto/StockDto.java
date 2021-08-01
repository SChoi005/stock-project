package project.db.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StockDto{
    
    private Long id;
    
    private String symbol;
    
    private Long portfolioId;
}