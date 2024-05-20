import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  ViewState,
  GroupingState,
  IntegratedGrouping,
  IntegratedEditing,
  EditingState,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler as DxScheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  GroupingPanel,
  DayView,
  DragDropProvider,
  AppointmentForm,
  ViewSwitcher,
  Toolbar,
  WeekView,
  MonthView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { teal, indigo, yellow } from '@mui/material/colors';
import { TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { SchedulerViewType } from './SchedulerViewType';
import { SchedulerDateShortcuts } from './SchedulerDateShortcuts';
import { SchedulerEmployeeSelection } from './SchedulerEmployeeSelection';

const appointments = [
  {
    id: 0,
    title: 'Shaving',
    members: [1, 2],
    roomId: 1,
    statusId: 2,
    startDate: new Date().setHours(9, 0),
    endDate: new Date().setHours(10, 0),
  },
  {
    id: 1,
    title: 'Beard Trimming',
    members: [1],
    roomId: 2,
    statusId: 1,
    startDate: new Date().setHours(10, 30),
    endDate: new Date().setHours(12, 0),
  },
  {
    id: 2,
    title: 'Haircut',
    members: [1],
    roomId: 1,
    statusId: 2,
    startDate: new Date().setHours(11, 0),
    endDate: new Date().setHours(13, 0),
  },
];

const owners = [
  {
    text: 'Jim Raynor',
    id: 1,
    color: indigo,
  },
  {
    text: 'Sarah Kerrigan',
    id: 2,
    color: teal,
  },
];

const locations = [
  { text: 'Sunnyvale', id: 1 },
  { text: 'Alpharetta', id: 2 },
];

const statuses = [
  { text: 'Checked In', id: 1 },
  { text: 'Not Checked In', id: 2 },
];

const bookingOptions = [
  { text: 'In-person', id: 1 },
  { text: 'Over the Phone', id: 2 },
  { text: 'online', id: 3 },
];

const paymentStatus = [
  { text: 'open', id: 1 },
  { text: 'partial', id: 2 },
  { text: 'closed', id: 3 },
];

export const Scheduler = (props: any) => {
  const [state, setState] = useState({
    data: appointments,
    resources: [
      {
        fieldName: 'members',
        title: 'Members',
        instances: owners,
        allowMultiple: true,
      },
      {
        fieldName: 'roomId',
        title: 'Location',
        instances: locations,
      },
      {
        fieldName: 'statusId',
        title: 'Status',
        instances: statuses,
      },
      {
        fieldName: 'bookingSource',
        title: 'Booked using',
        instances: bookingOptions,
      },
      {
        fieldName: 'paymentStatus',
        title: 'Payment Status',
        instances: paymentStatus,
      },
    ],
    groupOrientation: (viewName: string) => viewName.split(' ')[0],
    grouping: [
      {
        resourceName: 'roomId',
      },
      {
        resourceName: 'members',
      },
    ],
    viewType: 'day',
    date: new Date().toISOString(),
    datePicker: dayjs(new Date().toISOString()),
    employeeSearchList: 0,
  });

  const commitChanges = ({ added, changed, deleted }: any) => {
    let { data } = state;
    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [...data, { id: startingAddedId, ...added }];
      setState({ ...state, data });
    }
    if (changed) {
      data = data.map(appointment =>
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment,
      );
      setState({ ...state, data });
    }
    if (deleted !== undefined) {
      data = data.filter(appointment => appointment.id !== deleted);
      setState({ ...state, data });
    }
  };

  const handleDatePickerChange = (newValue: Dayjs) => {
    setState({ ...state, date: newValue.toISOString(), datePicker: newValue });
  };

  const { data, resources, grouping, viewType, date, groupOrientation, datePicker, employeeSearchList } =
    state;
  return (
    <div>
      <div>
        <SchedulerViewType {...{ viewType, state, setState }} />
      </div>
      <div>
        <SchedulerDateShortcuts {...{ state, setState }} />
        <SchedulerEmployeeSelection {...{ owners, employeeSearchList, state, setState }} />
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            defaultValue={dayjs('2022-04-17')}
            value={datePicker}
            onChange={handleDatePickerChange}
            renderInput={params => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <Paper>
        <DxScheduler data={data}>
          <ViewState defaultCurrentDate={new Date().toISOString()} currentDate={date} />
          {!props.readOnly && <EditingState onCommitChanges={commitChanges} />}
          <GroupingState grouping={grouping} groupOrientation={groupOrientation} />

          {viewType == 'day' && (
            <DayView startDayHour={8} endDayHour={18} cellDuration={60} name="Vertical Orientation" />
          )}
          {viewType == 'day' && <DayView startDayHour={9} endDayHour={15} name="Horizontal Orientation" />}
          {viewType == 'week' && (
            <WeekView startDayHour={9} endDayHour={15} cellDuration={60} name="Vertical Orientation" />
          )}
          {viewType == 'week' && <WeekView startDayHour={9} endDayHour={15} name="Horizontal Orientation" />}
          {viewType == 'month' && <MonthView cellDuration={60} name="Vertical Orientation" />}
          {viewType == 'month' && <MonthView name="Horizontal Orientation" />}

          <Appointments />
          <Resources data={resources} mainResourceName="members" />

          <IntegratedGrouping />
          {!props.readOnly && <IntegratedEditing />}

          <AppointmentTooltip showOpenButton />
          {!props.readOnly && <AppointmentForm />}
          <GroupingPanel />
          <Toolbar />
          <ViewSwitcher />
          {!props.readOnly && <DragDropProvider />}
        </DxScheduler>
      </Paper>
    </div>
  );
};
