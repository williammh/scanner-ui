import { useState, useEffect, useContext, type MouseEvent } from 'react'
import { 
  Container, 
  Typography, 
} from '@mui/material'
import { DataGrid, type GridRowsProp, type GridColDef } from '@mui/x-data-grid';
import { SymbolsContext, getSymbols } from '../Context';

export const Table = () => {
  const { allSymbols, setAllSymbols } = useContext(SymbolsContext);
  useEffect(() => {
		(async (): Promise<void> => {
			setAllSymbols(await getSymbols());
		})();
	}, []);

  useEffect(() => {
    console.log(allSymbols);
	}, [allSymbols]);

  useEffect(() => {
    let i = 0
    const intervalSeconds = 2

    const timer = setInterval(() => {
      i++;
      console.log(i);
    }, intervalSeconds * 1000)

    return (() => {
      clearInterval(timer)
    })
  }, [])

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
    { field: 'volume', headerName: 'Volume', width: 100 },
    { field: 'percent_change_today', headerName: '% Change Today', width: 140 },
    { field: 'gap_percent_today', headerName: '% Gap Today', width: 120 },
    { field: 'percent_from_hod', headerName: '% from HOD', width: 100 },
    { field: '5_min_or_relative_volume', headerName: '5 min OR Relative Volume', width: 180 },
    { field: '15_min_or_relative_volume', headerName: '15 min OR Relative Volume', width: 180 },
    { field: '60_min_or_relative_volume', headerName: '60 min OR Relative Volume', width: 180 },
    { field: '5_day_percent_change', headerName: '5 Day % Change', width: 140 },
    { field: '30_day_percent_change', headerName: '30 Day % Change ', width: 140 },
    { field: '5_min_bar_reversal', headerName: '5 min 3 Bar Reversal', width: 140 },
    { field: '15_min_bar_reversal', headerName: '15 min 3 Bar Reversal', width: 140 },
  ];

  return (
      <DataGrid rows={rows} columns={columns} />
  )
}
