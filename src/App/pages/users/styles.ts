import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
    backgroundColor: theme.palette.primary.dark,
  },
});
