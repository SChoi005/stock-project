import { RadialChart, DiscreteColorLegend } from 'react-vis';
import { Button } from 'react-bootstrap';
import React, { useState } from 'react';

function PieGraph(props) {
    const colors = [
        '#e2854c',
        '#698b69',
        '#747ba1',
        '#ffba77',
        '#cdc9c9',
        '#eee5de',
        '#eee9bf',
        '#698b69',
        '#d4af37',
        '#789048',
        '#602b2b',
        '#fffafa',
        '#eee9e9',
        '#cdc9a5',
        '#cdcdc1',
        '#e2854c',
        '#4d5886',
        '#d11141',
    ];

    const getData = () => {
        var sum = 0;
        var data = [];
        props.stocks.forEach((i) => {
            sum += i['average_price'] * i['quantity'];
        });
        var num = 0;
        props.stocks.forEach((i) => {
            const percent = ((i['average_price'] * i['quantity']) / sum) * 100;
            data.push({
                title: i['symbol'] + ' (' + percent.toFixed(1) + '%)',
                label: i['symbol'],
                angle: percent,
                color: colors[num++],
                strokeWidth: 4,
            });
        });
        return data;
    };

    const [value, setValue] = useState({ isAssetOpen: true });

    const assetClick = (e) => {
        setValue({ isAssetOpen: true });
    };

    const allocationClick = (e) => {
        setValue({ isAssetOpen: false });
    };

    return (
        <div>
            <h4>포트폴리오 구성</h4>
            <Button onClick={assetClick}>자산구성</Button>
            <Button onClick={allocationClick}>배당구성</Button>
            {value.isAssetOpen ? (
                <div>
                    <RadialChart
                        data={getData()}
                        width={300}
                        height={300}
                        innerRadius={75}
                        radius={115}
                        animation={'gentle'}
                        showLabels={true}
                        orientation="vertical"
                        colorType="literal"
                        padAngle={0.04}
                        onValueMouseOver={null}
                        onValueMouseOut={null}
                        onValueClick={null}
                    />
                    <DiscreteColorLegend items={getData()} />
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default PieGraph;