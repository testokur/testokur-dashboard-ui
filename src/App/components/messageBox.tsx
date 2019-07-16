import React, { useState } from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles, Theme } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface Props {
  className?: string;
  message?: string;
  variant: keyof typeof variantIcon;
  hasCloseButton?: boolean;
}

export const messageBox: React.FC<Props> = (props) => {
  const [closed, setClosed] = useState(false);
  const classes = useStyles();
  const { className, message, variant, hasCloseButton, ...other } = props;
  const Icon = variantIcon[variant];
  var action: any;

  if (hasCloseButton) {
    action = [
      <IconButton key="close" aria-label="Close" color="inherit" onClick={() => setClosed(true)}>
        <CloseIcon className={classes.icon} />
      </IconButton>,
    ];
  }

  return closed ? (
    <></>
  ) : (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={action}
      {...other}
    />
  );
};

messageBox.defaultProps = {
  hasCloseButton: true,
};
