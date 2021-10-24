package project.stockOpenApi.dto;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class STOCHResponse{
    /*
        {
            "Meta Data": {
                "1: Symbol": "IBM",
                "2: Indicator": "Stochastic (STOCH)",
                "3: Last Refreshed": "2021-10-22",
                "4: Interval": "daily",
                "5.1: FastK Period": 5,
                "5.2: SlowK Period": 3,
                "5.3: SlowK MA Type": 0,
                "5.4: SlowD Period": 3,
                "5.5: SlowD MA Type": 0,
                "6: Time Zone": "US/Eastern Time"
            },
            "Technical Analysis: STOCH": {
                "2021-10-22": {
                    "SlowK": "13.1698",
                    "SlowD": "26.8415"
                },
                "2021-10-21": {
                    "SlowK": "25.5085",
                    "SlowD": "43.5286"
                },
                "2021-10-20": {
                    "SlowK": "41.8461",
                    "SlowD": "60.5973"
                },
                "2021-10-19": {
                    "SlowK": "63.2313",
                    "SlowD": "69.3877"
                },
                ...
        }
    */
    @JsonProperty("Meta Data")
    private MetaData metaData; 
    @JsonProperty("Technical Analysis: STOCH")
    private TimeSeries timeSeries; 
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MetaData{
        @JsonProperty("1: Symbol")
        private String symbol;
        @JsonProperty("2: Indicator")
        private String indicator;
        @JsonProperty("3: Last Refreshed")
        private String lastRefreshed;
        @JsonProperty("4: Interval")
        private String interval;
        @JsonProperty("5.1: FastK Period")
        private int fastkPeriod;
        @JsonProperty("5.2: SlowK Period")
        private int slowkPeriod;
        @JsonProperty("5.3: SlowK MA Type")
        private int slowkMAType;
        @JsonProperty("5.4: SlowD Period")
        private int SlowdPeriod;
        @JsonProperty("5.5: SlowD MA Type")
        private int SlowdMAType;
        @JsonProperty("6: Time Zone")
        private String timeZone;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimeSeries{
        private Map<String, STOCH> series = new HashMap<>();;
        
        @JsonAnySetter
        public void add(String key, STOCH value) { 
            series.put(key, value);
        }
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class STOCH{
        @JsonProperty("SlowK")
        private String slowK;
        @JsonProperty("SlowD")
        private String slowD;
    }
}