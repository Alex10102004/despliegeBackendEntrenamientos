const express = require('express')
const router = express.Router();
const workoutController = require('../../controllers/workoutController');
const apicache = require('apicache')
const cache = apicache.middleware("1 minute");

router.get("/",workoutController.getAllWorkouts);
router.get("/:workoutId",workoutController.getOneWorkout);
router.post("/",workoutController.createNewWorkout);
router.patch("/:workoutId",workoutController.updateOneWorkout);
router.delete("/:workoutId",workoutController.deleteOneWorkout);

module.exports = {
    router
};
