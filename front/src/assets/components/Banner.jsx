import React from 'react';

const Banner = () => {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute w-full h-full object-cover -z-10"
        src="/bannervid.mp4"
        type="video/mp4"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Chantez sans limites.</h1>
        <p className="text-white text-lg md:text-xl mb-6 max-w-2xl">
          Accédez à l'entièreté de notre catalogue et à toutes nos fonctionnalités.
        </p>
        
      </div>
    </div>
  );
};

export default Banner;
