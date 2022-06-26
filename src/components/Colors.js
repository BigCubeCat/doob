import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {HEX_COLORS, COLOR_BUTTON_SIZE, COLOR_BUTTON_SELECTED} from '../consts';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

export default function Colors({buttonScale = 1, setCombinations}) {

  const isCartoons = useSelector(state => state).is_cartoons;

  const [combination, setCombination] = useState([]);
  const [combinationString, setCombinationString] = useState('');

  const handleClick = id => {
    if (combination.length < 2 && !combination.includes(id)) {
      setCombination([...combination, id]);
    } else {
      let _comb = [];
      _comb.push(id);
      setCombination(_comb);
    }
    setCombinationString(combination[0] + '' + combination[1]);
  };
  if (combination.length === 2) {
    let combString;
    if (combination[0] > combination[1]) {
      combString = combination[1] + '' + combination[0];
    } else {
      combString = combination[0] + '' + combination[1];
    }
    setCombinations(combString);

  }
  return (
      <div style={{padding: 10}}>
        <h3 style={{color: '#a3a3a3'}}>Выберите два различных цвета, чтобы получить подборку {isCartoons ? "видео" : "музыки"}</h3>
        <Grid sx={{flexGrow: 1}} container spacing={2}>
          {[0, 1].map((value) => (
              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                  {[0, 1, 2, 3].map((val) => (
                      <Grid key={val} item>
                        <Paper
                            onClick={() => handleClick(value * 4 + val)}
                            sx={{
                              height: COLOR_BUTTON_SIZE * buttonScale,
                              width: COLOR_BUTTON_SIZE * buttonScale,
                              borderRadius: combination.includes(
                                  value * 4 + val) ? 3 : 10,
                              backgroundColor: HEX_COLORS[value * 4 + val],
                            }}
                            elevation={10}
                        >
                          { /*
                            combination.includes(value * 4 + val) ?  <img src='/frame.png' width={COLOR_BUTTON_SIZE} /> : null
                          */}
                        </Paper>
                      </Grid>
                  ))}
                </Grid>
              </Grid>
          ))}
        </Grid>
      </div>
  );
}
