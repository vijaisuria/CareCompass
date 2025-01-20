import React from "react";
import Stepper from "./Stepper";

const RoadmapHeader = ({ data }) => {
  const steps = data.roadMapJson.map((field) => field.field);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center my-8">
        <img
          src="/logo.svg"
          alt="Company Logo"
          className="mx-auto max-w-[150px] h-auto"
        />
        <h1 className="text-3xl font-bold my-4">{data.title}</h1>
        <h2 className="text-2xl text-gray-400">{data.description}</h2>
        <h4 className="mt-1 text-xl font-medium">Deadline: {data.deadline}</h4>
      </div>
      <Stepper steps={steps} activeStep={2} />
    </div>
  );
};

export default RoadmapHeader;
