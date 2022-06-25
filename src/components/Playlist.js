import * as React from 'react';
import {styled} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {getTracksByColors} from '../database/methods';
import {useEffect, useState} from 'react';
import PlaylistSong from './PlaylistSong';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}}/>}
        {...props}
    />
))(({theme}) => ({
  backgroundColor:
      theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, .05)'
          : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Playlist({combination}) {
  const [expanded, setExpanded] = React.useState('0');
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [data, err] = await getTracksByColors(combination);
      if (!err) {
        console.log('data = ', data);
        setQueue(data);
      } else {
        setQueue([]);
      }

    };
    fetchData().catch(console.error);
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
      <div>
        {queue ? queue.map((song, i) => {
          return <PlaylistSong id={i} expanded={i == expanded}
                               videoId={song.link.split('v=')[1]}
                               title={song.title}
                               handleChange={handleChange}/>;
        }) : null}
      </div>
  );
}
