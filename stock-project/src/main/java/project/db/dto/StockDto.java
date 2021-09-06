package project.db.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StockDto{
    
    private Long id;
    
    private String symbol;

    private String name;

    private String type;

    private Long quantity;
    
    private BigDecimal averageprice;
    
    private String region;

    private String marketopen;

    private String marketclose;

    private String timezone;

    private String currency;

    private Long portfolioid;
}