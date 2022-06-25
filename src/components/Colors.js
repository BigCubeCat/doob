import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {HEX_COLORS, COLOR_BUTTON_SIZE} from '../consts';
import React, {useState} from 'react';

export default function Colors({setCombinations}) {
  const [combination, setCombination] = useState([]);
  const [combinationString, setCombinationString] = useState("");

  const handleClick = id => {
    if (combination.length < 2) {
      setCombination([...combination, id]);
    } else {
      let _comb = [];
      _comb.push(id);
      setCombination(_comb);
    }
    setCombinationString(combination[0] + '' + combination[1]);
  };
  if (combination.length === 2) {
    let combString = combination[0] + "" + combination[1];
    setCombinations(combString);
  }
  return (
      <Grid sx={{flexGrow: 1}} container spacing={2}>
        {[0, 1].map((value) => (
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                {[0, 1, 2, 3].map((val) => (
                    <Grid key={val} item>
                      <Paper
                          onClick={() => handleClick(value * 4 + val)}
                          sx={{
                            height: COLOR_BUTTON_SIZE,
                            width: COLOR_BUTTON_SIZE,
                            backgroundColor: () =>
                                HEX_COLORS[value * 3 + val],
                          }}
                          elevation={combination.includes(value * 3 + val) ? 24 : 0}
                      />
                    </Grid>
                ))}
              </Grid>
            </Grid>
        ))}

      </Grid>
  );
}
