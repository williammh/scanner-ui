import { useState, useEffect, useContext, type MouseEvent } from 'react'
import { 
  Container, 
  Typography, 
} from '@mui/material'
import { DataGrid, type GridRowsProp, type GridColDef } from '@mui/x-data-grid';


export const Table = ({tableData}: {tableData: Array<object>}) => {


  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (tableData) {

      for (let symbol in tableData) {
        const description = tableData[symbol]['description'];
        const category = tableData[symbol]['category'];
        console.log(`${symbol} ${description} ${category}`);
      }

      const rowz = Object.values(tableData).map((s, i) => ({
        'id': i,
        'symbol': s.columns.symbol,
        'description': s.description,
        'category': s.category,
        'price': s.columns.price,
        'avg_vol_30_day': s.columns.avg_vol_30_day,
        'percent_change_today': s.columns.change_today,
        'percent_gap_today': s.columns.gap_today,
        'percent_change_open': s.columns.change_open,
        'percent_of_hod': s.columns.percent_of_hod,
        'percent_retracement_from_daily_high': s.columns.percent_retracement_from_daily_high,
        'percent_to_5_min_or_high': s.columns.percent_to_5_min_or_high,
        'percent_to_15_min_or_high': s.columns.percent_to_15_min_or_high,
        'percent_to_30_min_or_high': s.columns.percent_to_30_min_or_high,
        'percent_to_60_min_or_high': s.columns.percent_to_60_min_or_high,
        'reversal_daily': s.columns.reversal_daily,
        'percent_prev_day_high': s.columns.percent_prev_day_high,
        'reversal_weekly': s.columns.reversal_weekly,
        'percent_prev_week_high': s.columns.percent_prev_week_high,
        'reversal_monthly': s.columns.reversal_monthly,
        'percent_prev_month_high': s.columns.percent_prev_month_high,
      }));
  
      setRowData(rowz);

    }

  }, [tableData]);

  if (rowData) {
    console.log(rowData);
  }
  
  const columns: GridColDef[] = [
    { field: 'symbol', headerName: 'Symbol', width: 100 },
    // { field: 'description', headerName: 'Description', width: 200 },
    { field: 'category', headerName: 'Category', width: 100 },
    { field: 'price', headerName: 'Price', width: 100 },
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
