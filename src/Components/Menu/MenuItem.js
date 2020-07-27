import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

class MenuItem extends Component {
    render() { 
        return (
            <Card style={{maxWidth: "20%"}}>
                <CardHeader title="Menu Item name does here"/>
                <CardMedia
                    title="Image goes here"
                    style={{paddingTop: "50%"}}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Menu Item content goes here
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to cart">
                        <AddIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}
 
export default MenuItem;