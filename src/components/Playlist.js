import * as React from 'react';
import {getTracksByColors} from '../database/methods';
import {useEffect, useState} from 'react';
import PlaylistSong from './PlaylistSong';
import {useSelector} from 'react-redux';

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

  useEffect(() => {
    const fetchData = async () => {
      const [data, err] = await getTracksByColors(combination, isCartoons);
      if (!err) {
        setQueue(data);
      } else {
        setQueue([]);
      }

    };
    fetchData().catch(console.error);
  }, [combination, isCartoons]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
      <div>
        {queue ? queue.map((song, i) => {
          return <PlaylistSong
              id={i} expanded={i === expanded}
              videoId={getTrackId(song.link)}
              title={song.title}
              songId={song.id}
              handleChange={handleChange}
              user={user}
          />;
        }) : null}
      </div>
  );
}
