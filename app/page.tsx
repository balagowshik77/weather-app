"use client";
import React, { useState } from "react";
import Current from "@/components/Current";
import Input from "@/components/Input";
import WeekForecast from "@/components/WeekForecast";
import WeatherDetails from "@/components/WeatherDetails";
import Loading from "@/components/Loading";

export default function Home() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      e.type === "click" || // Trigger search on button click
      (e.type === "keydown" &&
        (e as React.KeyboardEvent<HTMLInputElement>).key === "Enter" &&
        location) // Trigger search on Enter key press
    ) {
      setLoading(true);
      e.preventDefault();
      try {
        const response = await fetch(`api/weather/get?location=${location}`);
        if (response.status === 200) {
          const data = await response.json();
          setTimeout(() => {
            setData(data);
            setLocation("");
            setError("");
            setLoading(false);
          }, 1000);
        } else {
          setError("Some Error Occurred");
          setLoading(false);
        }
      } catch (error) {
        setError("City not found");
        setData({});
        setLoading(false);
      }
    }
  };

  let content;
  if (Object.keys(data).length === 0 && error === "") {
    content = (
      <div className="text-white text-center h-screen mt-[5rem]">
        <h2 className="mb-4 text-3xl font-semibold">
          Welcome to the Weather App
        </h2>
        <p className="text-xl">Enter a city name to get the weather forecast</p>
      </div>
    );
  } else if (loading) {
    content = <Loading />;
  } else if (error !== "") {
    content = (
      <div className="text-white text-center h-screen mt-[5rem]">
        <h2 className="mb-4 text-3xl font-semibold">City not found</h2>
        <p className="text-xl">Please enter a valid city name</p>
      </div>
    );
  } else {
    content = (
      <>
        <div className="flex md:flex-row flex-col p-12 items-center justify-between mt-[-4rem] gap-10">
          <Current data={data} />
          <WeekForecast data={data} />
        </div>
        <div>
          <WeatherDetails data={data} />
        </div>
      </>
    );
  }

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-fit">
      <div className="flex flex-col w-full rounded-lg bg-white/25 h-fit">
        <div className="flex flex-col items-center justify-between p-12 md:flex-row">
          <h1 className=" px-4 py-2 mb-8 text-4xl font-bold text-black md:mb-0 rounded-xl">
            Weather App
          </h1>
          <Input
            handleSearch={handleSearch}
            setLocation={setLocation}
            location={location}
          />
        </div>
        {content}
      </div>
    </div>
  );
}
