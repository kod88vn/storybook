import { ButtonGroup, Button } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

export const SchedulerDateShortcuts = ({ state, setState }: any) => {
  const handleDateChange = (dateToSet: string) => {
    var currDate = new Date();
    switch (dateToSet) {
      case 'yesterday':
        currDate.setDate(currDate.getDate() - 1);
        break;
      case 'tomorrow':
        currDate.setDate(currDate.getDate() + 1);
        break;
      case '4weeks':
        currDate.setDate(currDate.getDate() + 28);
        break;
      case '5weeks':
        currDate.setDate(currDate.getDate() + 35);
        break;
      case '6weeks':
        currDate.setDate(currDate.getDate() + 42);
        break;
      case '8weeks':
        currDate.setDate(currDate.getDate() + 56);
        break;
      default:
        currDate.setDate(currDate.getDate());
    }

    setState({ ...state, date: currDate.toISOString(), datePicker: dayjs(currDate.toISOString()) });
  };

  return (
    <>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => handleDateChange('yesterday')}>Yesterday</Button>
        <Button onClick={() => handleDateChange('today')}>Today</Button>
        <Button onClick={() => handleDateChange('tomorrow')}>Tomorrow</Button>
        <Button onClick={() => handleDateChange('4weeks')}>+4 Weeks</Button>
        <Button onClick={() => handleDateChange('5weeks')}>+5 Weeks</Button>
        <Button onClick={() => handleDateChange('6weeks')}>+6 Weeks</Button>
        <Button onClick={() => handleDateChange('8weeks')}>+8 Weeks</Button>
      </ButtonGroup>
    </>
  );
};
