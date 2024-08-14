import React from 'react'

const TestimonialUserTile = () => {
  return (
    <div className="py-5 px-7 flex items-center justify-start gap-7 bg-secondary/15 rounded-[12px]">
      <div className=" text-[28px] font-bold text-white rounded-full w-[80px] h-[80px] bg-secondary/40 flex items-center justify-center">
        AN
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-[20px] font-bold text-light">Amanda Nezuribe</h1>
        <p className=" text-[15px] font-light  text-light w-[70%]">
          Lagos Infrastructure Development | Project Manager
        </p>
      </div>
    </div>
  );
}

export default TestimonialUserTile