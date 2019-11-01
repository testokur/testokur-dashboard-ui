import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    margin: theme.spacing(3),
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
    backgroundColor: theme.palette.primary.dark,
  },
});
