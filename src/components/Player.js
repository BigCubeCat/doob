import YouTube from 'react-youtube';
import {
  Card,
  CardMedia,
} from '@mui/material';

export default function Player({videoId}) {
  console.warn(videoId)
  return (
      <Card sx={{display: 'flex'}}>
        <CardMedia
            sx={{width: 151}}
        >
          <YouTube
              videoId={videoId}
          />
        </CardMedia>
      </Card>
  );
}
