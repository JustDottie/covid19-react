import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import numeral from 'numeral';

export default function InfoBox({
  title,
  cases,
  isRed,
  total,
  active,
  ...props
}) {
  return (
    <Card
      className={`infoBox ${active && 'infoBox--selected'} ${
        isRed && 'infoBox--red'
      }
      `}
      onClick={props.onClick}>
      <CardContent>
        <Typography className='infoBox__title' color='textSecondary'>
          {title}
        </Typography>
        <h2
          className={`infoBox__cases ${
            !isRed && 'infoBox--green infoBox__recovered'
          }`}>
          {cases}
        </h2>
        <Typography className='infoBox__total'>
          {numeral(total).format('0,0')} Total
        </Typography>
      </CardContent>
    </Card>
  );
}
