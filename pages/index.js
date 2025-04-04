import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import ListingCard from "../components/ListingCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";
import SlideshowCard from "../components/SlideshowCard";

// Local Data
import data from "../data/portfolio.json";

// Notion Data
import { getNotionData } from "../utils/notion";

export default function Home() {
  // Ref
  const aboutRef = useRef();
  const projectRef = useRef();
  const servicesRef = useRef();
  const propertyRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();
  const router = useRouter();

  const [notionData, setNotionData] = useState({
    propertyListings: [],
    upcomingProjects: [],
    servicesListings: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handling Scroll

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleProjectScroll = () => {
    window.scrollTo({
      top: projectRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleServicesScroll = () => {
    window.scrollTo({
      top: servicesRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handlePropertyScroll = () => {
    window.scrollTo({
      top: propertyRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  useEffect(() => {
    const fetchNotionData = async () => {
      const fetchedNotionData = await getNotionData();
      console.log(fetchedNotionData, "fetchedNotionData");
      if (!fetchedNotionData) {
        setError("Failed to fetch data from Notion");
        return;
      }
      setNotionData(fetchedNotionData);
      setLoading(false);
    };

    fetchNotionData();
  }, []);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleAboutScroll={handleAboutScroll}
          handleProjectScroll={handleProjectScroll}
          handleServicesScroll={handleServicesScroll}
          handlePropertyScroll={handlePropertyScroll}
        />

        {/* Header */}
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5 underline decoration-4 decoration-amber-500 underline-offset-8"
            >
              {data.headerTaglineFour}
            </h1>
          </div>

          <Socials className="mt-2 laptop:mt-5" />
        </div>

        {/* Loader */}
        {loading && (
          <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
            <h1 className="text-2xl text-bold">Loading...</h1>
          </div>
        )}

        {/* Upcoming Projects */}
        {!loading && (
          <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={projectRef}>
            <h1 className="text-2xl text-bold">Upcoming Projects.</h1>

            <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
              {notionData?.upcomingProjects?.map((project) => {
                const projectImage =
                  project?.properties["Image"].files[0].external.url;
                const projectName =
                  project?.properties["Project Name"].title[0].text.content;
                const projectArea =
                  project?.properties["Area"].rich_text[0].text.content;
                return (
                  <WorkCard
                    key={project.id}
                    img={projectImage}
                    name={projectName}
                    description={projectArea}
                    onClick={() => router.push("/contact")}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Services */}
        {!loading && (
          <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={servicesRef}>
            <h1 className="text-2xl text-bold">Services.</h1>
            <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
              {notionData?.servicesListings?.map((service) => {
                const serviceName =
                  service?.properties["Block Title"].title[0].text.content;
                const serviceDescription =
                  service?.properties["Content"].rich_text[0].text.content;
                return (
                  <ServiceCard
                    key={service.id}
                    name={serviceName}
                    description={serviceDescription}
                    onClick={() => router.push("/contact")}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Property Listings */}
        {!loading && (
          <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={propertyRef}>
            <h1 className="text-2xl text-bold">Property Listings.</h1>

            <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
              {notionData?.propertyListings?.map((property) => {
                const propertyName =
                  property?.properties["Property Name"].title[0].text.content;
                const developerName =
                  property?.properties["Developer"].rich_text[0].text.content;
                const propertyPrice =
                  property?.properties["Price"].rich_text[0].text.content;
                const projectArea =
                  property?.properties["Area"].rich_text[0].text.content;
                const projectImage =
                  property?.properties["Image"].files[0].external.url;
                return (
                  <ListingCard
                    key={property.id}
                    img={projectImage}
                    name={propertyName}
                    description={developerName}
                    area={projectArea}
                    price={propertyPrice}
                    onClick={() => router.push("/contact")}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* About us */}
        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="text-2xl text-bold">About.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {data.aboutpara}
          </p>
        </div>

        {/* Contact Us
        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0">
          <h1 className="text-2xl text-bold">Contact Us.</h1>
          <div className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            <p className="mb-4">Have a question? Get in touch! 😊</p>
            <Link href="/contact">
              <Button type="primary">Contact Us</Button>
            </Link>
          </div>
        </div> */}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
