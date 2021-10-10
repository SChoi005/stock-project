package project.stockOpenApi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeRateResponse{
    
    /*
        "Realtime Currency Exchange Rate": {
        "1. From_Currency Code": "USD",
        "2. From_Currency Name": "United States Dollar",
        "3. To_Currency Code": "KRW",
        "4. To_Currency Name": "South Korean Won",
        "5. Exchange Rate": "1194.70000000",
        "6. Last Refreshed": "2021-10-10 01:32:25",
        "7. Time Zone": "UTC",
        "8. Bid Price": "1194.66000000",
        "9. Ask Price": "1194.73000000"
    }
    */
    
    
    @JsonProperty("Realtime Currency Exchange Rate")
    private Body exchangeRate;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Body{
        
        @JsonProperty("1. From_Currency Code")
        private String fromCurrencyCode;
        
        @JsonProperty("2. From_Currency Name")
        private String fromCurrencyName;

        @JsonProperty("3. To_Currency Code")
        private String toCurrencyCode;
        
        @JsonProperty("4. To_Currency Name")
        private String toCurrencyName;
        
        @JsonProperty("5. Exchange Rate")
        private String exchangeRate;
        
        @JsonProperty("6. Last Refreshed")
        private String lastRefreshed;
        
        @JsonProperty("7. Time Zone")
        private String timeZone;
        
        @JsonProperty("8. Bid Price")
        private String bidPrice;
        
        @JsonProperty("9. Ask Price")
        private String askPrice;
    }
    
}