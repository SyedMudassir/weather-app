import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width:'90%',
    margin: '0 auto'
  },
  media: {
    height: 200,
  },
});

export default function MediaCard() {
  const classes = useStyles();
  const [defaultCitiesData, setDefaultCitiesData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await axios.get("http://localhost:4000");
      console.log(fetchedData);
      setDefaultCitiesData(fetchedData.data.dbCitiesData);
    };
    fetchData();
  }, []);
  return (
    <Grid  className={classes.root} container  spacing={3}>
      {defaultCitiesData.map((city, index) => {
        return (
          <Grid item xs={4}>
            <Card >
              <CardActionArea>
             
                <CardMedia
                  className={classes.media}   
                  image={city.weatherOverview === 'clear sky' ?"https://images.unsplash.com/photo-1558418294-9da149757efe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80":city.weatherOverview === 'haze' ?"https://images.unsplash.com/photo-1533757704860-384affeed946?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80":city.weatherOverview === 'sunny' ?"https://images.unsplash.com/photo-1447601932606-2b63e2e64331?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=679&q=80":"https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"}
                  title="Contemplative Reptile"
                />
                
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    City
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {city.city}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Description
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {city.weatherOverview}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Temperature
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {city.temperature}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
