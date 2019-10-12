import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
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
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
    backgroundColor: theme.palette.primary.dark,
  },
});
