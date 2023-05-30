import {
  CardContent,
  Card,
  Container,
  Typography,
  CardActionArea,
  CardActions,
} from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Card title="Welcome to my cool site">
        <CardContent>
          <Typography>This is gonna be awesome</Typography>
        </CardContent>
        <CardActionArea>
          <CardActions></CardActions>
        </CardActionArea>
      </Card>
    </Container>
  );
};

export default Home;
