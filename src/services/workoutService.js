const workout = require("../database/workout")
const {v4:uuid} = require("uuid")


const getAllWorkouts = (filterParams) => {
    try{
        const allWorkouts = workout.getAllWorkouts(filterParams);
        return allWorkouts;
    }catch(error){
        throw error;
    }
    
}

const getOneWorkout = (id) => {
    try{
        const oneWorkout = workout.getWorkoutById(id);
        return oneWorkout;
    }catch (error){
        throw error;
    }
}



const createNewWorkout = (newWorkout) => {
    const workoutToInsert = {
        ...newWorkout,
        id: uuid(),
        fechaCreacion: new Date().toLocaleString("en-US",{timeZone: "UTC"}),
        fechaActualizacion: new Date().toLocaleString("en-US",{timeZone: "UTC"}),
    };
    try{
        const createdWorkout = workout.createNewWorkout(workoutToInsert);
        return createdWorkout;
    }catch(error){
        throw error;
    }
    
}


const updateOneWorkout = (id,nombre,modo,ejercicios,equipamiento,consejosDelEntrenador) => {
    try{
        const updateWorkout = workout.updateWorkout(id,nombre,modo,ejercicios,equipamiento,consejosDelEntrenador);
        return updateWorkout;
    }catch(error){
        throw error;
    }
    
}

const deleteOneWorkout = (id) => {
    try{
        const delWorkout = workout.deleteWorkout(id);
        return delWorkout;
    }catch(error){
        throw error;
    }
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    deleteOneWorkout,
    updateOneWorkout,
    createNewWorkout
}