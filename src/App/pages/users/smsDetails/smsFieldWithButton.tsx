import React from 'react';
import { withStyles, TextField, Divider, Button, InputAdornment } from '@material-ui/core';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { styles } from './styles';
import clsx from 'clsx';

interface Props {
  classes: any;
  credit: number;
  onClick: () => void;
}

const smsFieldWithButton = (props: Props) => {
  return (
    <TextField
      id="filled-adornment-password"
      className={clsx(props.classes.margin, props.classes.textField)}
      variant="outlined"
      fullWidth
      type="text"
      label="SMS Kredisi"
      value={props.credit}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Divider className={props.classes.divider} />
            <Button onClick={props.onClick} variant="contained" color="primary" className={props.classes.button}>
              <AddCircleOutline className={props.classes.leftIcon}>ekle</AddCircleOutline>
              Kredi Ekle
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default withStyles(styles as any, { withTheme: true })(smsFieldWithButton as any) as any;
