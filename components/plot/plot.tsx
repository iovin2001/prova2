import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupIcon from '@mui/icons-material/Group';
import ShowChartIcon from '@mui/icons-material/ShowChart';

// Define the props for the StatsCard component
interface StatsCardProps {
  title: string;
  value: string;
  Icon: React.ReactElement;
  bgColor: string; // Aggiunto questo prop per lo sfondo
}

// Styled Paper component with dynamic background color
const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<{ bgColor: string }>(({ theme, bgColor }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'white', // Testo impostato su bianco
  backgroundColor: bgColor, // Colore di sfondo dinamico
}));

const StatsCard: React.FC<StatsCardProps> = ({ title, value, Icon, bgColor }) => (
  <StyledPaper elevation={4} bgColor={bgColor}>
    {Icon}
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4">{value}</Typography>
  </StyledPaper>
);

const StatsGroup: React.FC = () => {
  // Stats data array
  const stats = [
    { title: 'Total Staked', value: '19,754', Icon: <GroupIcon />, bgColor: '#24ab8c' },
    { title: 'TVL (SUSD)', value: '$1,434,721.17', Icon: <AccountBalanceIcon />, bgColor: '#248b8c' },
    { title: 'SYAKU Distributed', value: '96,844,204.154', Icon: <MonetizationOnIcon />, bgColor: '#148fb2' },
    { title: 'SYAKU Daily Yield', value: '4', Icon: <ShowChartIcon />, bgColor: '#17c999' },
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
              bgColor={stat.bgColor} // Applico il colore di sfondo
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsGroup;
