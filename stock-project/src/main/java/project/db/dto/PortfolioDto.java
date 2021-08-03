package project.db.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PortfolioDto{
    
    private Long id;
    
    private String name;
    
    private Long userId;
}