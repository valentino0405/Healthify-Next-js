import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

const Start = () => {
  const router = useRouter(); // Initialize router

  return (
    <div className="p-6">
      <h1 className="font-bold text-3xl mt-5 mb-10 mx-5 text-center">
        Welcome to Healthify!
      </h1>
      <div className="flex justify-center gap-20">
        {/* AI's Advice Card - Redirects to /dashboard */}
        <Card 
          className="w-90 h-120 flex items-center justify-center text-lg font-semibold shadow-xl rounded-2xl cursor-pointer transition-transform hover:scale-105"
          onClick={() => router.push("/dashboard")}
        >
          <CardContent className="text-center">AI's Advice</CardContent>
        </Card>

        {/* Our Products Card - Redirects to external e-commerce site */}
        <Card 
          className="w-90 h-120 flex items-center justify-center text-lg font-semibold shadow-xl rounded-2xl cursor-pointer transition-transform hover:scale-105"
          onClick={() => window.location.href = "https://healthify-next-js-ecommerce.vercel.app/"}
        >
          <CardContent className="text-center">Our Products</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Start;
