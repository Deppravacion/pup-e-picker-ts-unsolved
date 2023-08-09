// import { Requests } from "./api";
// import { baseUrl } from "./api";
// import { Dog } from "./types";
const messAround = async () => {
 console.log('messing around');


};

export const Playground = () => {
  return (
    <div>
      <h1>Functions Playground</h1>;
      <button
        onClick={() => {
          messAround();
        }}
      >
        Press This Button To Trigger `messAround`
      </button>
    </div>
  );
};
