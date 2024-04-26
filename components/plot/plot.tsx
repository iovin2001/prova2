import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupIcon from '@mui/icons-material/Group';
import ShowChartIcon from '@mui/icons-material/ShowChart';

// You can style the Paper component using MUI's styled utility
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StatsCard = ({ title, value, icon }) => (
  <StyledPaper elevation={4}>
    {icon}
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4">{value}</Typography>
  </StyledPaper>
);

const StatsGroup = () => {
  // Replace these with actual values and icons
const stats = [
  { title: 'Total Staked', value: '19,754', icon: <GroupIcon /> },
  { title: 'TVL (SUSD)', value: '$1,434,721.17', icon: <AccountBalanceIcon /> },
  { title: 'SYAKU Distributed', value: '96,844,204.154', icon: <MonetizationOnIcon /> },
  { title: 'SYAKU Daily Yield', value: '4', icon: <ShowChartIcon /> },
];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard title={stat.title} value={stat.value} icon={stat.icon} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsGroup;
