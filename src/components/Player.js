import YouTube from 'react-youtube';
import {
  Card,
  CardMedia,
} from '@mui/material';

export default function Player({videoId}) {
  return (
      <Card sx={{display: 'flex'}}>
        <CardMedia
            sx={{width: 151}}
        >
          <YouTube
              videoId={videoId}
              style={{width: '10px', height: '10px'}}
          />
        </CardMedia>
      </Card>
  );
}
