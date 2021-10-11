package project.stockOpenApi.dto;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimeSeriesDailyResponse{
    /*
    {
        "Meta Data": {
            "1. Information": "Daily Time Series with Splits and Dividend Events",
            "2. Symbol": "IBM",
            "3. Last Refreshed": "2021-10-08",
            "4. Output Size": "Compact",
            "5. Time Zone": "US/Eastern"
        },
        "Time Series (Daily)": {
            "2021-10-08": {
                "1. open": "141.81",
                "2. high": "143.65",
                "3. low": "141.05",
                "4. close": "143.22",
                "5. adjusted close": "143.22",
                "6. volume": "3731279",
                "7. dividend amount": "0.0000",
                "8. split coefficient": "1.0"
            },
            ...
        }
    }
    
    */
    
    @JsonProperty("Meta Data")
    private MetaData metaData; 
    @JsonProperty("Time Series (Daily)")
    private TimeSeries timeSeries; 
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MetaData{
        @JsonProperty("1. Information")
        private String information;
        @JsonProperty("2. Symbol")
        private String symbol;
        @JsonProperty("3. Last Refreshed")
        private String lastRefreshed;
        @JsonProperty("4. Output Size")
        private String outputSize;
        @JsonProperty("5. Time Zone")
        private String timeZone;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimeSeries{
        private Map<String, Info> series = new HashMap<>();;
        
        @JsonAnySetter
        public void add(String key, Info value) { 
            series.put(key, value);
        }
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Info{
        @JsonProperty("1. open")
        private String open;
        @JsonProperty("2. high")
        private String high;
        @JsonProperty("3. low")
        private String low;
        @JsonProperty("4. close")
        private String close;
        @JsonProperty("5. adjusted close")
        private String adjustedClose;
        @JsonProperty("6. volume")
        private String volume;
        @JsonProperty("7. dividend amount")
        private String dividendAmount;
        @JsonProperty("8. split coefficient")
        private String splitCoefficient;
        
    }
}