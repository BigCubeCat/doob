import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {HEX_COLORS, COLOR_BUTTON_SIZE} from '../consts';

export default function Colors() {
  return (
      <Grid sx={{flexGrow: 1}} container spacing={2}>
        {[0, 1].map((value) => (
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                {[0, 1, 2, 3].map((val) => (
                    <Grid key={val} item>
                      <Paper
                          sx={{
                            height: COLOR_BUTTON_SIZE,
                            width: COLOR_BUTTON_SIZE,
                            backgroundColor: () =>
                                HEX_COLORS[value * 3 + val],
                          }}
                      />
                    </Grid>
                ))}
              </Grid>
            </Grid>
        ))}

      </Grid>
  );
}
