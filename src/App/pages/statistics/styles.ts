import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  '@global': {
    '.MuiChip-label': {
      fontSize: '2rem',
      paddingLeft: 20,
    },
  },
  root: {
    flexGrow: 1,
  },
  title: {
    width: '100%',
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
});
