import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    flexBasis: 200,
  },
  button: {
    width: 160,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
});
