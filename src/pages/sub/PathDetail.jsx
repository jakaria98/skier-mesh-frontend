import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

function PathDetail({ path }) {
    console.log(path)
  if (path != 'Nothing to show')
    return (
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        style={{ maxHeight: '40vh', overflow: 'auto' }}
      >
        {path &&
          path.map(item => {
            if ('slopeName' in item)
              return (
                <>
                  <ListItem key={item._id} alignItems='flex-start'>
                    <ListItemText
                      primary={`[${item.difficultyLevel}] Slope ${item.slopeName}: ${item.start.name} to ${item.end.name}`}
                      secondary={
                        <Container>
                          <Typography
                            sx={{ display: 'inline' }}
                            component='span'
                            variant='body2'
                            color='text.primary'
                          >
                            <p>Difficulty Level: {item.difficultyLevel}</p>
                            <p>Length: {item.length} meters</p>
                            <p>Incline: {item.incline}°</p>
                          </Typography>
                        </Container>
                      }
                    />
                  </ListItem>
                  <Divider variant='inset' component='li' />
                </>
              )
            else if ('liftID' in item)
              return (
                <>
                  <ListItem key={item._id} alignItems='flex-start'>
                    <ListItemText
                      primary={`[${item.type}] Lift ${item.name}: ${item.waypoints[0].name} to ${item.waypoints[1].name}`}
                      secondary={
                        <Container>
                          <Typography
                            sx={{ display: 'inline' }}
                            component='span'
                            variant='body2'
                            color='text.primary'
                          >
                            <p>Travel Time: {item.travelTime}</p>
                            <p>Type: {item.type}</p>
                          </Typography>
                        </Container>
                      }
                    />
                  </ListItem>
                  <Divider variant='inset' component='li' />
                </>
              )
          })}
      </List>
    )

  /*
    const modifiedPathArray = [];
    if (!Array.isArray(path)) {
        const pathArray0 = path.slopes;
        for (let i = 0; i < pathArray0.length; i++) {
            modifiedPathArray.push(' ');
            modifiedPathArray.push(pathArray0[i]);
        }
    }
    // Check if path is an array or not
    const pathArray = Array.isArray(path) ? path : modifiedPathArray;

    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            style={{ maxHeight: '40vh', overflow: 'auto' }}
        >
            {pathArray &&
                pathArray
                    .filter((item, index) => index % 2 == 1)
                    .map((slope) => (
                        <>
                            <ListItem key={slope._id} alignItems="flex-start">
                                <ListItemText
                                    primary={`${slope.start.name} to ${slope.end.name}`}
                                    secondary={
                                        <Container>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                <p>Difficulty Level: {slope.difficultyLevel}</p>
                                                <p>Length: {slope.length} meters</p>
                                                <p>Incline: {slope.incline}°</p>
                                            </Typography>
                                        </Container>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                    ))}
        </List>
    );
    */
}

export default PathDetail
