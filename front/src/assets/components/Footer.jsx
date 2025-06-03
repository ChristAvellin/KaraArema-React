import React from "react";

const App = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Need Help?",
      links: [
        "Delivery Information",
        "Return & Refund Policy",
        "Payment Methods",
        "Track your Order",
        "Contact Us",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Main content */}
        <div className="py-8 lg:py-12 border-b border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo and description */}
            <div className="lg:col-span-1">
              <img
                className="w-16 sm:w-20 mb-4"
                src="/logg.png"
                alt="KaraArema Logo"
              />
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-sm">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum
                unde quaerat eveniet cumque accusamus atque qui error quo enim
                fugiat?
              </p>
            </div>

            {/* Links sections */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {linkSections.map((section, index) => (
                  <div key={index} className="space-y-3 sm:space-y-4">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-100">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.links.map((link, i) => (
                        <li key={i}>
                          <a
                            href="#"
                            className="text-xs sm:text-sm text-gray-400 hover:text-gray-200 hover:underline transition-colors duration-200 block py-0.5"
                            rel="noopener noreferrer"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-4 sm:py-6">
          <p className="text-center text-xs sm:text-sm text-gray-400/80">
            Copyright 2025 © KaraArema All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default App;
