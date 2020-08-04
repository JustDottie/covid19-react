import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const buildChartData = (data, casesType = 'cases') => {
  const chartData = [];
  let lastDataPoint;

  for (let date in data[casesType]) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

export const showDataOnMap = (data, casesType = 'cases') =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }>
      <Popup>
        <div className='info'>
          <div
            className='info__flag'
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}></div>
          <div className='info__name'>{country.country}</div>
          <div className='info__cases'>
            Cases: {numeral(country.cases).format('0,0')}
          </div>
          <div className='info__recovered'>
            Recovered: {numeral(country.recovered).format('0,0')}
          </div>
          <div className='info__deaths'>
            Deaths: {numeral(country.deaths).format('0,0')}
          </div>
          <div></div>
        </div>
      </Popup>
    </Circle>
  ));

export const prettifyStat = (stat) => {
  if (stat && stat >= 10000) {
    return `+${numeral(stat).format('0.0a')}`;
  } else return `+${stat}`;
};
