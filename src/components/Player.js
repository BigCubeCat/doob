import YouTube from 'react-youtube';
import {
  Card,
  CardMedia,
} from '@mui/material';

export default function Player({videoId, user}) {
  return (
      <Card sx={{background: '#e8e8e8', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
        <CardMedia>
            <YouTube
                opts={{
                  height: user ? '100%' : '170',
                  width: '100%',
                }}
                videoId={videoId}
            />
        </CardMedia>
      </Card>
  );
}
