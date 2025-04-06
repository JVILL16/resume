import React from "react";



const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-gray-800 shadow-lg rounded-xl p-6 ${className}`}>{children}</div>
  );
  
  const CardContent = ({ children }: { children: React.ReactNode }) => (
    <div className="p-4">{children}</div>
  );
  
  const Button = ({ children, onClick, className, variant }: { children: React.ReactNode; onClick?: () => void; className?: string; variant?: string }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg focus:outline-none ${
        variant === 'default' ? 'bg-blue-500 text-white' : 'bg-gray-200'
      } ${className}`}
    >
      {children}
    </button>
  );

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals exploring the platform.",
    features: ["1 Workspace", "Unlimited requests", "Community support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Basic",
    price: "$12",
    description: "For small teams getting started.",
    features: ["3 Workspaces", "Team collaboration", "Email support"],
    cta: "Buy Plan",
    popular: false,
  },
  {
    name: "Professional",
    price: "$29",
    description: "For growing teams and advanced collaboration.",
    features: ["Unlimited Workspaces", "Roles & Permissions", "Priority support"],
    cta: "Buy Plan",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced needs.",
    features: ["Advanced security", "Dedicated account manager", "Custom SLAs"],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4 md:px-12 lg:px-24">
      <h1 className="text-4xl font-bold text-center mb-6">Pricing</h1>
      <p className="text-center text-gray-600 mb-12">
        Choose the plan that’s right for you and your team.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col justify-between shadow-md rounded-2xl border-2 p-6 transition-transform transform hover:scale-105 ${
              plan.popular ? "border-blue-500" : "border-gray-200"
            }`}
          >
            <CardContent>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">{plan.name}</h2>
                <p className="text-3xl font-bold my-2">{plan.price}</p>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-gray-800">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="w-full mt-6" variant={plan.popular ? "default" : "outline"}>
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
