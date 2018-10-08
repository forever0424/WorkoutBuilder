import React from 'react';
import Workout from './Workout';
import ExerciseList from '../exercise/ExerciseList';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import auth from './../auth/auth-helper'
import WorkoutListItem from './WorkoutListItem';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { connect } from 'react-redux'
import {requestRoutines} from '../../redux/actions'
import Grid from '@material-ui/core/Grid';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

const styles = theme => ({
    cardGrid: {
        padding: `${theme.spacing.unit * 3}px 0`,
      },
    workoutsContainer: {
        display: 'flex',
        justifyContent: 'center',
      },
      layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
      },
      justify:{
        justifyContent: 'center'
      },
      buttonContainer:{
          display:'flex',
          justifyContent: 'center',
          marginBottom: '10px'
      },
      button:{
          backgroundColor:theme.palette.primary.main, 
          color:'white',
      },

  });

class WorkoutList extends React.Component {
    state = {
        selectedWorkout: null,
        editWorkout:null,
        workouts : [],
        error:'',
        isNew: false
    }
    handleGoClick = (workout) =>{
        this.setState({selectedWorkout: workout});
    }
    handleBackClick = () =>{
        this.setState({selectedWorkout: null, editWorkout:null});
    }
    handleEditClick = (workout) =>{
        this.setState({editWorkout: workout, isNew : false});
    }
    handleAddClick = () =>{
        this.setState({editWorkout: [], isNew : true});
    }
    handleReturnClick = () =>{
        this.setState({selectedWorkout: null, editWorkout: null});
    }
    handleReturn = () =>{
        this.props.handleReturn();
    }
    render() {
        const {classes, routines} = this.props
        return (
            <div>
                {!this.state.selectedWorkout && !this.state.editWorkout && 
                    <div>
                        <div className={classNames(classes.layout, classes.cardGrid)}>
                            <Grid container spacing={40} className={classes.justify}>
                                {this.props.workouts.length>0 && this.props.workouts.map(workout => (
                                    <WorkoutListItem
                                        key={workout._id} 
                                        workout={workout}
                                        handleGoClick={this.handleGoClick}
                                        handleEditClick={this.handleEditClick}
                                        handleReturn = {this.handleReturnClick}/>
                                ))}
                            </Grid>
                        </div>
                        <div className={classes.buttonContainer}>
                            <Button size="small" onClick={this.handleReturn}>
                                <KeyboardReturn />
                                Return
                            </Button>
                            <Button variant="contained" 
                                    onClick={this.handleAddClick}
                                    className={classes.button}>
                                Add Workout
                            </Button>
                        </div>
                    </div>
                    
                }
                {this.state.selectedWorkout 
                    && <Workout 
                            workout={this.state.selectedWorkout}
                            handleBackClick={this.handleBackClick}
                            handleReturn = {this.handleReturnClick}
                        />
                }
                {this.state.editWorkout 
                    && <ExerciseList 
                            workout={this.state.editWorkout}
                            handleBackClick={this.handleBackClick}
                            handleReturn = {this.handleReturnClick}
                            isNew = {this.state.isNew}
                        />
                }
            </div>
        );
    }
}
export default withStyles(styles)(WorkoutList);
