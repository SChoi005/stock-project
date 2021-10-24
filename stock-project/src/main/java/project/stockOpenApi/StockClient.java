package project.stockOpenApi;

import java.net.URI;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.extern.slf4j.Slf4j;
import project.stockOpenApi.dto.CCIRequest;
import project.stockOpenApi.dto.CCIResponse;
import project.stockOpenApi.dto.CompanyOverviewRequest;
import project.stockOpenApi.dto.CompanyOverviewResponse;
import project.stockOpenApi.dto.ETFOverviewRequest;
import project.stockOpenApi.dto.ETFOverviewResponse;
import project.stockOpenApi.dto.ExchangeRateRequest;
import project.stockOpenApi.dto.ExchangeRateResponse;
import project.stockOpenApi.dto.NewsSearchRequest;
import project.stockOpenApi.dto.NewsSearchResponse;
import project.stockOpenApi.dto.QuoteEndpointRequest;
import project.stockOpenApi.dto.QuoteEndpointResponse;
import project.stockOpenApi.dto.RSIRequest;
import project.stockOpenApi.dto.RSIResponse;
import project.stockOpenApi.dto.SymbolSearchRequest;
import project.stockOpenApi.dto.SymbolSearchResponse;
import project.stockOpenApi.dto.TimeSeriesDailyResponse;
import project.stockOpenApi.dto.TimeSeriesMonthlyResponse;
import project.stockOpenApi.dto.TimeSeriesRequest;
import project.stockOpenApi.dto.TimeSeriesWeeklyResponse;

@Slf4j
@Component
public class StockClient{
    
    private String stockUrl = "https://www.alphavantage.co/query";
    
    private String naverClientId = "fDvg3Sqxa5NCpgpo0lg0";
    
    private String naverClientSecret = "1ulnLa5PxL";
    
    private String naverNewsSearchUrl = "https://openapi.naver.com/v1/search/news.json";
    
    public QuoteEndpointResponse searchQuoteEndpoint(QuoteEndpointRequest quoteEndpointRequest){
        
        URI uri = UriComponentsBuilder.fromUriString(stockUrl)
                                      .queryParams(quoteEndpointRequest.toMultiValueMap())
                                      .build()
                                      .encode()
                                      .toUri();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity httpEntity = new HttpEntity<>(headers);
        
        ParameterizedTypeReference responseType = new ParameterizedTypeReference<QuoteEndpointResponse>() {};
        
        ResponseEntity<QuoteEndpointResponse> responseEntity = new RestTemplate().exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            responseType
        );
        
        
        return responseEntity.getBody();
    }
    
    public SymbolSearchResponse searchSymbol(SymbolSearchRequest symbolSearchRequest){
        URI uri = UriComponentsBuilder.fromUriString(stockUrl)
                                      .queryParams(symbolSearchRequest.toMultiValueMap())
                                      .build()
                                      .encode()
                                      .toUri();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity httpEntity = new HttpEntity<>(headers);
        
        ParameterizedTypeReference responseType = new ParameterizedTypeReference<SymbolSearchResponse>() {};
        
        ResponseEntity<SymbolSearchResponse> responseEntity = new RestTemplate().exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            responseType
        );
        
        
        return responseEntity.getBody();
    }
    
    public CompanyOverviewResponse searchCompanyOverview(CompanyOverviewRequest companyOverviewRequest){
        URI uri = UriComponentsBuilder.fromUriString(stockUrl)
                                      .queryParams(companyOverviewRequest.toMultiValueMap())
                                      .build()
                                      .encode()
                                      .toUri();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity httpEntity = new HttpEntity<>(headers);
        
        ParameterizedTypeReference responseType = new ParameterizedTypeReference<CompanyOverviewResponse>() {};
        
        ResponseEntity<CompanyOverviewResponse> responseEntity = new RestTemplate().exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            responseType
        );
        
        return responseEntity.getBody();
    }
    
    public ExchangeRateResponse getExchangeRate(ExchangeRateRequest exchangeRateRequest){
        URI uri = UriComponentsBuilder.fromUriString(stockUrl)
                                      .queryParams(exchangeRateRequest.toMultiValueMap())
                                      .build()
                                      .encode()
                                      .toUri();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity httpEntity = new HttpEntity<>(headers);
        
        ParameterizedTypeReference responseType = new ParameterizedTypeReference<ExchangeRateResponse>() {};
        
        ResponseEntity<ExchangeRateResponse> responseEntity = new RestTemplate().exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            responseType
        );
        
        return responseEntity.getBody();
    }
    
    public NewsSearchResponse searchNews(NewsSearchRequest newsSearchRequest){
        //uri 작성
        URI uri = UriComponentsBuilder.fromUriString(naverNewsSearchUrl)
            .queryParams(newsSearchRequest.toMultiValueMap())
            .build()
            .encode()
            .toUri();
        
        //header 작성
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", naverClientId);
        headers.set("X-Naver-Client-Secret",naverClientSecret);
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        
        
        HttpEntity httpEntity = new HttpEntity<>(headers);
        ParameterizedTypeReference responseType = new ParameterizedTypeReference<NewsSearchResponse>() {};
        
        ResponseEntity<NewsSearchResponse> responseEntity = new RestTemplate().exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            responseType
        );
        
        responseEntity.getBody().setSymbol(newsSearchRequest.getQuery());        
        
        return responseEntity.getBody();
    }
    
    public TimeSeriesMonthlyResponse getMonthlyTimeSeries(TimeSeriesRequest timeSeriesRequest){
        URI uri = UriComponentsBuilder.fromUriString(stockUrl)
                                      .queryParams(timeSeriesRequest.toMultiValueMap())
                                      .build()
                                      .encode()
                                      .toUri();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity httpEntity = new HttpEntity<>(headers);
        
        ParameterizedTypeReference responseType = new ParameterizedTypeReference<TimeSeriesMonthlyResponse>() {};
        
        ResponseEntity<TimeSeriesMonthlyResponse> responseEntity = new RestTemplate().exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            responseType
        );
        
        return responseEntity.getBody();
    }
    
    public TimeSeriesWeeklyResponse getWeeklyTimeSeries(TimeSeriesRequest timeSeriesRequest){
        URI uri = UriComponentsBuilder.fromUriString(stockUrl)
                                      .queryParams(timeSeriesRequest.toMultiValueMap())
                                      .build()
                                      .encode()
                                      .toUri();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity httpEntity = new HttpEntity<>(headers);
        
        ParameterizedTypeReference responseType = new ParameterizedTypeReference<TimeSeriesWeeklyResponse>() {};
        
        ResponseEntity<TimeSeriesWeeklyResponse> responseEntity = new RestTemplate().exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            responseType
        );
        
        return responseEntity.getBody();
    }
    
    public TimeSeriesDailyResponse getDailyTimeSeries(TimeSeriesRequest timeSeriesRequest){
        URI uri = UriComponentsBuilder.fromUriString(stockUrl)
                                      .queryParams(timeSeriesRequest.toMultiValueMap())
                                      .build()
                                      .encode()
                                      .toUri();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity httpEntity = new HttpEntity<>(headers);
        
        ParameterizedTypeReference responseType = new ParameterizedTypeReference<TimeSeriesDailyResponse>() {};
        
        ResponseEntity<TimeSeriesDailyResponse> responseEntity = new RestTemplate().exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            responseType
        );
        
        return responseEntity.getBody();
    }
    
    public ETFOverviewResponse getETFOverview(ETFOverviewRequest etfOverviewRequest){
        
        URI uri = UriComponentsBuilder.fromUriString("https://api.stock.naver.com/etf/SPYG.K/basic")
                                      .build()
                                      .encode()
                                      .toUri();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity httpEntity = new HttpEntity<>(headers);
        
        ParameterizedTypeReference responseType = new ParameterizedTypeReference<ETFOverviewResponse>() {};
        
        ResponseEntity<ETFOverviewResponse> responseEntity = new RestTemplate().exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            responseType
        );
        
        return responseEntity.getBody();
    }
    
    public RSIResponse getRSI(RSIRequest rsiRequest){
        URI uri = UriComponentsBuilder.fromUriString(stockUrl)
                                      .queryParams(rsiRequest.toMultiValueMap())
                                      .build()
                                      .encode()
                                      .toUri();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity httpEntity = new HttpEntity<>(headers);
        
        ParameterizedTypeReference responseType = new ParameterizedTypeReference<RSIResponse>() {};
        
        ResponseEntity<RSIResponse> responseEntity = new RestTemplate().exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            responseType
        );
        
        return responseEntity.getBody();
    }
    
    public CCIResponse getCCI(CCIRequest cciRequest){
        URI uri = UriComponentsBuilder.fromUriString(stockUrl)
                                      .queryParams(cciRequest.toMultiValueMap())
                                      .build()
                                      .encode()
                                      .toUri();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity httpEntity = new HttpEntity<>(headers);
        
        ParameterizedTypeReference responseType = new ParameterizedTypeReference<CCIResponse>() {};
        
        ResponseEntity<CCIResponse> responseEntity = new RestTemplate().exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            responseType
        );
        
        return responseEntity.getBody();
    }
}