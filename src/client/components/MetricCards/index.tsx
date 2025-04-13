import { MetricsInvite } from '@/server/Invite/getMetricsInvite';
import { Card, Grid2, Typography } from '@mui/material';

interface MetricCardsProps {
  metrics: MetricsInvite[];
}

export default function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <Grid2
      container
      spacing={2}
      direction="row"
      sx={{
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      {metrics.map((metric) => (
        <Grid2
          key={metric.label}
          size={{ xs: 12, sm: 6, md: 3, lg: 2 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card
            sx={{
              width: { xs: '150px' },
              height: { xs: '150px' },
              padding: 2,
              backgroundColor: 'primary.light',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              component={'h2'}
              sx={{ textWrap: { xs: 'pretty' } }}
            >
              {metric.label}
            </Typography>
            <Typography
              variant="h5"
              component={'h3'}
              color="primary.contrastText"
            >
              {metric.value}
            </Typography>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}
