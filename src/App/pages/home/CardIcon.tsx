import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import { SvgIcon } from 'material-ui/SvgIcon';
import { styles } from './CardIcon.style';

interface Props {
  icon: (className: string) => SvgIcon;
  bgColor: string;
  classes: any;
}

const cardIcon: React.FC<Props> = (props) => {
  return (
    <Card className={props.classes.card} style={{ backgroundColor: props.bgColor }}>
      {props.icon(props.classes.icon)}
    </Card>
  );
};

export default withStyles(styles as any)(cardIcon as any);
