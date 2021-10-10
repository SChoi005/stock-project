package project.stockOpenApi.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewsSearchResponse{

    /*
        {
            "lastBuildDate": "Sun, 10 Oct 2021 12:56:03 +0900",
            "total": 1811,
            "start": 1,
            "display": 10,
            "items":[
                {
                    "title": "미국 뉴욕증시, 부채한도 유예 가능성에 상승 출발…S&amp;P 1.38%↑·나스닥 1.4...",
                    "originallink": "http://www.topstarnews.net/news/articleView.html?idxno=14636733",
                    "link": "http://www.topstarnews.net/news/articleView.html?idxno=14636733",
                    "description": "서학개미들이 많이 투자한 6개 종목 시황은 애플 (<b>AAPL</b>) 144.09(1.48%↑), 엔비디아 (NVDA) 210.79(1.83%↑), 마이크로소프트 (MSFT) 295.72(0.89%↑), 테슬라 (TSLA) 786.5(0.48%↑), 아마존닷컴 (AMZN) 3317.(1.69%↑), 알파벳 A (GOOGL)... ",
                    "pubDate": "Thu, 07 Oct 2021 23:04:00 +0900"
                }
            ]
}
    */
    
    private String symbol;
    private String lastBuildDate;
    private int total;
    private int start;
    private int display;
    private List<SearchNewsItem> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SearchNewsItem{
        private String title;
        private String originallink;
        private String link;
        private String description;
        private String pubDate;
    }
    
}