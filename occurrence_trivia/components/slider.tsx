'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

interface bounds {
  lowerBound: number
  lowerName: string | number
  upperBound: number
  upperName: string | number
  onValueChange: (val: number) => void //Callback function prop to update parent component's val property
}

export default function CustomSlider({ lowerBound, upperBound, lowerName, upperName, onValueChange }: bounds) {

  const MAX = upperBound
  const MIN = lowerBound
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

  const [val, setVal] = React.useState<number>(MIN);
  const handleChange = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
    onValueChange(newValue as number) //where the updating happens for the parent component
  };
  const handleClick = (value: number) => {
    setVal(value);
    onValueChange(value) //updates parent component of the click value change
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
              backgroundColor: '#eb5e28ff',
            },
            '& .MuiSlider-track': {
              backgroundColor: '#eb5e28ff',
            },
          }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="body2"
          onClick={() => handleClick(MIN)}
          sx={{ cursor: 'pointer', fontSize: '1.25rem', fontWeight: 600 }}
        >
          {lowerName}
        </Typography>
        <Typography
          variant="body2"
          onClick={() => handleClick(MAX)}
          sx={{ cursor: 'pointer', fontSize: '1.25rem', fontWeight: 600 }}
        >
          {upperName}
        </Typography>
      </Box>
    </Box>
  );
}