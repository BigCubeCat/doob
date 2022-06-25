import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Player from './Player';
import {updateColors} from '../database/methods';
import RateColors from './RateColors';

export default function PlaylistSong(
    {id, expanded, handleChange, videoId, title, user, songId},
) {
  return (
      <Accordion expanded={expanded}
                 onChange={handleChange(id)}
                 disableGutters={true}
                 square={false}
                 style={{maxHeight: user ? '100%' : '222px'}}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                          style={{
                            textAlign: 'left', background:
                                `linear-gradient(to right,  #edeffa 0%,white 50%, #edeffa 100%)`,
                          }}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        {user ? <div style={{display: 'flex', flexDirection: 'row'}}>
          <Player videoId={videoId}/>
          <RateColors buttonScale={0.60} setCombinations={comb => {
            const fetchRequest = async () => {
              await updateColors(songId, comb);
            };
            fetchRequest().catch(console.error);
          }}
          />
        </div> : <Player videoId={videoId}/>
        }
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
  );
}