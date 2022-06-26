import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Player from './Player';
import {addToFavorite, updateColors} from '../database/methods';
import RateColors from './RateColors';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';


export default function PlaylistSong(
    {id, expanded, handleChange, videoId, title, user, songId, isMy},
) {
  return (

      <Accordion expanded={expanded}
                 onChange={handleChange(id)}
                 disableGutters={true}
                 square={false}
                 style={{maxHeight: user ? '100%' : '222px'}}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                          expandIcon={<ArrowForwardIosSharpIcon
                              sx={{fontSize: '0.9rem'}}/>}
                          style={{
                            textAlign: 'left'}}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        {(user && !isMy) ? <div style={{display: 'flex', flexDirection: 'row'}}>
          <Player videoId={videoId}/>
          <RateColors buttonScale={0.60} setCombinations={comb => {
            const fetchRequest = async () => {
              await updateColors(songId, comb);
              await addToFavorite(user.id, songId);
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