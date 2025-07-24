// @ts-nocheck
import { useState, useEffect } from 'react'
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import './Table.css';

// Both
const calcAvgVol30Day = (dayBars: Array<object>) => {
  const volumes = dayBars.map(bar => bar['TotalVolume']);
  return Math.round(volumes.reduce((sum, num) => sum + num, 0) / volumes.length);
}

const calcPercentChangeToday = (currentPrice, dayBars) => {
  const oldPrice = dayBars[dayBars.length - 1]['Close'];
  return ((currentPrice - oldPrice) / Math.abs(oldPrice)) * 100;
}

const calcPercentGapToday = (gapPrice, dayBars) => {
  const oldPrice = dayBars[dayBars.length - 1]['Close'];
  return ((gapPrice - oldPrice) / Math.abs(oldPrice)) * 100;
}

const calcPercentChangeOpen = (currentPrice, minuteBars) => {
  const oldPrice = minuteBars[0]['Open'];
  return ((currentPrice - oldPrice) / Math.abs(oldPrice)) * 100;
}

// Bullish

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

const calcPercentPrevDayHigh = (price, dayBars) => {
  const prevDay = dayBars[dayBars.length - 1];
  const prevDayHigh = prevDay['High'];
  const prevDayLow = prevDay['Low'];
  return (price - prevDayLow) / (prevDayHigh - prevDayLow) * 100;
}

const calcPercentPrevWeekHigh = (price, weekBars) => {
  const prevWeek = weekBars[weekBars.length - 1];
  const prevWeekHigh = prevWeek['High'];
  const prevWeekLow = prevWeek['Low'];
  return (price - prevWeekLow) / (prevWeekHigh - prevWeekLow) * 100;
}

const calcPercentPrevMonthHigh = (price, monthBars) => {
  const prevMonth = monthBars[monthBars.length - 1];
  const prevMonthHigh = prevMonth['High'];
  const prevMonthLow = prevMonth['Low'];
  return (price - prevMonthLow) / (prevMonthHigh - prevMonthLow) * 100;
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

const calcPercentPrevDayLow = (price, dayBars) => {
  const yesterday = dayBars[dayBars.length - 1];
  const prevDayHigh = yesterday['High'];
  const prevDayLow = yesterday['Low'];
  return (prevDayHigh - price) / (prevDayHigh - prevDayLow) * 100;
}

const calcPercentPrevWeekLow = (price, weekBars) => {
  const prevWeek = weekBars[weekBars.length - 1];
  const prevWeekHigh = prevWeek['High'];
  const prevWeekLow = prevWeek['Low'];
  return (prevWeekHigh - price) / (prevWeekHigh - prevWeekLow) * 100;
}

const calcPercentPrevMonthLow = (price, monthBars) => {
  const prevMonth = monthBars[monthBars.length - 1];
  const prevMonthHigh = prevMonth['High'];
  const prevMonthLow = prevMonth['Low'];
  return (prevMonthHigh - price) / (prevMonthHigh - prevMonthLow) * 100;
}

const getSundaysInMonth = (date) => {
  const sundays = [];
  const year = date.getFullYear();
  const month = date.getMonth();
  const dayPointer = new Date(year, month, 1);

  while (dayPointer.getMonth() === month) {
    if (dayPointer.getDay() === 0) {
      sundays.push(dayPointer.getDate());
    }
    dayPointer.setDate(dayPointer.getDate() + 1);
  }

  return sundays;
}

const isDST = (date = new Date()) => {
  // Treat date as UTC date, then reinterpret as US date (same day of month)
  const localDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const month = localDate.getMonth() + 1; // JS months are 0-based
  const day = localDate.getDate();
  const sundays = getSundaysInMonth(localDate);

  const dstMap = {
    1: false,
    2: false,
    3: day >= sundays[1], // Second Sunday
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: day < sundays[0], // First Sunday
    12: false
  };

  return dstMap[month];
}

export const Table = ({symbolData, direction}) => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (symbolData) {
      const rows = [];

      for (let symbol in symbolData) {
        const minuteBarsUncropped = symbolData[symbol]['minute_bars'];
        const rfc3339String = minuteBarsUncropped[minuteBarsUncropped.length - 1]['TimeStamp'];
        const date = new Date(rfc3339String);
        const isTodayDst = isDST(date);
        const UtcOpenHour = isTodayDst ? 13 : 14;

        const minuteBars = minuteBarsUncropped.filter(bar => {
          const barClose = new Date(bar['TimeStamp']);
          return (barClose.getUTCHours() > UtcOpenHour) || (barClose.getUTCHours() === UtcOpenHour && barClose.getUTCMinutes() > 30); 
        });
        const dayBars = symbolData[symbol]['day_bars'];
        const weekBars = symbolData[symbol]['week_bars'];
        const monthBars = symbolData[symbol]['month_bars'];
        
        const hod = Math.max(...minuteBars.map(bar => bar['High']));
        const lod = Math.min(...minuteBars.map(bar => bar['Low']));
        const gapPrice = symbolData[symbol]['minute_bars'][0]['Open']; 
        const currentPrice = minuteBars[minuteBars.length - 1]['Close']; 

        console.log(symbol);
        console.log(minuteBars);

        if (direction === 'bullish') {
          rows.push({
            'id': rows.length,
            'symbol': symbol,
            'description': symbolData[symbol]['description'],
            'category': symbolData[symbol]['category'],
            'price': `${minuteBars[minuteBars.length - 1]['Close'].toFixed(2)}`,
            'avg_vol_30_day': calcAvgVol30Day(dayBars),
            'percent_change_today': `${calcPercentChangeToday(currentPrice, dayBars).toFixed(2)}%`,
            'percent_gap_today': `${calcPercentGapToday(gapPrice, dayBars).toFixed(2)}%`,
            'percent_change_open': `${calcPercentChangeOpen(currentPrice, minuteBars).toFixed(2)}%`,
            'percent_of_hod': `${calcPercentHod(hod, lod, currentPrice).toFixed(0)}%`,
            'percent_retracement_from_daily_high': `${calcRetracementHod(hod, lod, currentPrice).toFixed(0)}%`,
            'percent_to_5_min_or_high': `${calcPercent5MinOpeningRangeHigh(minuteBars).toFixed(0)}%`,
            'percent_to_15_min_or_high': `${calcPercent15MinOpeningRangeHigh(minuteBars).toFixed(0)}%`,
            'percent_to_30_min_or_high': `${calcPercent30MinOpeningRangeHigh(minuteBars).toFixed(0)}%`,
            'percent_to_60_min_or_high': `${calcPercent60MinOpeningRangeHigh(minuteBars).toFixed(0)}%`,
            'reversal_daily': calcBullishReversal(dayBars) ? 'YES' : 'NO',
            'percent_prev_day_high': `${calcPercentPrevDayHigh(currentPrice, dayBars).toFixed(0)}%`,
            'reversal_weekly': calcBullishReversal(weekBars) ? 'YES' : 'NO',
            'percent_prev_week_high': `${calcPercentPrevWeekHigh(currentPrice, weekBars).toFixed(0)}%`,
            'reversal_monthly': calcBullishReversal(monthBars) ? 'YES' : 'NO',
            'percent_prev_month_high': `${calcPercentPrevMonthHigh(currentPrice, monthBars).toFixed(0)}%`,
          });
        } else {
          rows.push({
            'id': rows.length,
            'symbol': symbol,
            'description': symbolData[symbol]['description'],
            'category': symbolData[symbol]['category'],
            'price': `${minuteBars[minuteBars.length - 1]['Close'].toFixed(2)}`,
            'avg_vol_30_day': calcAvgVol30Day(dayBars),
            'percent_change_today': `${calcPercentChangeToday(currentPrice, dayBars).toFixed(2)}%`,
            'percent_gap_today': `${calcPercentGapToday(currentPrice, dayBars).toFixed(2)}%`,
            'percent_change_open': `${calcPercentChangeOpen(currentPrice, minuteBars).toFixed(2)}%`,
            'percent_of_lod': `${calcPercentLod(hod, lod, currentPrice).toFixed(0)}%`,
            'percent_retracement_from_daily_low': `${calcRetracementLod(hod, lod, currentPrice).toFixed(0)}%`,
            'percent_to_5_min_or_low': `${calcPercent5MinOpeningRangeLow(minuteBars).toFixed(0)}%`,
            'percent_to_15_min_or_low': `${calcPercent15MinOpeningRangeLow(minuteBars).toFixed(0)}%`,
            'percent_to_30_min_or_low': `${calcPercent30MinOpeningRangeLow(minuteBars).toFixed(0)}%`,
            'percent_to_60_min_or_low': `${calcPercent60MinOpeningRangeLow(minuteBars).toFixed(0)}%`,
            'reversal_daily': calcBearishReversal(dayBars) ? 'YES' : 'NO',
            'percent_prev_day_low': `${calcPercentPrevDayLow(currentPrice, dayBars).toFixed(0)}%`,
            'reversal_weekly': calcBearishReversal(weekBars) ? 'YES' : 'NO',
            'percent_prev_week_low': `${calcPercentPrevWeekLow(currentPrice, weekBars).toFixed(0)}%`,
            'reversal_monthly': calcBearishReversal(monthBars) ? 'YES' : 'NO',
            'percent_prev_month_low': `${calcPercentPrevMonthLow(currentPrice, monthBars).toFixed(0)}%`,
          });
        }

      };

      setRowData(rows);

    }

  }, [symbolData]);

  if (rowData) {
    console.log(rowData);
  }

  const bullishColorPercent = (params) => {
    const val = parseInt(params.value);
    if (val >= 80 && val < 100) {
      return 'bg-green'
    } else if (val >= 100) {
      return 'bg-white'
    };
    return '';
  }

  const bullishColorYes = (params) => {
    if (params.value === "YES") {
      return 'bg-green'
    }
    return '';
  }

  const bearishColorPercent = (params) => {
    const val = parseInt(params.value);
    if (val >= 80 && val < 100) {
      return 'bg-red'
    } else if (val >= 100) {
      return 'bg-white'
    };
    return '';
  }

  const bearishColorYes = (params) => {
    if (params.value === "YES") {
      return 'bg-red'
    }
    return '';
  }

  const sharedColumns: GridColDef[] = [
    {
        field: 'symbol',
        headerName: 'Symbol',
        width: 100,
        sortable: false,
      },
      {
        field: 'description',
        headerName: 'Description',
        width: 220,
        sortable: false,
      },
      {
        field: 'category',
        headerName: 'Category',
        width: 100,
        sortable: false,
      },
      {
        field: 'price',
        headerName: 'Price',
        width: 80,
        sortable: false,
      },
      {
        field: 'avg_vol_30_day',
        headerName: 'Avg Vol 30 Day',
        width: 120,
        sortable: false,
      },
      {
        field: 'percent_change_today',
        headerName: 'Change Today',
        width: 120,
        sortable: true,
      },
      {
        field: 'percent_gap_today',
        headerName: 'Gap Today',
        width: 100,
        sortable: true,
      },
      {
        field: 'percent_change_open',
        headerName: 'Change Since Open',
        width: 160,
        sortable: true,
      },
  ]

  const bullishColumns: GridColDef[] = [
      ...sharedColumns,
      {
        field: 'percent_retracement_from_daily_high',
        headerName: "Retrace HOD",
        width: 120,
        sortable: true,
        cellClassName: (params) => {
          const val = parseInt(params.value);
          if (val >= 34 && val <= 42) {
            return 'bg-green'
          }
          return '';
        },
      },
      {
        field: 'percent_of_hod',
        headerName: '% HOD',
        width: 80,
        sortable: true,
        cellClassName: bullishColorPercent
      },
      {
        field: 'percent_prev_day_high',
        headerName: "% Prev Day High",
        width: 140,
        sortable: true,
        cellClassName: bullishColorPercent
      },
      {
        field: 'percent_to_5_min_or_high',
        headerName: "% 5 min OR High",
        width: 140,
        sortable: true,
        cellClassName: bullishColorPercent
      },
      {
        field: 'percent_to_15_min_or_high',
        headerName: "% 15 min OR High",
        width: 140,
        sortable: true,
        cellClassName: bullishColorPercent
      },
      {
        field: 'percent_to_30_min_or_high',
        headerName: "% 30 min OR High",
        width: 140,
        sortable: true,
        cellClassName: bullishColorPercent
      },
      // {
      //   field: 'percent_to_60_min_or_high',
      //   headerName: "% 60 min OR High",
      //   width: 120,
      //   cellClassName: bullishColorPercent
      // },
      // {
      //   field: 'reversal_daily',
      //   headerName: "Daily Reversal",
      //   width: 80,
      //   cellClassName: bullishColorYes
      // },
    
      // {
      //   field: 'reversal_weekly',
      //   headerName: "Weekly Reversal",
      //   width: 80,
      //   cellClassName: bullishColorYes
      // },
      // {
      //   field: 'percent_prev_week_high',
      //   headerName: "% Prev Week High",
      //   width: 80,
      //   cellClassName: bullishColorPercent
      // },
      // {
      //   field: 'reversal_monthly',
      //   headerName: "Monthly Reversal",
      //   width: 80,
      //   cellClassName: bullishColorYes
      // },
      // {
      //   field: 'percent_prev_month_high',
      //   headerName: "% Prev Month High",
      //   width: 80,
      //   cellClassName: bullishColorPercent
      // },
    ];

    const bearishColumns: GridColDef[] = [
      ...sharedColumns,
      {
        field: 'percent_retracement_from_daily_low',
        headerName: "Retrace LOD",
        width: 120,
        sortable: true,
        cellClassName: (params) => {
          const val = parseInt(params.value);
          if (val >= 34 && val <= 42) {
            return 'bg-red'
          }
          return '';
        },
      },
      {
        field: 'percent_of_lod',
        headerName: '% LOD',
        width: 80,
        sortable: true,
        cellClassName: bearishColorPercent
      },
      {
        field: 'percent_prev_day_low',
        headerName: "% Prev Day Low",
        width: 140,
        sortable: true,
        cellClassName: bearishColorPercent
      },
      {
        field: 'percent_to_5_min_or_low',
        headerName: "% 5 min OR Low",
        width: 140,
        sortable: true,
        cellClassName: bearishColorPercent
      },
      {
        field: 'percent_to_15_min_or_low',
        headerName: "% 15 min OR Low",
        width: 140,
        sortable: true,
        cellClassName: bearishColorPercent
      },
      {
        field: 'percent_to_30_min_or_low',
        headerName: "% 30 min OR Low",
        width: 140,
        sortable: true,
        cellClassName: bearishColorPercent
      },
      // {
      //   field: 'percent_to_60_min_or_low',
      //   headerName: "% 60 min OR Low",
      //   width: 120,
      //   cellClassName: bearishColorPercent
      // },
      // {
      //   field: 'reversal_daily',
      //   headerName: "Daily Reversal",
      //   width: 80,
      //   cellClassName: bearishColorYes
      // },
    
      // {
      //   field: 'reversal_weekly',
      //   headerName: "Weekly Reversal",
      //   width: 80,
      //   cellClassName: bearishColorYes
      // },
      // {
      //   field: 'percent_prev_week_low',
      //   headerName: "% Prev Week High",
      //   width: 80,
      //   cellClassName: bearishColorPercent
      // },
      // {
      //   field: 'reversal_monthly',
      //   headerName: "Monthly Reversal",
      //   width: 80,
      //   cellClassName: bearishColorYes
      // },
      // {
      //   field: 'percent_prev_month_low',
      //   headerName: "% Prev Month Low",
      //   width: 80,
      //   cellClassName: bearishColorPercent
      // },
    ];

  const columns = direction === 'bullish' ? bullishColumns : bearishColumns;

  return (
    <DataGrid
      rows={rowData}
      columns={columns}
      initialState={{
        columns: {
          columnVisibilityModel: {
            'description': false,
            'category': false,
          },
        },
      }}
      // density={'compact'}
    />
  )

}
