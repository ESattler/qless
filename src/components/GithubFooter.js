import GitHubIcon from '@mui/icons-material/GitHub';
import { Typography } from '@mui/material/';

const GithubFooter = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
        <GitHubIcon 
        onClick={event =>  window.open('https://github.com/ESattler/qless/', '_blank')}
        sx={{
          fontSize: 50,
          '&:hover': {
            opacity: 0.5
          }
        }} />
    </Typography>
  );
}

export default GithubFooter;