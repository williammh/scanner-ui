import { useState, useEffect, useContext, type MouseEvent } from 'react'
import { 
  Container, 
  Typography, 
} from '@mui/material'
import { DataGrid, type GridRowsProp, type GridColDef } from '@mui/x-data-grid';


export const Table = ({tableData}: {tableData: Array<object>}) => {

  console.log("BULLISH TABLE DATA");

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (tableData) {
      const rowz = Object.values(tableData).map((s, i) => ({
        'id': i,
        'symbol': s.columns.symbol,
        'price': s.columns.price,
        'percent_change_today': s.columns.change_today,
        'percent_gap_today': s.columns.gap_today,
        'percent_change_open': s.columns.change_open,
        'percent_to_5_min_or_high': s.columns.percent_to_5_min_or_high,
        'percent_to_15_min_or_high': s.columns.percent_to_15_min_or_high,
        'percent_to_30_min_or_high': s.columns.percent_to_30_min_or_high,
        'percent_retracement_from_daily_high': s.columns.percent_retracement_from_daily_high,
        'percent_to_daily_high': s.columns.percent_to_daily_high,
        'percent_to_weekly_high': s.columns.percent_to_weekly_high,
        'percent_to_monthly_high': s.columns.percent_to_monthly_high,
  
      }));
  
      setRowData(rowz);

    }

  }, [tableData]);

  console.log(rowData);

  

  const rows: GridRowsProp = [
    {
      id: 1,
      symbol: 'MESM25',
      description: 'Micro E-Mini S&P 500',
      price: 40002.25,
      percent_change_today: '3%',
      gap_percent_today: '12%',
      percent_from_hod: '90%',
      '5_min_or_relative_volume': '4%',
      '15_min_or_relative_volume': '200%',
      '60_min_or_relative_volume': 'N/A',
      '5_day_percent_change': '5%',
      '30_day_percent_change': '20%',
      '5_min_bar_reversal': true,
      '15_min_bar_reversal': false,
      'volume': 12354
    },
    { id: 2,
      symbol: 'MNQM25',
      description: 'Micro E-mini Nasdaq-100',
      price: 12415.25,
      percent_change_today: '3%',
      gap_percent_today: '12%',
      percent_from_hod: '90%',
      '5_min_or_relative_volume': '4%',
      '15_min_or_relative_volume': '200%',
      '60_min_or_relative_volume': 'N/A',
      '5_day_percent_change': '5%',
      '30_day_percent_change': '20%',
      '5_min_bar_reversal': true,
      '15_min_bar_reversal': false,
      'volume': 12354
    },
    { id: 3,
      symbol: 'M2KM25',
      description: 'Micro E-mini Russell 2000',
      price: 40002.75,
      percent_change_today: '3%',
      gap_percent_today: '12%',
      percent_from_hod: '90%',
      '5_min_or_relative_volume': '4%',
      '15_min_or_relative_volume': '200%',
      '60_min_or_relative_volume': 'N/A',
      '5_day_percent_change': '5%',
      '30_day_percent_change': '20%',
      '5_min_bar_reversal': true,
      '15_min_bar_reversal': false,
      'volume': 12354
    },
    { id: 4,
      symbol: 'MYMM25',
      description: 'Micro E-mini Dow',
      price: 40002.25,
      percent_change_today: '3%',
      gap_percent_today: '12%',
      percent_from_hod: '90%',
      '5_min_or_relative_volume': '4%',
      '15_min_or_relative_volume': '200%',
      '60_min_or_relative_volume': 'N/A',
      '5_day_percent_change': '5%',
      '30_day_percent_change': '20%',
      '5_min_bar_reversal': true,
      '15_min_bar_reversal': false,
      'volume': 12354
    },
  ];
  
  const columns: GridColDef[] = [
    { field: 'symbol', headerName: 'Symbol', width: 100 },
    // { field: 'description', headerName: 'Description', width: 200 },
    { field: 'price', headerName: 'Price', width: 100 },
    // { field: 'volume', headerName: 'Volume', width: 100 },
    { field: 'percent_change_today', headerName: 'Today Change', width: 100 },
    { field: 'percent_gap_today', headerName: 'Today Gap', width: 120 },
    { field: 'percent_change_open', headerName: 'Change Since Open', width: 120 },
    { field: '3_bar_reversal_daily', headerName: 'Daily 3 Bar Reversal', width: 120 },
    { field: '3_bar_reversal_weekly', headerName: 'Weekly 3 Bar Reversal', width: 120 },

    
    { field: 'percent_from_hod', headerName: '% to HOD', width: 100 },
    { field: '5min_or', headerName: 'BROKE 5min OR LOW & NEAR OR HIGH', width: 100 },
    { field: '15min_or', headerName: 'BROKE 15min OR LOW & NEAR OR HIGH', width: 100 },
    { field: '30min_or', headerName: 'BROKE 30min OR LOW & NEAR OR HIGH', width: 100 },
    { field: 'breakout_retest', headerName: 'BREAKOUT & RETEST', width: 100 },
    { field: '5_min_bar_reversal', headerName: '5 min 3 Bar Reversal', width: 140 },
    { field: '15_min_bar_reversal', headerName: '15 min 3 Bar Reversal', width: 140 },
    // { field: '5_min_or_relative_volume', headerName: '5 min OR Relative Volume', width: 180 },
    // { field: '15_min_or_relative_volume', headerName: '15 min OR Relative Volume', width: 180 },
    // { field: '60_min_or_relative_volume', headerName: '60 min OR Relative Volume', width: 180 },
  ];

  return (
      <DataGrid rows={rows} columns={columns} />
  )
}
