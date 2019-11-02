import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Theme, withStyles } from '@material-ui/core';

interface SelectProps {
  text: string;
  id: string;
  classes: any;
  value: string;
  onChange: (value: number) => void;
  items: any[];
}

const styles = (theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
});

const select = (props: SelectProps) => {
  return (
    <FormControl fullWidth variant="outlined" className={props.classes.formControl}>
      <InputLabel htmlFor={props.id}>{props.text}</InputLabel>
      <Select value={props.value} onChange={(e) => props.onChange(e.target.value as number)}>
        <MenuItem value="0">
          <em>Seciniz</em>
        </MenuItem>
        {props.items.map((record: any) => (
          <MenuItem key={record.id} value={record.id}>
            {record.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default withStyles(styles as any, { withTheme: true })(select);
