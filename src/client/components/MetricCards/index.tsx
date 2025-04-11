import { MetricsInvite } from '@/server/Invite/getMetricsInvite';
import { Card, Grid2, Stack, Typography } from '@mui/material';

interface MetricCardsProps {
  metrics: MetricsInvite[];
}

export default function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <Grid2
      container
      spacing={6}
      direction="row"
      sx={{
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      {metrics.map((metric) => (
        <Grid2 key={metric.label} size={4}>
          <Card
            sx={{
              width: 'fit-content',
              padding: 2,
              backgroundColor: 'primary.light',
            }}
          >
            <Stack gap={2}>
              <Typography
                variant="h5"
                component={'h2'}
                sx={{ textWrap: 'nowrap' }}
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
            </Stack>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}
