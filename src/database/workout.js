const DB = require("./db.json");
const fs = require("fs");

const getAllWorkouts = (filterParams) =>  {
    let workouts = DB.entrenamientos;
    try{
        if(filterParams.limit && filterParams.limit < DB.entrenamientos.length){
            console.log(DB.entrenamientos.splice(0,filterParams.limit));
            return workouts.slice(0,filterParams.limit);
        }
        if(filterParams.mode){
            return workouts.filter((workout) => workout.modo.toLowerCase().includes(filterParams.mode.toLowerCase()));
        }
        return workouts;
    }catch(error){
        throw {status : 500, message: error?.message || error};
    }
}

const getWorkoutById = (id) => {
    try{
        const workout = DB.entrenamientos.find((entrenamiento) => entrenamiento.id === id);
        if(workout == undefined){
            throw{
                status : 404,
                message: `No se ha encontrado ningún entrenamiento con la id : ${id}`
            }
        }
        return workout;
    }catch(error){
        throw {status : 500, message: error?.message || error};
    }
    
}


const createNewWorkout = (workoutToInsert) => {
    const yaExiste = DB.entrenamientos.findIndex((entrenamiento) => entrenamiento.nombre === workoutToInsert.nombre);
    console.log(yaExiste);
    if(yaExiste != -1){
        throw{
            status : 400,
            message: `El entrenamiento con el nombre : ${workoutToInsert.nombre} ya existe`
        }
    }

    try{
        DB.entrenamientos.push(workoutToInsert);
        saveToDatabase(DB);
        return workoutToInsert;
    }catch(error){
        throw {status : 500, message: error?.message || error};
    }
    
}


const updateWorkout = (id, nombre, modo, ejercicios, equipamiento, consejosDelEntrenador) => {
    const workoutToUpdate = getWorkoutById(id);

    if (workoutToUpdate !== undefined) {

        if (nombre !== '') workoutToUpdate.nombre = nombre;
        if (modo !== '') workoutToUpdate.modo = modo;
        if (ejercicios !== '') workoutToUpdate.ejercicios = ejercicios;
        if (equipamiento !== '') workoutToUpdate.equipamiento = equipamiento;
        if (consejosDelEntrenador !== '') workoutToUpdate.consejosDelEntrenador = consejosDelEntrenador;

        try{
            workoutToUpdate.fechaActualizacion = new Date().toLocaleString("en-US",{timeZone: "UTC"});
            saveToDatabase(DB);
            return workoutToUpdate;
        }catch(error){
            throw {status : 500, message: error?.message || error};
        }
        
    } else {
        throw{
            status : 404,
            message: `No se ha encontrado ningún entrenamiento con la id : ${id}`
        }
    }
};


const deleteWorkout = (id) => {

    const workout = DB.entrenamientos.find((entrenamiento) => entrenamiento.id === id);
    if(workout == undefined){
        throw{
            status : 404,
            message: `No se ha encontrado ningún entrenamiento con la id : ${id}`
        }
    }
    try{
        DB.entrenamientos = DB.entrenamientos.filter((entrenamiento) => entrenamiento.id !== id);
        saveToDatabase(DB);
    }catch(error){
        throw {status : 500, message: error?.message || error};
    }
   

    return "ok";
}


const saveToDatabase = (DB) => {
    fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null, 2), {
      encoding: "utf8",
    });
};

module.exports = {
    getAllWorkouts,
    createNewWorkout,
    getWorkoutById,
    deleteWorkout,
    updateWorkout
}