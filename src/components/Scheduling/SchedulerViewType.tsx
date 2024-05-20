import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React from 'react';

export const SchedulerViewType = ({ viewType, state, setState }: any) => {
  const handleViewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { viewType } = state;
    viewType = event.target.value;
    setState({ ...state, viewType });
  };

  return (
    <>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">View Type</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={viewType}
          onChange={handleViewChange}
        >
          <FormControlLabel value="day" control={<Radio />} label="Day" />
          <FormControlLabel value="week" control={<Radio />} label="Week" />
          <FormControlLabel value="month" control={<Radio />} label="Month" />
        </RadioGroup>
      </FormControl>
    </>
  );
};
