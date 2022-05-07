import GitHubIcon from '@mui/icons-material/GitHub';
import { Typography, Container, Divider } from '@mui/material/';

const GithubFooter = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        borderTop: (theme) => `1px solid #555a5e`,
        mt: 8,
        py: [3, 6],
        width: "64vw", maxWidth: "32rem", minWidth: "8rem"
      }}
    >
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
    </Container>
  );
}

export default GithubFooter;