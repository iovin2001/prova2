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
}

// Styled Paper component
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StatsCard: React.FC<StatsCardProps> = ({ title, value, Icon }) => (
  <StyledPaper elevation={4}>
    {Icon}
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4">{value}</Typography>
  </StyledPaper>
);

const StatsGroup: React.FC = () => {
  // Stats data array
  const stats = [
    { title: 'Total Staked', value: '19,754', Icon: <GroupIcon /> },
    { title: 'TVL (SUSD)', value: '$1,434,721.17', Icon: <AccountBalanceIcon /> },
    { title: 'SYAKU Distributed', value: '96,844,204.154', Icon: <MonetizationOnIcon /> },
    { title: 'SYAKU Daily Yield', value: '4', Icon: <ShowChartIcon /> },
  ];

  return (
    <Box sx={{ flexGrow: 1 , paddingTop: '100px'}}>
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard title={stat.title} value={stat.value} Icon={stat.Icon} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsGroup;
