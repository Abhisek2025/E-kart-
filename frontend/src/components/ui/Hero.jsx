import React from "react";
import {ekart} from "../../public/ekart.png";

function Hero() {
  return (
    <section className="b-gradient-to-r from-blue-600 to to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Latest Electronics Best Prices</h1>
                    <p className="text-xl mb-6text-blue-100">Discover Cutting-edge technology with unbeatable deals on smartphones,laptop and More</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="bg-white text-blue-600 hover:bg-gray-100">Shop Now</Button>
                        <Button varient="outline" className="border-white text-white hover:bg-white hover:text-blue-500 bg-transparent"></Button>
                    </div>
                    <div className="relative">
                <img src="" alt="" className="rounded-lg shadow-2xl" />
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Hero;
