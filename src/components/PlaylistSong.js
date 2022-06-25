import React, {useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  colors,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Player from './Player';
import Colors from './Colors';
import {updateColors} from '../database/methods';

export default function PlaylistSong(
    {id, expanded, handleChange, videoId, title, user, songId},
) {
  return (
      <Accordion expanded={expanded}
                 onChange={handleChange(id)}
                 style={{maxHeight: '209px', margin: '10px'}}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                          style={{background: '#f7f5f5'}}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        {user ? <div style={{display: 'flex', flexDirection: 'row'}}>
          <Player videoId={videoId}/>
          <Colors buttonScale={0.75} setCombinations={comb => {
            const fetchRequest = async () => {
              await updateColors(songId, comb);
            };
            fetchRequest().catch(console.error);
          }}
          />
          }
        </div> : <Player videoId={videoId}/>
        }
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
  );
}