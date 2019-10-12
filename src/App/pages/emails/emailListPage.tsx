import React, { useEffect, useState } from 'react';
import { Email } from './types';
import { createNotificationApiClient } from '../../helpers/api';
import EmailList from './emailList';
import { TextField, InputAdornment, Button, Divider, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import { formatDateTime } from '../../helpers';
import { styles } from './styles';

interface Props {
  classes: any;
}

const component = (props: Props) => {
  const from = new Date();
  from.setDate(from.getDate() - 7);
  const to = new Date();
  to.setDate(from.getDate() + 1);

  const [startDate, setStartDate] = useState(formatDateTime(from));
  const [data, setData] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEmails = async () => {
    setLoading(true);
    setData(
      (await createNotificationApiClient().get(
        `/api/v1/emails?from=${new Date(startDate).toISOString()}&to=${to.toISOString()}`,
      )).data,
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div>
      <TextField
        id="filled-adornment-password"
        className={clsx(props.classes.margin, props.classes.textField)}
        variant="outlined"
        fullWidth
        type="text"
        label="Tarihinden Sonra"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Divider className={props.classes.divider} />
              <Button
                variant="contained"
                color="primary"
                onClick={async (e) =>
                  setData(
                    (await createNotificationApiClient().get(
                      `/api/v1/emails?from=${new Date(startDate).toISOString()}&to=${to.toISOString()}`,
                    )).data,
                  )
                }
                className={props.classes.button}
              >
                Filtrele
              </Button>
            </InputAdornment>
          ),
        }}
      />
      <EmailList data={data} loading={loading} />
    </div>
  );
};

export default withStyles(styles as any, { withTheme: true })(component as any) as any;
