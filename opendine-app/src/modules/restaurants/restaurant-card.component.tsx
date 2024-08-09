
import { RestaurantDto } from "./models/restaurant.model";
import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Paper } from '@mui/material';
import { red } from '@mui/material/colors';

const RestaurantCard = ({ restaurant }: { restaurant: RestaurantDto }) => {
  return (
    <Card sx={{ position: 'relative' }}>
    <Box sx={{position: 'absolute'}}>
      <CardMedia
        sx={{height: '-webkit-fill-available', width: 'auto'}}
        component="img"
        sizes='none'
        image="https://media.istockphoto.com/vectors/super-hero-silhouette-vector-id484404072?k=20&m=484404072&s=612x612&w=0&h=eIEepdQAj8yyiBvdsagd1cZRcpKIFFLwBEViB1tJEaA="
        alt="Hero image"
      />
    </Box>
    <CardHeader
      sx={{ position: 'relative', height: '100%', color: 'white' }}
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {/* ? Get first char of hero name using safe-navigation operator to avoid null reference errors */}
          Cool
        </Avatar>
      }
      action={
        <Button sx={{ color: 'white'}}>
        </Button>
      }
      title={restaurant?.name}
      subheader={(<div>{restaurant.description}</div>)}
    />
    <CardContent title={restaurant?.name} sx={{position: 'relative', bgcolor: 'darkOrange', color: 'white', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
      {restaurant?.description}
    </CardContent>

  </Card>
  );
};

export default RestaurantCard;
