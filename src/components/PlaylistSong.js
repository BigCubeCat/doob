import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import Typography from '@mui/material/Typography';
import Player from './Player';

export default function PlaylistSong(
    { id, expanded, handleChange, videoId, title }
) {
  return (
      <Accordion expanded={expanded}
                 onChange={handleChange(id)}
                style={{maxHeight: '209px', margin: "10px"}}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style= {{background: '#f7f5f5'}}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <Player videoId={videoId}/>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
  );
}