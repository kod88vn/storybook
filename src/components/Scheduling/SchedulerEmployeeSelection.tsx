import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React from 'react';

export const SchedulerEmployeeSelection = ({ owners, employeeSearchList, state, setState }: any) => {
  const handleIndividualViewChange = (event: SelectChangeEvent) => {
    if (event.target.value == '0') {
      let { resources } = state;
      var newResources = [...resources];
      newResources[0].instances = owners;
      setState({ ...state, resources: newResources, employeeSearchList: 0 });
    } else {
      let { resources } = state;
      const employee = owners.filter((item: any) => item.id.toString() == event.target.value)[0];
      var newResources = [...resources];
      newResources[0].instances = [employee];
      setState({ ...state, resources: newResources, employeeSearchList: Number(event.target.value) });
    }
  };

  return (
    <>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Employee Selection</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={employeeSearchList.toString()}
          label="Employee Selection"
          onChange={handleIndividualViewChange}
        >
          <MenuItem value={0}>All Employees</MenuItem>
          {owners.map((owner: any) => {
            return (
              <MenuItem value={owner.id} key={owner.id}>
                {owner.text}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};
