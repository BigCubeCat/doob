import YouTube from 'react-youtube';
import {
    Card,
    Box,
    CardContent,
    Typography,
    IconButton,
    CardMedia,
} from "@mui/material";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {useTheme} from '@mui/material/styles';


export default function Player() {
    const theme = useTheme();
    return (
        <Card sx={{display: 'flex'}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography component="div" variant="h5">
                        Live From Space
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Mac Miller
                    </Typography>
                </CardContent>
                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon/> : <SkipPreviousIcon/>}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{height: 38, width: 38}}/>
                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon/> : <SkipNextIcon/>}
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                sx={{width: 151}}
            >
                <YouTube
                    videoId="dQw4w9WgXcQ"
                    style={{width: "10px", height: "10px"}}
                />
            </CardMedia>
        </Card>
    )
}
