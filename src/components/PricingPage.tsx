import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import '../styles/PricingPage.css';
import Footer from "./Footer";
import { FaCrown } from "react-icons/fa";
import { linearGradient } from "framer-motion/client";
import { useForm } from "react-hook-form";

type PriceFormData = {
  email: string;
  type: string;
  title: string;
  request: string;
};


const Card = ({
  frontContent,
  backContent,
  className,
  delay = 0,
  isFlipped,
}: {
  frontContent: any;
  backContent: any;
  className?: string;
  delay?: number;
  isFlipped: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`card-container ${className}`}
  >
    <div
      className={`card-inner ${isFlipped ? "flipped" : ""}
        bg-gray-800 border-2 border-gray-700 rounded-2xl p-6 transition-all duration-300 ease-in-out`}
    >
      <div className="card-front">{frontContent}</div>
      <div className="card-back">{backContent}</div>
    </div>
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
    className={`px-4 py-2 rounded-lg font-medium focus:outline-none transition duration-200 text-white ${variant === "default"
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
    price: "$50",
    description: "Video editing, stream setup.",
    features: ["Any video editing", "Stream setup assistance"],
    cta: "Get Started",
    popular: false,
    tier: "video"
  },
  {
    name: "B-Tier",
    price: "$100",
    description: "Simple web programming solutions, 7 day delivery.",
    features: ["Programming help", "Landing/loading pages", "Any web pages"],
    cta: "Get Started",
    popular: false,
    tier: "bronze"
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
    tier: "silver"
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
    tier: "gold"
  },
];

export default function PricingPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccessMessage] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PriceFormData>();

  const onSubmit = async (data: PriceFormData, pkgTier: any) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("https://sagepaths.dev.api.sagejherm.co/api/feedback/fbResume_insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "Billing", title: pkgTier })
      });

      const responseData = await response.json();
      if (!response.ok) throw new Error("Failed to submit feedback. " + responseData.message);
      else setSuccessMessage(responseData.message);

      setTimeout(() => {
        setSuccessMessage("");
        reset();
      }, 3000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="min-h-screen bg-gray-900 md:pt-20 pt-10 px-8 md:px-12 lg:px-24 text-white">
        <h1 className="md:text-4xl !text-2xl font-bold text-center mb-6">
          Any Video Editing or Web Programming Needed
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
              frontContent={
                <>
                  <div className="flex flex-col h-full">
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex items-center mb-2">


                          {/* Title */}
                          <h2 className="text-xl font-semibold col-span-1">{pkg.name}</h2>

                          <div className="ml-25">
                            {pkg.tier === "video" && (
                              <FaCrown size={isMobile ? 50 : 35} color={"purple"} />
                            )}
                            {pkg.tier === "bronze" && (
                              <FaCrown size={isMobile ? 50 : 35} color={"brown"} />
                            )}
                            {pkg.tier === "silver" && (
                              <FaCrown size={isMobile ? 50 : 35} color={"silver"} />
                            )}
                            {pkg.tier === "gold" && (
                              <FaCrown size={isMobile ? 50 : 35} color={"gold"} />
                            )}
                          </div>
                        </div>

                        {/* Price & Description */}
                        <div className="grid grid-cols-1">
                          <p className="text-3xl font-bold my-2">{pkg.price}</p>
                          <p className="text-gray-400 mb-4">{pkg.description}</p>
                        </div>
                        <ul className="space-y-2">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="text-gray-300">• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <div className="mt-auto p-4">
                      <Button
                        className="w-full"
                        variant={pkg.popular ? "default" : "outline"}
                        onClick={() => handleFlip(pkg.name)}
                      >
                        {pkg.cta}
                      </Button>
                    </div>
                  </div>
                </>
              }
              backContent={
                <>
                  <div className="flex flex-col h-full p-4">
                    <div className="flex-1 flex flex-col justify-center text-center">
                      {/* <p className="text-lg mb-4">Thanks for choosing {pkg.name}!</p>
                      <p className="text-gray-300 mb-6">
                        We'll reach out soon or schedule a call to get started.
                      </p> */}
                      <form onSubmit={handleSubmit((data) => onSubmit(data, pkg.name))} className="space-y-4">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="input-field"
                          {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}


                        <textarea
                          placeholder="Please provide description of your request and what days you are avaliablke to meet or talk"
                          className="textarea-field"
                          {...register("request", { required: "Comments are required" })}
                        ></textarea>
                        {errors.request && <p className="text-red-500">{errors.request.message}</p>}

                        {error && <p className="text-red-500">{error}</p>}

                        <motion.button
                          type="submit"
                          className="submit-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={loading}
                        >
                          {loading ? "Submitting..." : "Submit"}
                        </motion.button>
                      </form>
                    </div>
                    {/* Display success message with animation */}
                    {success && (
                      <motion.div
                        className="success-message text-xs"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        {"Thank you for your submission! We've received your request and will reach out via email shortly to continue the conversation."}
                      </motion.div>
                    )}

                    {/* Display error message with animation */}
                    {error && (
                      <motion.div
                        className="error-message text-xs"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        {"Oops! Something went wrong with your submission. Please try again later, or contact us directly if the issue persists."}
                      </motion.div>
                    )}
                    <div className="mt-auto">
                      <Button
                        className="w-full"
                        variant="default"
                        onClick={() => handleFlip(pkg.name)}
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                </>
              }
            />
          ))}
        </div>
        <Footer />
      </div>

    </>
  );
}
