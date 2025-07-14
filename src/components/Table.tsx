import { useState, useEffect, useContext, type MouseEvent } from 'react'
import { 
  Container, 
  Typography, 
} from '@mui/material'
import { DataGrid, type GridRowsProp, type GridColDef } from '@mui/x-data-grid';

const calcAvgVol30Day = (dayBars: Array<object>) => {
  const volumes = dayBars.map(bar => bar['TotalVolume']);
  return Math.round(volumes.reduce((sum, num) => sum + num, 0) / volumes.length);
}

const calcPercentChangeToday = (minuteBars, dayBars) => {
  const newPrice = minuteBars[minuteBars.length - 1]['Close'];
  const oldPrice = dayBars[dayBars.length - 1]['Close'];
  return ((newPrice - oldPrice) / Math.abs(oldPrice)) * 100;
}

const calcPercentGapToday = (minuteBars, dayBars) => {
  const newPrice = minuteBars[0]['Close'];
  const oldPrice = dayBars[dayBars.length - 1]['Close'];
  return ((newPrice - oldPrice) / Math.abs(oldPrice)) * 100;
}

const calcPercentChangeOpen = (minuteBars, dayBars) => {
  const newPrice = minuteBars[minuteBars.length - 1]['Close'];
  const oldPrice = minuteBars[0]['Open'];
  return ((newPrice - oldPrice) / Math.abs(oldPrice)) * 100;
}

const calcPercentHod = (hod, lod, price) => {
  return (price - lod) / (hod - lod) * 100;
}

const calcRetracementHod = (hod, lod, price) => {
  return (100 - (price - lod) / (hod - lod) * 100);
}

const calcPercent5MinOpeningRangeHigh = (minuteBars) => {
  const opening5Bars = minuteBars.slice(0,5);
  const high = Math.max(...opening5Bars.map(bar => bar['High']));
  const low = Math.min(...opening5Bars.map(bar => bar['Low']));
  const range = high - low;
  const price = minuteBars[minuteBars.length - 1]['Close']; 
  const diff = price - low;

  return (diff / range) * 100;
}

const calcPercent15MinOpeningRangeHigh = (minuteBars) => {
  const opening15Bars = minuteBars.slice(0,15);
  const high = Math.max(...opening15Bars.map(bar => bar['High']));
  const low = Math.min(...opening15Bars.map(bar => bar['Low']));
  const range = high - low;
  const price = minuteBars[minuteBars.length - 1]['Close']; 
  const diff = price - low;

  return (diff / range) * 100;
}

const calcPercent30MinOpeningRangeHigh = (minuteBars) => {
  const opening30Bars = minuteBars.slice(0,30);
  const high = Math.max(...opening30Bars.map(bar => bar['High']));
  const low = Math.min(...opening30Bars.map(bar => bar['Low']));
  const range = high - low;
  const price = minuteBars[minuteBars.length - 1]['Close']; 
  const diff = price - low;

  return (diff / range) * 100;
}

const calcPercent60MinOpeningRangeHigh = (minuteBars) => {
  const opening60Bars = minuteBars.slice(0,60);
  const high = Math.max(...opening60Bars.map(bar => bar['High']));
  const low = Math.min(...opening60Bars.map(bar => bar['Low']));
  const range = high - low;
  const price = minuteBars[minuteBars.length - 1]['Close']; 
  const diff = price - low;

  return (diff / range) * 100;
}

const calcBullishReversal = (bars) => {
  // if most recently closed bar makes a new low and if most recently closed bar is green
  const bars1to4 = bars.slice(bars.length - 5, bars.length - 1);
  const low1to4 = Math.min(bars1to4.map(bar => bar['Low']));
  const bar0 = bars[bars.length - 1];
  const isBar0Green = bar0['Close'] > bar0['Open'];
  return bar0['Low'] < low1to4 && isBar0Green;
}

const calcPercentPrevDayHigh = (minuteBars, dayBars) => {
  const yesterday = dayBars[dayBars.length - 1];
  const hod = yesterday['High'];
  const lod = yesterday['Low'];
  const price = minuteBars[minuteBars.length - 1]['Close']; 
  return Math.round((price - lod) / (hod - lod) * 100);
}


const calcPercentPrevWeekHigh = (minuteBars, weekBars) => {
  const prevWeek = weekBars[weekBars.length - 1];
  const hod = prevWeek['High'];
  const lod = prevWeek['Low'];
  const price = minuteBars[minuteBars.length - 1]['Close']; 
  return (price - lod) / (hod - lod) * 100;
}

const calcPercentPrevMonthHigh = (minuteBars, monthBars) => {
  const prevMonth = monthBars[monthBars.length - 1];
  const hod = prevMonth['High'];
  const lod = prevMonth['Low'];
  const price = minuteBars[minuteBars.length - 1]['Close']; 
  return (price - lod) / (hod - lod) * 100;
}


// BEARISH

const calcPercentLod = (hod, lod, price) => {
  return (hod - price) / (hod - lod) * 100;
}

const calcRetracementLod = (hod, lod, price) => {
  return (100 - (hod - price) / (hod - lod) * 100);
}

const calcPercent5MinOpeningRangeLow = (minuteBars) => {
  const opening5Bars = minuteBars.slice(0,5);
  const high = Math.max(...opening5Bars.map(bar => bar['High']));
  const low = Math.min(...opening5Bars.map(bar => bar['Low']));
  const range = high - low;
  const price = minuteBars[minuteBars.length - 1]['Close']; 
  const diff = high - price;

  return (diff / range) * 100;
}

const calcPercent15MinOpeningRangeLow = (minuteBars) => {
  const opening15Bars = minuteBars.slice(0,15);
  const high = Math.max(...opening15Bars.map(bar => bar['High']));
  const low = Math.min(...opening15Bars.map(bar => bar['Low']));
  const range = high - low;
  const price = minuteBars[minuteBars.length - 1]['Close']; 
  const diff = high - price;

  return (diff / range) * 100;
}

const calcPercent30MinOpeningRangeLow = (minuteBars) => {
  const opening30Bars = minuteBars.slice(0,30);
  const high = Math.max(...opening30Bars.map(bar => bar['High']));
  const low = Math.min(...opening30Bars.map(bar => bar['Low']));
  const range = high - low;
  const price = minuteBars[minuteBars.length - 1]['Close']; 
  const diff = high - price;

  return (diff / range) * 100;
}

const calcPercent60MinOpeningRangeLow = (minuteBars) => {
  const opening60Bars = minuteBars.slice(0,60);
  const high = Math.max(...opening60Bars.map(bar => bar['High']));
  const low = Math.min(...opening60Bars.map(bar => bar['Low']));
  const range = high - low;
  const price = minuteBars[minuteBars.length - 1]['Close']; 
  const diff = high - price;

  return (diff / range) * 100;
}

const calcBearishReversal = (bars) => {
  // if most recently closed bar makes a new high and if most recently closed bar is red
  const bars1to4 = bars.slice(bars.length - 5, bars.length - 1);
  const high1to4 = Math.max(bars1to4.map(bar => bar['High']));
  const bar0 = bars[bars.length - 1];
  const isBar0Red = bar0['Close'] < bar0['Open'];
  return bar0['High'] > high1to4 && isBar0Red;
}

const calcPercentPrevDayLow = (minuteBars, dayBars) => {
  const yesterday = dayBars[dayBars.length - 1];
  const hod = yesterday['High'];
  const lod = yesterday['Low'];
  const price = minuteBars[minuteBars.length - 1]['Close']; 
  return Math.round((price - lod) / (hod - lod) * 100);
}

const calcPercentPrevWeekLow = (minuteBars, weekBars) => {
  const prevWeek = weekBars[weekBars.length - 1];
  const hod = prevWeek['High'];
  const lod = prevWeek['Low'];
  const price = minuteBars[minuteBars.length - 1]['Close']; 
  return (price - lod) / (hod - lod) * 100;
}

const calcPercentPrevMonthLow = (minuteBars, monthBars) => {
  const prevMonth = monthBars[monthBars.length - 1];
  const hod = prevMonth['High'];
  const lod = prevMonth['Low'];
  const price = minuteBars[minuteBars.length - 1]['Close']; 
  return (price - lod) / (hod - lod) * 100;
}

export const Table = ({symbolData, direction}) => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (symbolData) {
      const rows = [];

      for (let symbol in symbolData) {
        const minuteBars = symbolData[symbol]['minute_bars'];
        const dayBars = symbolData[symbol]['day_bars'];
        const weekBars = symbolData[symbol]['week_bars'];
        const monthBars = symbolData[symbol]['month_bars'];

        const hod = Math.max(...minuteBars.map(bar => bar['High']));
        const lod = Math.min(...minuteBars.map(bar => bar['Low']));
        const price = minuteBars[minuteBars.length - 1]['Close']; 


        // console.log(symbol, symbolData[symbol]['description']);
        // console.log(minuteBars);
        // console.log(dayBars);
        // console.log(weekBars);
        // console.log(monthBars);

        if (direction === 'bullish') {
          rows.push({
            'id': rows.length,
            'symbol': symbol,
            'description': symbolData[symbol]['description'],
            'category': symbolData[symbol]['category'],
            'price': `${minuteBars[minuteBars.length - 1]['Close'].toFixed(2)}`,
            'avg_vol_30_day': calcAvgVol30Day(dayBars),
            'percent_change_today': `${calcPercentChangeToday(minuteBars, dayBars).toFixed(2)}%`,
            'percent_gap_today': `${calcPercentGapToday(minuteBars, dayBars).toFixed(2)}%`,
            'percent_change_open': `${calcPercentChangeOpen(minuteBars, dayBars).toFixed(2)}%`,
            'percent_of_hod': `${calcPercentHod(hod, lod, price).toFixed(0)}%`,
            'percent_retracement_from_daily_high': `${calcRetracementHod(hod, lod, price).toFixed(0)}%`,
            'percent_to_5_min_or_high': `${calcPercent5MinOpeningRangeHigh(minuteBars).toFixed(0)}%`,
            'percent_to_15_min_or_high': `${calcPercent15MinOpeningRangeHigh(minuteBars).toFixed(0)}%`,
            'percent_to_30_min_or_high': `${calcPercent30MinOpeningRangeHigh(minuteBars).toFixed(0)}%`,
            'percent_to_60_min_or_high': `${calcPercent60MinOpeningRangeHigh(minuteBars).toFixed(0)}%`,
            'reversal_daily': calcBullishReversal(dayBars),
            'percent_prev_day_high': `${calcPercentPrevDayHigh(minuteBars, dayBars).toFixed(0)}%`,
            'reversal_weekly': calcBullishReversal(weekBars),
            'percent_prev_week_high': `${calcPercentPrevWeekHigh(minuteBars, weekBars).toFixed(0)}%`,
            'reversal_monthly': calcBullishReversal(monthBars),
            'percent_prev_month_high': `${calcPercentPrevMonthHigh(minuteBars, monthBars).toFixed(0)}%`,
          });
        } else {
          rows.push({
            'id': rows.length,
            'symbol': symbol,
            'description': symbolData[symbol]['description'],
            'category': symbolData[symbol]['category'],
            'price': `${minuteBars[minuteBars.length - 1]['Close'].toFixed(2)}`,
            'avg_vol_30_day': calcAvgVol30Day(dayBars),
            'percent_change_today': `${calcPercentChangeToday(minuteBars, dayBars).toFixed(2)}%`,
            'percent_gap_today': `${calcPercentGapToday(minuteBars, dayBars).toFixed(2)}%`,
            'percent_change_open': `${calcPercentChangeOpen(minuteBars, dayBars).toFixed(2)}%`,
            'percent_of_lod': `${calcPercentLod(hod, lod, price).toFixed(0)}%`,
            'percent_retracement_from_daily_low': `${calcRetracementLod(hod, lod, price).toFixed(0)}%`,
            'percent_to_5_min_or_low': `${calcPercent5MinOpeningRangeLow(minuteBars).toFixed(0)}%`,
            'percent_to_15_min_or_low': `${calcPercent15MinOpeningRangeLow(minuteBars).toFixed(0)}%`,
            'percent_to_30_min_or_low': `${calcPercent30MinOpeningRangeLow(minuteBars).toFixed(0)}%`,
            'percent_to_60_min_or_low': `${calcPercent60MinOpeningRangeLow(minuteBars).toFixed(0)}%`,
            'reversal_daily': calcBearishReversal(dayBars),
            'percent_prev_day_low': `${calcPercentPrevDayLow(minuteBars, dayBars).toFixed(0)}%`,
            'reversal_weekly': calcBearishReversal(weekBars),
            'percent_prev_week_low': `${calcPercentPrevWeekLow(minuteBars, weekBars).toFixed(0)}%`,
            'reversal_monthly': calcBearishReversal(monthBars),
            'percent_prev_month_low': `${calcPercentPrevMonthLow(minuteBars, monthBars).toFixed(0)}%`,
          });
        }

      };

      setRowData(rows);

    }

  }, [symbolData]);

  if (rowData) {
    console.log(rowData);
  }
  
  if (direction === 'bullish') {
    const columns: GridColDef[] = [
      { field: 'symbol', headerName: 'Symbol', width: 80 },
      { field: 'description', headerName: 'Description', width: 220 },
      { field: 'category', headerName: 'Category', width: 100 },
      { field: 'price', headerName: 'Price', width: 80 },
      { field: 'avg_vol_30_day', headerName: '30 Day Avg Volume', width: 120 },
      { field: 'percent_change_today', headerName: 'Change Today', width: 120 },
      { field: 'percent_gap_today', headerName: 'Gap Today', width: 120 },
      { field: 'percent_change_open', headerName: 'Change Since Open', width: 120 },
      { field: 'percent_of_hod', headerName: '% HOD', width: 100 },
      { field: 'percent_retracement_from_daily_high', headerName: "Retracement Today's High", width: 160 },
      { field: 'percent_to_5_min_or_high', headerName: "% 5 min OR High", width: 140 },
      { field: 'percent_to_15_min_or_high', headerName: "% 15 min OR High", width: 140 },
      { field: 'percent_to_30_min_or_high', headerName: "% 30 min OR High", width: 140 },
      { field: 'percent_to_60_min_or_high', headerName: "% 60 min OR High", width: 140 },
      { field: 'reversal_daily', headerName: "Daily Reversal", width: 120 },
      { field: 'percent_prev_day_high', headerName: "% Prev Day High", width: 120 },
      { field: 'reversal_weekly', headerName: "Weekly Reversal", width: 120 },
      { field: 'percent_prev_week_high', headerName: "% Prev Week High", width: 120 },
      { field: 'reversal_monthly', headerName: "Monthly Reversal", width: 120 },
      { field: 'percent_prev_month_high', headerName: "% Prev Month High", width: 120 },
    ];
    return (
        <DataGrid rows={rowData} columns={columns} />
    )
  } else {
    const columns: GridColDef[] = [
      { field: 'symbol', headerName: 'Symbol', width: 80 },
      { field: 'description', headerName: 'Description', width: 220 },
      { field: 'category', headerName: 'Category', width: 100 },
      { field: 'price', headerName: 'Price', width: 80 },
      { field: 'avg_vol_30_day', headerName: '30 Day Avg Volume', width: 120 },
      { field: 'percent_change_today', headerName: 'Change Today', width: 120 },
      { field: 'percent_gap_today', headerName: 'Gap Today', width: 120 },
      { field: 'percent_change_open', headerName: 'Change Since Open', width: 120 },
      { field: 'percent_of_lod', headerName: '% LOD', width: 100 },
      { field: 'percent_retracement_from_daily_low', headerName: "Retracement Today's Low", width: 160 },
      { field: 'percent_to_5_min_or_low', headerName: "% 5 min OR Low", width: 140 },
      { field: 'percent_to_15_min_or_low', headerName: "% 15 min OR Low", width: 140 },
      { field: 'percent_to_30_min_or_low', headerName: "% 30 min OR Low", width: 140 },
      { field: 'percent_to_60_min_or_low', headerName: "% 60 min OR Low", width: 140 },
      { field: 'reversal_daily', headerName: "Daily Reversal", width: 120 },
      { field: 'percent_prev_day_low', headerName: "% Prev Day Low", width: 120 },
      { field: 'reversal_weekly', headerName: "Weekly Reversal", width: 120 },
      { field: 'percent_prev_week_low', headerName: "% Prev Week Low", width: 120 },
      { field: 'reversal_monthly', headerName: "Monthly Reversal", width: 120 },
      { field: 'percent_prev_month_low', headerName: "% Prev Month Low", width: 120 },
    ];
    
    return (
        <DataGrid rows={rowData} columns={columns} />
    )
  }

}
