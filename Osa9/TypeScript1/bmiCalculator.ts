export {};

export const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / heightInMeters ** 2;

  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 24.9) {
    return "healthy weight";
  } else if (bmi < 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

/*const args = process.argv;

if (args.length > 4) {
  console.log(
    "##TIP Usage: npm run calculateBmi -- <height in cm> <weight in kg>"
  );
  process.exit(1);
}

const height = Number(args[2]);
const weight = Number(args[3]);

if (isNaN(height) || isNaN(weight)) {
  console.log("Please provide valid numbers for height and weight.");
  process.exit(1);
}*/
