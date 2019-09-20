import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  main: {
    flex: '1',
    marginLeft: '1em',
    marginTop: 20,
  },
  list: {
    maxHeight: 255,
    overflow: 'auto',
  },
  card: {
    padding: '16px 0',
    overflow: 'inherit',
    textAlign: 'right',
  },
  title: {
    padding: '0 16px',
  },
  value: {
    padding: '0 16px',
    minHeight: 48,
  },
  avatar: {
    background: theme.palette.background,
  },
  listItemText: {
    paddingRight: 0,
  },
});
