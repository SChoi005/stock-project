import {RadialChart, DiscreteColorLegend} from 'react-vis';

function PieGraph(props){
    
    const getData =()=>{
        var sum = 0;
        var data = [];
        props.stocks.forEach((i)=>{
            sum += (i["average_price"]*i["quantity"]);
        })
        props.stocks.forEach((i)=>{
            data.push({angle:(i["average_price"]*i["quantity"]/sum),label:i["name"], percent:(i["average_price"]*i["quantity"]/sum*100).toFixed(1)});
        })
        return data;
    }
    
    return (
        <div>
            <h2>포트폴리오 구성</h2>
            <RadialChart
                data={getData()}
                width={300}
                height={300}
                innerRadius={75}
                radius={115}
                animation
                showLabels={true}
            />
            <DiscreteColorLegend items={getData().map((d) => {return (d.label+" ("+d.percent+"%)");})} />
        </div>
    );
}

export default PieGraph;