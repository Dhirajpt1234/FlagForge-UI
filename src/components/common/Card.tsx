import React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps, CardContent, CardActions } from '@mui/material';

export interface CardProps extends MuiCardProps {
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, actions, ...props }) => {
  return (
    <MuiCard {...props}>
      <CardContent>{children}</CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </MuiCard>
  );
};

export default Card;
