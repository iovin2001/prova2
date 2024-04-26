import React from 'react';
import { Paper, Typography, Grid, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupIcon from '@mui/icons-material/Group';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DiscordIcon from '@mui/icons-material/Send'; // Questo è solo un placeholder per il logo Discord

// Definizione delle prop per il componente StatsCard
interface StatsCardProps {
  title: string;
  value?: string;
  Icon: React.ReactElement;
  bgColor: string;
}

// Styled Paper component con colore di sfondo dinamico
const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<{ bgColor: string }>(({ theme, bgColor }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'white',
  backgroundColor: bgColor,
}));

// Componente StatsCard
const StatsCard: React.FC<StatsCardProps> = ({ title, value, Icon, bgColor }) => (
  <StyledPaper elevation={4} bgColor={bgColor}>
    {Icon}
    <Typography variant="h6">{title}</Typography>
    {value && <Typography variant="h4">{value}</Typography>}
    {title === 'Holder Verification' && (
      <Button variant="contained" color="primary" href="https://discord.com/invite/tuo-invito" target="_blank">
        Join on Discord
      </Button>
    )}
  </StyledPaper>
);

// Componente StatsGroup che include un gruppo di StatsCard
const StatsGroup: React.FC = () => {
  // Array di dati per le statistiche
  const stats = [
    { title: 'Total Staked', value: '19,754', Icon: <GroupIcon />, bgColor: '#33f4c8' },
    { title: 'TVL (SUSD)', value: '$1,434,721.17', Icon: <AccountBalanceIcon />, bgColor: '#33c7c8' },
    { title: 'SYAKU Distributed', value: '96,844,204.154', Icon: <MonetizationOnIcon />, bgColor: '#1dcdfe' },
    {
      title: 'Holder Verification',
      Icon: <DiscordIcon />, // Sostituire con il vero logo di Discord
      bgColor: '#18b1db',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, paddingTop: '100px' }}>
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard
              title={stat.title}
              value={stat.value}
              Icon={stat.Icon}
              bgColor={stat.bgColor}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsGroup;
