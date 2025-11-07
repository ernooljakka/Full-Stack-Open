interface exerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  exercises: Array<number>,
  targetDailyHours: number
): exerciseResults => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((e) => e !== 0).length;

  const totalTrainingHours = exercises.reduce((sum, hours) => sum + hours, 0);
  const success = targetDailyHours * exercises.length <= totalTrainingHours;

  const average = totalTrainingHours / periodLength;

  let rating = 1;
  let ratingDescription = "Do better!";

  if (average > targetDailyHours * 1.2) {
    rating = 3;
    ratingDescription = "Perfect, keep going!";
  } else if (average > targetDailyHours) {
    rating = 2;
    ratingDescription = "Good job, but you can do better I trust you!";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetDailyHours,
    average,
  };
};

/*const args = process.argv;

const targetDailyHours = Number(args[2]);

const exercises = process.argv.slice(3).map((e) => Number(e));

if (isNotNumber(targetDailyHours)) {
  console.log("Target hours must be number");
  process.exit(1);
}

exercises.map((e) => {
  if (isNotNumber(e)) {
    console.log("Every daily exercise amount must be a number");
  }
});

console.log(calculateExercises(exercises, targetDailyHours));*/
