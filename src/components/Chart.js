import React from 'react';
import Plot from 'react-plotly.js';

const Chart = ({ temperatures, time }) => {

    return (
        <Plot
        data={[
          {
            x: time,
            y: temperatures,
            type: 'line',
            marker: {color: '#1f77b4'},
          },
        ]}
        layout={{ autosize: true, title: 'Drone Temperature'}}
        style={{width: '100%'}}
      />
 
    );
}

export default Chart;