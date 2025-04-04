import React from "react";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";

const Footer = ({}) => {
  return (
    <>
      <div className="mt-2 laptop:mt-40 p-2 laptop:p-0">
        <div>
          <h1 className="text-2xl text-bold">Contact Us.</h1>
          <div className="mt-10">
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
              Have a question? Get in touch! 😁
            </h1>
            <Link href="/contact">
              <Button type="primary">Schedule a call</Button>
            </Link>
            <div className="mt-10">
              <Socials />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 laptop:mt-40 p-2 laptop:p-0 flex flex-row justify-between items-center">
        <h1 className="text-sm text-bold mt-2 laptop:mt-10 p-2 laptop:p-0">
          Desgined With ❤️ by{" "}
          <Link href="https://www.linkedin.com/in/nikhil-bhojwani/">
            <a target="_blank" className="underline underline-offset-1">
              Nikhil Bhojwani
            </a>
          </Link>
        </h1>
        <h1 className="text-sm text-bold mt-2 laptop:mt-10 p-2 laptop:p-0">
          Powered by{" "}
          <Link href="https://www.pramukhrealestate.com/">
            <a className="underline underline-offset-1">
              Pramukh Real Estate LLC
            </a>
          </Link>
        </h1>
      </div>
    </>
  );
};

export default Footer;
