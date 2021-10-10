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
import project.stockOpenApi.dto.CompanyOverviewRequest;
import project.stockOpenApi.dto.CompanyOverviewResponse;
import project.stockOpenApi.dto.ExchangeRateRequest;
import project.stockOpenApi.dto.ExchangeRateResponse;
import project.stockOpenApi.dto.NewsSearchRequest;
import project.stockOpenApi.dto.NewsSearchResponse;
import project.stockOpenApi.dto.QuoteEndpointRequest;
import project.stockOpenApi.dto.QuoteEndpointResponse;
import project.stockOpenApi.dto.SymbolSearchRequest;
import project.stockOpenApi.dto.SymbolSearchResponse;

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
    
}