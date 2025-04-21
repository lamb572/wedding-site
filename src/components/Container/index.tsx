import { Box } from '@mui/material';
import { OverrideProps } from '@mui/material/OverridableComponent';
import { BoxTypeMap } from '@mui/system';
import { PropsWithChildren } from 'react';

export interface ContainerProps
  extends OverrideProps<BoxTypeMap, React.ElementType>,
    PropsWithChildren {}

export function Container(props: ContainerProps) {
  return (
    <Box
      {...props}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, sm: 2, md: 3 },
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid black',
        padding: { xs: 1, sm: 2, md: 3 },
        backgroundColor: 'white',
        borderRadius: 4,
        ...props.sx,
      }}
    />
  );
}
