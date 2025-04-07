import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import '../styles/PricingPage.css';
import Footer from "./Footer";

const Card = ({
  children,
  className,
  delay = 0,
  isFlipped,
}: {
  children: any;
  className?: string;
  delay?: number;
  isFlipped: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{
      scale: 1.04,
      borderColor: "rgba(59,130,246,1)", // blue-500 on hover
      boxShadow: "0 0 20px rgba(59,130,246,0.4)", // blue glow on hover
    }}
    className={`select-none bg-gray-800 border-2 border-gray-700 rounded-2xl p-6 transition-all duration-300 ease-in-out flex flex-col h-full transform ${isFlipped ? "rotate-y-180" : ""} ${className}`}
  >
    {children}
  </motion.div>
);

const CardContent = ({ children }: { children: any }) => (
  <div className="flex-1 p-4">{children}</div>
);

const Button = ({
  children,
  onClick,
  className,
  variant,
}: {
  children: any;
  onClick?: () => void;
  className?: string;
  variant?: string;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium focus:outline-none transition duration-200 text-white ${
      variant === "default"
        ? "bg-blue-500 hover:bg-blue-600"
        : "bg-gray-200 text-black hover:bg-white"
    } ${className}`}
  >
    {children}
  </button>
);

const packages = [
  {
    name: "V-Tier",
    price: "$80",
    description: "Video editing, stream setup.",
    features: ["Any video editing", "Stream setup assistance"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "B-Tier",
    price: "$100",
    description: "Simple web programming solutions, 7 day delivery.",
    features: ["Programming help", "Landing/loading pages", "Any web pages"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "A-Tier",
    price: "$150",
    description: "Includes B-Tier + CRUD UI website, 14 day delivery.",
    features: [
      "Everything in B-Tier",
      "Simple CRUD website",
      "UI guided direction",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "S-Tier",
    price: "$200+",
    description:
      "Includes A-Tier + full website + logo/design, 30 day delivery.",
    features: [
      "Everything in A-Tier",
      "Custom logo/design",
      "Fully functional & clean website",
      "Plus More!"
    ],
    cta: "Get Started",
    popular: false,
  },
];

export default function PricingPage() {
  useEffect(() => {
    document.title = "SagePaths | Pricing";
  }, []);

  // State to track which card is flipped
  const [flippedCards, setFlippedCards] = useState<string[]>([]);

  const handleFlip = (cardName: string) => {
    setFlippedCards((prev) =>
      prev.includes(cardName)
        ? prev.filter((name) => name !== cardName)
        : [...prev, cardName]
    );
  };

  return (
    <>
    <div className="min-h-screen bg-gray-900 pt-20 px-4 md:px-12 lg:px-24 text-white">
      <h1 className="md:text-4xl !text-2xl font-bold text-center mb-6">
        I will do any video editing, web programming needed
      </h1>
      <p className="text-center text-sm text-gray-400 mb-12">
        Free consultation meetings – It's best to come with requirements or jot
        down ideas beforehand.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg, index) => (
          <Card
            key={pkg.name}
            delay={index * 0.2}
            isFlipped={flippedCards.includes(pkg.name)}
          >
            <CardContent>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">{pkg.name}</h2>
                <p className="text-3xl font-bold my-2">{pkg.price}</p>
                <p className="text-gray-400 mb-4">{pkg.description}</p>
                <ul className="space-y-2">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-300">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <div className="flex justify-end p-4">
              <Button
                className="w-full mt-auto"
                variant={pkg.popular ? "default" : "outline"}
                onClick={() => handleFlip(pkg.name)}
              >
                {pkg.cta}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Footer/>
    </div>
    
    </>
  );
}
