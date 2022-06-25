import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import Typography from '@mui/material/Typography';
import Player from './Player';

export default function PlaylistSong(
    { id, expanded, handleChange, videoId, title }
) {
  return (
      <Accordion expanded={expanded}
                 onChange={handleChange(id)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{title}</Typography>
        </AccordionSummary>
        <Player videoId={videoId}/>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
  );
}