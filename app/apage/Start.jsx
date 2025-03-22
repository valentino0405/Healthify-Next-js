import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const Start = () => {
  const router = useRouter(); // Initialize router

  return (
    <div className="p-6">
      <h1 className="font-bold text-3xl mt-5 mb-10 mx-5 text-center">
        Welcome to Healthify!
      </h1>
      <div className="flex justify-center gap-20">
        {/* AI's Advice Card - Entire card is clickable */}
        <Card
          className="w-70 h-120 flex flex-col items-center shadow-xl rounded-2xl cursor-pointer transition-transform hover:scale-105"
          onClick={() => router.push("/dashboard")}
        >
          <Image
            src="/ai.webp" // Replace with actual image path
            alt="AI Advice"
            width={300}
            height={200}
            className="rounded-t-2xl"
          />
          <CardContent className="text-center font-semibold text-lg">
            AI's Advice
          </CardContent>
        </Card>

        {/* Our Products Card - Entire card is clickable */}
        <Card
          className="w-60 h-72 flex flex-col items-center shadow-xl rounded-2xl cursor-pointer transition-transform hover:scale-105"
          onClick={() => window.location.href = "https://healthify-next-js-ecommerce.vercel.app/"}
        >
          <Image
            src="/our-products.png" // Replace with actual image path
            alt="Our Products"
            width={240}
            height={130}
            className="rounded-t-2xl"
          />
          <CardContent className="text-center font-semibold text-lg mt-2">
            Our Products
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Start;
