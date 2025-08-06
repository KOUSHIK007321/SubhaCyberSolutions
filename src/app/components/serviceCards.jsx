import React from "react";

const ServiceCard = ({ title, description }) => {
  return (
    <div
      className="group bg-gradient-to-b from-gray-800 via-brown-700 to-brown-900 p-6 rounded-lg shadow-xl hover:shadow-md hover:shadow-red-800 transition-shadow duration-300 transform hover:scale-103 border-b-4 border-r-4"
      style={{
        borderColor: "#9c0202", // Custom dark red border color
        boxShadow: "0 4px 6px rgba(139, 0, 0, 0.5)", // Custom dark red shadow
      }}
    >
      <div className="mb-4">
        <h4 className="text-2xl font-semibold text-white">{title}</h4>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
    </div>
  );
};

export default ServiceCard;
