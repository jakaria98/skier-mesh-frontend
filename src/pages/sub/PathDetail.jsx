import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



function PathDetail({ path }) {
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
}

export default PathDetail;
