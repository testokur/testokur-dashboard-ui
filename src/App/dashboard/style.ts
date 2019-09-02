import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    minHeight: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    minHeight: '100%',
    height: '100%',
    flex: '1 1 auto',
    overflowY: 'scroll',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  footer: {
    marginBottom: 20,
    marginTop:20,
    bottom: 0,
    position: 'absolute'
  },
});
