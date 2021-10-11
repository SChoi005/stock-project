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
public class TimeSeriesMonthlyResponse{
    /*
        {
            "Meta Data": {
                "1. Information": "Monthly Adjusted Prices and Volumes",
                "2. Symbol": "IBM",
                "3. Last Refreshed": "2021-10-08",
                "4. Time Zone": "US/Eastern"
            },
            "Monthly Adjusted Time Series": {
                "2021-10-08": {
                    "1. open": "141.0000",
                    "2. high": "146.0000",
                    "3. low": "140.3700",
                    "4. close": "143.2200",
                    "5. adjusted close": "143.2200",
                    "6. volume": "33815355",
                    "7. dividend amount": "0.0000"
                },
            ...
        }
    */
    @JsonProperty("Meta Data")
    private MetaData metaData; 
    @JsonProperty("Monthly Adjusted Time Series")
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
        @JsonProperty("4. Time Zone")
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
    }
}