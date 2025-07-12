import { useState, useEffect, useContext, type MouseEvent } from 'react'
import { 
  Container, 
  Typography, 
} from '@mui/material'
import { DataGrid, type GridRowsProp, type GridColDef } from '@mui/x-data-grid';

const calcAvgVol30Day = (monthBars: Array<object>) => {
  const volumes = monthBars.map(bar => bar['TotalVolume']);
  return Math.round(volumes.reduce((sum, num) => sum + num, 0) / volumes.length);
}

const calcPercentChangeToday = (todayBars, monthBars) => {
  return Math.round(todayBars[todayBars.length - 1]['Close'] - monthBars[monthBars.length - 1]['Close'])
}

const calcPercentGapToday = (todayBars, monthBars) => {
  return Math.round(todayBars[0]['Close'] - monthBars[monthBars.length - 1]['Close'])
}

const calcPercentChangeOpen = (todayBars, monthBars) => {
  return Math.round(todayBars[todayBars.length - 1]['Close'] - todayBars[0]['Open'])
}

const calcPercentHod = (todayBars) => {
  const hod = Math.max(...todayBars.map(bar => bar['High']));
  const lod = Math.min(...todayBars.map(bar => bar['Low']));
  const price = todayBars[todayBars.length - 1]['Close']; 
  return Math.round((price - lod) / (hod - lod) * 100);
}

const calcRetracementHod = (todayBars) => {
  const hod = Math.max(...todayBars.map(bar => bar['High']));
  const lod = Math.min(...todayBars.map(bar => bar['Low']));
  const price = todayBars[todayBars.length - 1]['Close']; 
  return Math.round((100 - (price - lod) / (hod - lod) * 100));
}

const calcPercent5MinOpeningRange = (todayBars) => {
  const opening5Bars = todayBars.slice(0,5);
  const high = Math.max(...opening5Bars.map(bar => bar['High']));
  const low = Math.min(...opening5Bars.map(bar => bar['Low']));
  const range = high - low;
  const price = todayBars[todayBars.length - 1]['Close']; 
  const diff = price - low;

  return Math.round((diff / range) * 100);
}

const calcPercent15MinOpeningRange = (todayBars) => {
  const opening15Bars = todayBars.slice(0,15);
  const high = Math.max(...opening15Bars.map(bar => bar['High']));
  const low = Math.min(...opening15Bars.map(bar => bar['Low']));
  const range = high - low;
  const price = todayBars[todayBars.length - 1]['Close']; 
  const diff = price - low;

  return Math.round((diff / range) * 100);
}

const calcPercent30MinOpeningRange = (todayBars) => {
  const opening30Bars = todayBars.slice(0,30);
  const high = Math.max(...opening30Bars.map(bar => bar['High']));
  const low = Math.min(...opening30Bars.map(bar => bar['Low']));
  const range = high - low;
  const price = todayBars[todayBars.length - 1]['Close']; 
  const diff = price - low;

  return Math.round((diff / range) * 100);
}

const calcPercent60MinOpeningRange = (todayBars) => {
  const opening60Bars = todayBars.slice(0,60);
  const high = Math.max(...opening60Bars.map(bar => bar['High']));
  const low = Math.min(...opening60Bars.map(bar => bar['Low']));
  const range = high - low;
  const price = todayBars[todayBars.length - 1]['Close']; 
  const diff = price - low;

  return Math.round((diff / range) * 100);
}

export const Table = ({symbolData}) => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (symbolData) {
      console.log(symbolData);
      const rows = [];

      for (let symbol in symbolData) {
        const todayBars = symbolData[symbol]['today_bars'];
        const monthBars = symbolData[symbol]['month_bars'];

        rows.push({
          'id': rows.length,
          'symbol': symbol,
          'description': symbolData[symbol]['description'],
          'category': symbolData[symbol]['category'],
          'price': todayBars[todayBars.length - 1]['Close'],
          'avg_vol_30_day': calcAvgVol30Day(monthBars),
          'percent_change_today': calcPercentChangeToday(todayBars, monthBars),
          'percent_gap_today': calcPercentGapToday(todayBars, monthBars),
          'percent_change_open': calcPercentChangeOpen(todayBars, monthBars),
          'percent_of_hod': calcPercentHod(todayBars),
          'percent_retracement_from_daily_high': calcRetracementHod(todayBars),
          'percent_to_5_min_or_high': calcPercent5MinOpeningRange(todayBars),
          'percent_to_15_min_or_high': calcPercent15MinOpeningRange(todayBars),
          'percent_to_30_min_or_high': calcPercent30MinOpeningRange(todayBars),
          'percent_to_60_min_or_high': calcPercent60MinOpeningRange(todayBars),
          'reversal_daily': false,
          'percent_prev_day_high': 0,
          'reversal_weekly': false,
          'percent_prev_week_high': 0,
          'reversal_monthly': false,
          'percent_prev_month_high': 0,
        })
      };

      setRowData(rows);

    }

  }, [symbolData]);

  if (rowData) {
    console.log(rowData);
  }
  
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
}
