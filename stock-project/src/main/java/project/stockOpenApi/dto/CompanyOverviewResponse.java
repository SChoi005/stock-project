package project.stockOpenApi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyOverviewResponse{
    /* JSON example
        "Symbol": "IBM",
        "AssetType": "Common Stock",
        "Name": "International Business Machines Corporation",
        "Description": "International Business Machines Corporation (IBM) is an American multinational technology company headquartered in Armonk, New York, with operations in over 170 countries. The company began in 1911, founded in Endicott, New York, as the Computing-Tabulating-Recording Company (CTR) and was renamed International Business Machines in 1924. IBM is incorporated in New York. IBM produces and sells computer hardware, middleware and software, and provides hosting and consulting services in areas ranging from mainframe computers to nanotechnology. IBM is also a major research organization, holding the record for most annual U.S. patents generated by a business (as of 2020) for 28 consecutive years. Inventions by IBM include the automated teller machine (ATM), the floppy disk, the hard disk drive, the magnetic stripe card, the relational database, the SQL programming language, the UPC barcode, and dynamic random-access memory (DRAM). The IBM mainframe, exemplified by the System/360, was the dominant computing platform during the 1960s and 1970s.",
        "CIK": "51143",
        "Exchange": "NYSE",
        "Currency": "USD",
        "Country": "USA",
        "Sector": "TECHNOLOGY",
        "Industry": "COMPUTER & OFFICE EQUIPMENT",
        "Address": "1 NEW ORCHARD ROAD, ARMONK, NY, US",
        "FiscalYearEnd": "December",
        "LatestQuarter": "2021-06-30",
        "MarketCapitalization": "119425679000",
        "EBITDA": "15992001000",
        "PERatio": "22.52",
        "PEGRatio": "1.407",
        "BookValue": "24.48",
        "DividendPerShare": "6.53",
        "DividendYield": "0.0483",
        "EPS": "5.92",
        "RevenuePerShareTTM": "83.3",
        "ProfitMargin": "0.0717",
        "OperatingMarginTTM": "0.124",
        "ReturnOnAssetsTTM": "0.0385",
        "ReturnOnEquityTTM": "0.245",
        "RevenueTTM": "74400997000",
        "GrossProfitTTM": "35575000000",
        "DilutedEPSTTM": "5.92",
        "QuarterlyEarningsGrowthYOY": "-0.032",
        "QuarterlyRevenueGrowthYOY": "0.034",
        "AnalystTargetPrice": "150",
        "TrailingPE": "22.52",
        "ForwardPE": "11.11",
        "PriceToSalesRatioTTM": "1.605",
        "PriceToBookRatio": "5.52",
        "EVToRevenue": "2.326",
        "EVToEBITDA": "12.81",
        "Beta": "1.212",
        "52WeekHigh": "151.1",
        "52WeekLow": "100.73",
        "50DayMovingAverage": "139.98",
        "200DayMovingAverage": "139.96",
        "SharesOutstanding": "896320000",
        "SharesFloat": "894743000",
        "SharesShort": "25087600",
        "SharesShortPriorMonth": "25615000",
        "ShortRatio": "7.92",
        "ShortPercentOutstanding": "0.03",
        "ShortPercentFloat": "0.028",
        "PercentInsiders": "0.133",
        "PercentInstitutions": "57.72",
        "ForwardAnnualDividendRate": "6.56",
        "ForwardAnnualDividendYield": "0.0485",
        "PayoutRatio": "0.747",
        "DividendDate": "2021-09-10",
        "ExDividendDate": "2021-08-09",
        "LastSplitFactor": "2:1",
        "LastSplitDate": "1999-05-27"

    */
    @JsonProperty("Symbol")
    private String symbol;
    @JsonProperty("AssetType")
    private String assetType;
    @JsonProperty("Name")
    private String name;
    @JsonProperty("Description")
    private String description;
    @JsonProperty("CIK")
    private String cik;
    @JsonProperty("Exchange")
    private String exchange;
    @JsonProperty("Currency")
    private String currency;
    @JsonProperty("Country")
    private String country;
    @JsonProperty("Sector")
    private String sector;
    @JsonProperty("Industry")
    private String industry;
    @JsonProperty("Address")
    private String address;
    @JsonProperty("FiscalYearEnd")
    private String fiscalYearEnd;
    @JsonProperty("LatestQuarter")
    private String latestQuarter;
    @JsonProperty("marketCapitalization")
    private String marketCapitalization;
    @JsonProperty("EBITDA")
    private String ebitda;
    @JsonProperty("PERatio")
    private String peRatio;
    @JsonProperty("PEGRatio")
    private String pegRatio;
    @JsonProperty("BookValue")
    private String bookValue;
    @JsonProperty("DividendPerShare")
    private String dividendPerShare;
    @JsonProperty("DividendYield")
    private String dividendYield;
    @JsonProperty("EPS")
    private String eps;
    @JsonProperty("RevenuePerShareTTM")
    private String revenuePerShareTTM;
    @JsonProperty("ProfitMargin")
    private String profitMargin;
    @JsonProperty("OperatingMarginTTM")
    private String operatingMarginTTM;
    @JsonProperty("ReturnOnAssetsTTM")
    private String returnOnAssetsTTM;
    @JsonProperty("ReturnOnEquityTTM")
    private String returnOnEquityTTM;
    @JsonProperty("RevenueTTM")
    private String revenueTTM;
    @JsonProperty("GrossProfitTTM")
    private String grossProfitTTM;
    @JsonProperty("DilutedEPSTTM")
    private String dilutedEPSTTM;
    @JsonProperty("QuarterlyEarningsGrowthYOY")
    private String quarterlyEarningsGrowthYOY;
    @JsonProperty("QuarterlyRevenueGrowthYOY")
    private String quarterlyRevenueGrowthYOY;
    @JsonProperty("AnalystTargetPrice")
    private String analystTargetPrice;
    @JsonProperty("TrailingPE")
    private String trailingPE;
    @JsonProperty("ForwardPE")
    private String forwardPE;
    @JsonProperty("PriceToSalesRatioTTM")
    private String priceToSalesRatioTTM;
    @JsonProperty("PriceToBookRatio")
    private String priceToBookRatio;
    @JsonProperty("EVToRevenue")
    private String EVToRevenue;
    @JsonProperty("EVToEBITDA")
    private String EVToEBITDA;
    @JsonProperty("Beta")
    private String beta;
    @JsonProperty("52WeekHigh")
    private String weekHigh;
    @JsonProperty("52WeekLow")
    private String weekLow;
    @JsonProperty("50DayMovingAverage")
    private String dayMovingAverage;
    @JsonProperty("200DayMovingAverage")
    private String moreDayMovingAverage;
    @JsonProperty("SharesOutstanding")
    private String sharesOutstanding;
    @JsonProperty("SharesFloat")
    private String sharesFloat;
    @JsonProperty("SharesShort")
    private String sharesShort;
    @JsonProperty("SharesShortPriorMonth")
    private String sharesShortPriorMonth;
    @JsonProperty("ShortRatio")
    private String shortRatio;
    @JsonProperty("ShortPercentOutstanding")
    private String shortPercentOutstanding;
    @JsonProperty("ShortPercentFloat")
    private String shortPercentFloat;
    @JsonProperty("PercentInsiders")
    private String percentInsiders;
    @JsonProperty("PercentInstitutions")
    private String percentInstitutions;
    @JsonProperty("ForwardAnnualDividendRate")
    private String forwardAnnualDividendRate;
    @JsonProperty("ForwardAnnualDividendYield")
    private String forwardAnnualDividendYield;
    @JsonProperty("PayoutRatio")
    private String payoutRatio;
    @JsonProperty("DividendDate")
    private String dividendDate;
    @JsonProperty("ExDividendDate")
    private String exDividendDate;
    @JsonProperty("LastSplitFactor")
    private String lastSplitFactor;
    @JsonProperty("LastSplitDate")
    private String lastSplitDate;
}