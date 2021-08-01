package project.stockOpenApi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class QuoteEndpointResponse{
    
    /* json example
    
    "Global Quote": {
        "01. symbol": "IBM",
        "02. open": "141.5200",
        "03. high": "141.8500",
        "04. low": "140.7900",
        "05. price": "140.9600",
        "06. volume": "3535555",
        "07. latest trading day": "2021-07-30",
        "08. previous close": "141.9300",
        "09. change": "-0.9700",
        "10. change percent": "-0.6834%"
    }
    
    */
    
    @JsonProperty("Global Quote")
    private Body globalQuote;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Body{
        
        @JsonProperty("01. symbol")
        private String symbol;
        
        @JsonProperty("02. open")
        private String open;
        
        @JsonProperty("03. high")
        private String high;
        
        @JsonProperty("04. low")
        private String low;
        
        @JsonProperty("05. price")
        private String price;
        
        @JsonProperty("06. volume")
        private String volume;
        
        @JsonProperty("07. latest trading day")
        private String latestTradingDay;
        
        @JsonProperty("08. previous close")
        private String previousClose;
        
        @JsonProperty("09. change")
        private String change;
        
        @JsonProperty("10. change percent")
        private String changePercent;

    }
    
}