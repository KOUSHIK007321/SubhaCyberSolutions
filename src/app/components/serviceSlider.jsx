"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Atom } from "react-loading-indicators";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel.jsx";

export default function ServiceCards() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselItems = [1, 2, 3];

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fetchServices"); // Ensure correct API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();

        console.log("API response:", result); // Debug log to check API response

        // Check if the result is an array (or if the response is wrapped in an object with a 'services' key)
        if (Array.isArray(result)) {
          setServices(result); // Set services directly to the array
        } else if (Array.isArray(result.services)) {
          setServices(result.services); // Use the 'services' key if the response is wrapped
        } else {
          console.error("Expected an array, but received:", result);
          setError("Data is not in the expected array format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  if (loading) {
    return (
      <div className="flex bg-gray-900 items-center justify-center">
        <Carousel className="w-full max-w-7xl">
          <CarouselContent>
            {carouselItems.map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="bg-gray-800 m-3 border-none">
                  <CardContent className="flex aspect-square items-center justify-center max-h-40">
                    <Atom color="#ffffff" size="large" text="Loading..." />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex py-6 bg-slate-800" />
          <CarouselNext className="hidden md:flex py-6 bg-slate-800" />
        </Carousel>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Ensure that services is an array before calling .map()
  if (Array.isArray(services) && services.length > 0) {
    return (
      <div className="flex bg-gray-900 items-center justify-center">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl"
        >
          <CarouselContent>
            {services.map((service) => (
              <CarouselItem
                key={service.order} // Assuming _id is used as the unique key
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card className="bg-gray-800 m-3 border-none">
                  <CardContent className="flex aspect-square items-center justify-center max-h-40">
                    <div className="p-2">
                      <div className="flex items-center justify-center space-x-5">
                        <div className="flex items-center justify-center bg-white w-8 h-8 rounded-full text-lg font-bold text-gray-800">
                          {service.order}
                        </div>
                        <h2 className="flex items-center justify-center text-2xl font-bold text-white">
                          {service.SrvTitle}
                        </h2>
                      </div>
                      <p className="mt-3 text-center text-lg text-gray-300">
                        {service.SrvDescription}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className={"hidden md:flex py-6 bg-slate-800"} />
          <CarouselNext className={"hidden md:flex py-6 bg-slate-800 "} />
        </Carousel>
      </div>
    );
  }
}
