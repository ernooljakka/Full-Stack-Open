import type { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={part.name}>
                <h3>{part.name}</h3>
                <p>Exercises: {part.exerciseCount}</p>
                <p>{part.description}</p>
              </div>
            );
          case "group":
            return (
              <div key={part.name}>
                <h3>{part.name}</h3>
                <p>Exercises: {part.exerciseCount}</p>
                <p>Group projects: {part.groupProjectCount}</p>
              </div>
            );
          case "background":
            return (
              <div key={part.name}>
                <h3>{part.name}</h3>
                <p>Exercises: {part.exerciseCount}</p>
                <p>{part.description}</p>
                <p>Background material: {part.backgroundMaterial}</p>
              </div>
            );
          case "special":
            return (
              <div key={part.name}>
                <h3>{part.name}</h3>
                <p>Exercises: {part.exerciseCount}</p>
                <p>{part.description}</p>
                <p>Requirements: {part.requirements.join(", ")}</p>
              </div>
            );
          default:
            return assertNever(part);
        }
      })}
    </div>
  );
};

// Helper for exhaustive type checking
function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

export default Content;
