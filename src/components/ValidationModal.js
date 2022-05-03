import { Grid, Box, Modal} from '@mui/material'
import Draggable from 'react-draggable';

const ValidationModal = (props) => { 

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      BackdropProps={{ style: { backgroundColor: "rgba(255,255,255,0.6)" } }} 
    >
      <Box justify="center" alignContent="center" alignItems="center" sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        p: 4
      }}>
        <Grid container justify="center" alignContent="center" xs={12} spacing={3}>
          {props.foundWordsDivs}
        </Grid>
      </Box>
    </Modal>
  )
}

export default ValidationModal