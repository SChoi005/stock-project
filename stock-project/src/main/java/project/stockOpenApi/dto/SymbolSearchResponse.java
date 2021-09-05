package project.stockOpenApi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SymbolSearchResponse{
    
    /* Json example
    
    {
            "1. symbol": "TSCO.LON",
            "2. name": "Tesco PLC",
            "3. type": "Equity",
            "4. region": "United Kingdom",
            "5. marketOpen": "08:00",
            "6. marketClose": "16:30",
            "7. timezone": "UTC+01",
            "8. currency": "GBX",
            "9. matchScore": "0.7273"
    }
    */
    
    @JsonProperty("bestMatches")
    private Body[] bestMatches;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Body{
        @JsonProperty("1. symbol")
        private String symbol;

        @JsonProperty("2. name")
        private String name;

        @JsonProperty("3. type")
        private String type;

        @JsonProperty("4. region")
        private String region;

        @JsonProperty("5. marketOpen")
        private String marketOpen;

        @JsonProperty("6. marketClose")
        private String marketClose;

        @JsonProperty("7. timezone")
        private String timezone;

        @JsonProperty("8. currency")
        private String currency;

        @JsonProperty("9. matchScore")
        private String matchScore;
    }
    
}