import React from "react";

const QuizBanner = () => {
  return (
    <div className="w-full rounded-md bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 p-6 flex flex-col md:flex-row items-center justify-between text-white shadow-lg">
      {/* Left Image */}
      <div className="w-full md:w-1/3 mb-4 md:mb-0 flex justify-center">
        <img
          src="/cam.png"
          alt="Quiz Preview"
          className="w-48 h-auto rounded-md shadow-md"
        />
      </div>

      {/* Center Text */}
      <div className="w-full md:w-2/3 text-center md:text-left px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          BIEN PLUS QU’UN SIMPLE BLINDTEST
        </h2>
        <p className="text-sm md:text-base">
          Passez du chant au jeu avec la toute nouvelle fonctionnalité de quiz maintenant disponible sur l’application.
        </p>
      </div>

      
        
    </div>
  );
};

export default QuizBanner;
