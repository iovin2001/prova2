import * as React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';

export default function Dashboard() {
  // Questo è un esempio e dovrebbe essere sostituito con i dati reali e la logica
  const nft = {
    name: "Yaku #7316",
    dailyYield: "4.00",
    totalYield: "47.84",
  };

  return (
    <Container maxWidth="xl">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BUY YAKU $0.0155 | MARKET ⬆️
          </Typography>
          <Button color="inherit">Solana: $157.89</Button>
          <Button color="inherit">Yaku/USDC $0.0155</Button>
          <Button color="inherit">Ethereum: $3233.37</Button>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="/path-to-your-nft-image.jpg" // Replace with your NFT image path
              alt={nft.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {nft.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {nft.dailyYield} / DAY
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Claim</Button>
              <Button size="small">Unstake</Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={8}>
          {/* Other data cards */}
        </Grid>
      </Grid>
    </Container>
  );
}
