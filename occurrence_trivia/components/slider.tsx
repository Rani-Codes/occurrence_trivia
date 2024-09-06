'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const MAX = 12;
const MIN = 1;
const marks = [
  {
    value: MIN,
    label: '',
  },
  {
    value: MAX,
    label: '',
  },
];

export default function CustomSlider() {
  const [val, setVal] = React.useState<number>(MIN);
  const handleChange = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
  };

  return (
    <Box sx={{ width: 3/12 }}>
      <Slider
        marks={marks}
        step={1}
        value={val}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        onChange={handleChange}
        sx={{
            color: '#eb5e28ff',
            '& .MuiSlider-thumb': {
              backgroundColor: '#eb5e28ff', // Color of the thumb
            },
            '& .MuiSlider-track': {
              backgroundColor: '#eb5e28ff', // Color of the track
            },
          }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="body2"
          onClick={() => setVal(MIN)}
          sx={{ cursor: 'pointer', fontSize: '1.25rem', fontWeight: 600 }}
        >
          January
        </Typography>
        <Typography
          variant="body2"
          onClick={() => setVal(MAX)}
          sx={{ cursor: 'pointer', fontSize: '1.25rem', fontWeight: 600 }}
        >
          December
        </Typography>
      </Box>
    </Box>
  );
}