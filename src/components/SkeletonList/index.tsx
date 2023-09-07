import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SkeletonList = () => {
  return (
    <Stack spacing={1} mt={10}>
      <Skeleton variant="rectangular" width='100%' height={60} />
      <Skeleton variant="rectangular" width='100%' height={60} />
      <Skeleton variant="rectangular" width='100%' height={60} />
      <Skeleton variant="rectangular" width='100%' height={60} />
    </Stack>
  );
}

export default SkeletonList;