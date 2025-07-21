import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form
        action=""
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-4 bg-white p-4 rounded-[10px] drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            className="bg-[#F2F2F2] p-2 placeholder:text-[#808080] rounded-[5px]"
            id="email"
            name="email"
            type="email"
            placeholder="aakash@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium">
            UPI ID
          </label>
          <input
            className="bg-[#F2F2F2] p-2 placeholder:text-[#808080] rounded-[5px]"
            id="email"
            name="email"
            type="email"
            placeholder="aakash@bank"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium">
            IG Username
          </label>
          <input
            className="bg-[#F2F2F2] p-2 placeholder:text-[#808080] rounded-[5px]"
            id="email"
            name="email"
            type="email"
            placeholder="aakash_123"
          />
        </div>
      </form>
    </div>
  );
};

export default page;
