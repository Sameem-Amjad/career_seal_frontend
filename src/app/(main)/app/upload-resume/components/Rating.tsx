"use client";

import React from "react";
import { FaStar } from "react-icons/fa";

interface RatingProps {
  rating: number;
  maxStars?: number; 
}

const Rating: React.FC<RatingProps> = ({ rating, maxStars = 5 }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(maxStars)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <div key={index} className="relative">
            
            <FaStar className="text-gray-300" />
            {rating >= starIndex ? (
              <FaStar className="absolute inset-0 text-yellow-400" />
            ) : rating > starIndex - 1 ? (
              <FaStar
                className="absolute inset-0 text-yellow-400"
                style={{
                  clipPath: `inset(0 ${100 - (rating - index) * 100}% 0 0)`,
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
