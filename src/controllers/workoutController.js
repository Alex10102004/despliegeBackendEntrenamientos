const workoutService = require("../services/workoutService")

const getAllWorkouts = (req,res) =>{
    const {mode} = req.query;
    const {limit} = req.query;
    try{
        //const allWorkouts = workoutService.getAllWorkouts();
        const allWorkouts = workoutService.getAllWorkouts({mode,limit});
        res.send({status : "Ok" , data: allWorkouts});
    }catch(error){
        res.status(error?.status || 500).send({status: "FAILED", data: {error: error?.message || error}})
    }
    
};

const getOneWorkout = (req,res) => {
    const id = req.params.workoutId;
    try{
        const oneWorkout = workoutService.getOneWorkout(id);
        res.send({status : "Ok" , data: oneWorkout});
    }catch(error){
        res.status(error?.status || 500).send({status: "FAILED", data: {error: error?.message || error}})
    }
}



const createNewWorkout = (req,res) => {
    const {body} = req;
    if(
        !body.nombre ||
        !body.modo ||
        !body.ejercicios ||
        !body.equipamiento ||
        !body.consejosDelEntrenador
    ){
        res.status(400).send({status: "FAILED", data: {
            error : "Falta algun campo para crear el nuevo entrenamiento !!!"
        }});
    }
    
    const newWorkout = {
        nombre: body.nombre,
        modo: body.modo,
        equipamiento: body.equipamiento,
        ejercicios: body.ejercicios,
        consejosDelEntrenador: body.consejosDelEntrenador,
    }

    try{
        const createdWorkout = workoutService.createNewWorkout(newWorkout);
        res.status(201).send({status: "OK", data: createdWorkout})
    }catch(error){
        res.status(error?.status || 500).send({status: "FAILED", data: {error: error?.message || error}})
    }
    
    
}


const updateOneWorkout = (req,res) => {
    const {body} = req;
    const id = req.params.workoutId;
    const nombre = body.nombre || '';
    const modo = body.modo || '';
    const ejercicios = body.ejercicios || '';
    const consejosDelEntrenador = body.consejosDelEntrenador || '';
    const equipamiento = body.equipamiento || '';

    try{
        const updateWorkout = workoutService.updateOneWorkout(id,nombre,modo,ejercicios,equipamiento,consejosDelEntrenador);
        res.status(201).send({status: "OK", data: updateWorkout});
    }catch(error){
        res.status(error?.status || 500).send({status: "FAILED", data: {error: error?.message || error}})
    }
    
}

const deleteOneWorkout = (req,res) => {
    const id = req.params.workoutId;
    try{
        workoutService.deleteOneWorkout(id);
        res.status(201).send({status: "OK"})
    }catch(error){
        res.status(error?.status || 500).send({status: "FAILED", data: {error: error?.message || error}})
    }
   
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    deleteOneWorkout,
    updateOneWorkout,
    createNewWorkout,
}