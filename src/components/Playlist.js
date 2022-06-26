import * as React from 'react';
import {getTracksByColors, getUserFavorites} from '../database/methods';
import {useEffect, useState} from 'react';
import PlaylistSong from './PlaylistSong';
import {useSelector} from 'react-redux';
import {Tab, Tabs} from '@mui/material';

function getTrackId(url) {
  if (url.includes('.be/')) {
    if (url.includes('?list=')) {
      return url.split('.be/')[1].split('?list=')[0];
    }
    return url.split('.be/')[1];
  }
  return url.split('v=')[1];
}

export default function Playlist({combination, user}) {
  const isCartoons = useSelector(state => state).is_cartoons;
  const [expanded, setExpanded] = React.useState('0');
  const [queue, setQueue] = useState([]);
  const [tabId, setTabId] = React.useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [data, err] = await getTracksByColors(combination, isCartoons,
          tabId === 1 ?
              (await getUserFavorites(user ? user.id : '')) : null);
      if (!err) {
        setQueue(data);
      } else {
        setQueue([]);
      }

    };
    fetchData().catch(console.error);
  }, [combination, isCartoons, tabId]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
      <div>
        <Tabs
            value={tabId}
            onChange={(event, value) => setTabId(value)}
            textColor="primary"
            variant="fullWidth"
            indicatorColor="primary"
            aria-label="secondary tabs example"
        >
          <Tab value={0} label="Все"/>
          <Tab value={1} label="Мои"/>
        </Tabs>
        {queue ? queue.map((song, i) => {
          return <PlaylistSong
              id={i} expanded={i === expanded}
              videoId={getTrackId(song.link)}
              title={song.title}
              songId={song.id}
              handleChange={handleChange}
              user={user} isMy={tabId === 1}
          />;
        }) : null}
      </div>
  );
}
