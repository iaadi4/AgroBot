import { useState, useEffect } from 'react';
import { FaLeaf, FaRobot, FaChartLine, FaEye, FaWater } from 'react-icons/fa';
import { MdScience, MdAnalytics } from 'react-icons/md';
import { GiPlantRoots, GiWheat } from 'react-icons/gi';

export default function Home() {
    const [animatedCards, setAnimatedCards] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedCards([0, 1, 2, 3]);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const features = [
        {
            icon: <FaWater className="h-10 w-10 text-white" />,
            title: "Soil Moisture",
            description: "Real-time monitoring",
            gradient: "from-red-400 to-pink-500",
            delay: "delay-[100ms]"
        },
        {
            icon: <MdScience className="h-10 w-10 text-white" />,
            title: "Smart Analysis",
            description: "AI-powered insights",
            gradient: "from-pink-400 to-red-400",
            delay: "delay-[200ms]"
        },
        {
            icon: <FaChartLine className="h-10 w-10 text-white" />,
            title: "Data Visualization",
            description: "Interactive charts",
            gradient: "from-red-500 to-orange-500",
            delay: "delay-[300ms]"
        },
        {
            icon: <FaEye className="h-10 w-10 text-white" />,
            title: "Live Monitoring",
            description: "24/7 field watch",
            gradient: "from-orange-400 to-red-500",
            delay: "delay-[400ms]"
        }
    ];

    const benefits = [
        { icon: <GiPlantRoots />, text: "Optimize crop growth with precision data" },
        { icon: <FaLeaf />, text: "Reduce water waste through smart irrigation" },
        { icon: <GiWheat />, text: "Increase yield with data-driven decisions" },
        { icon: <MdAnalytics />, text: "Monitor field conditions remotely" }
    ];

    return (
        <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="flex flex-col lg:flex-row items-center justify-between px-6 sm:px-14 py-12 lg:py-20">
                <div className="flex flex-col lg:w-1/2 mb-8 lg:mb-0">
                    <div className="mb-6">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4">
                            Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">secrets</span>
                        </h1>
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                            Beneath your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">soil</span>
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Transform your farming with intelligent soil monitoring, real-time analytics, 
                        and AI-powered insights that help you make smarter agricultural decisions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Start Monitoring
                        </button>
                        <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-50">
                            Learn More
                        </button>
                    </div>
                </div>
                
                <div className="lg:w-1/2 flex justify-center lg:justify-end">
                    <div className="relative">
                        <FaRobot className="h-48 w-48 text-red-500 animate-pulse" />
                        <div className="absolute top-8 right-8 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
                        <div className="absolute bottom-8 left-8 w-3 h-3 bg-pink-400 rounded-full animate-ping delay-700"></div>
                    </div>
                </div>
            </div>

            <div className="px-6 sm:px-14 py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Smart Agriculture Features</h2>
                    <p className="text-lg text-gray-600">Advanced technology for modern farming</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className={`transform transition-all duration-700 ${animatedCards.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${feature.delay}`}
                        >
                            <div className={`bg-gradient-to-br ${feature.gradient} h-[140px] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105`}>
                                <div className="flex h-full">
                                    <div className="flex w-2/5 items-center justify-center">
                                        {feature.icon}
                                    </div>
                                    <div className="flex flex-col justify-center px-4">
                                        <h3 className="text-white font-semibold text-lg mb-1">{feature.title}</h3>
                                        <p className="text-white/90 text-sm">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-6 sm:px-14 py-12 bg-white/50 backdrop-blur-sm">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose AgroBot?</h2>
                    <p className="text-lg text-gray-600">Revolutionize your farming with intelligent automation</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <div className="text-3xl text-red-500 mr-4">
                                {benefit.icon}
                            </div>
                            <p className="text-gray-700 text-lg font-medium">{benefit.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-6 sm:px-14 py-12 bg-gray-800">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-red-400 mb-2">500+</div>
                        <p className="text-gray-300">Active Farms</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-pink-400 mb-2">24/7</div>
                        <p className="text-gray-300">Monitoring</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-orange-400 mb-2">85%</div>
                        <p className="text-gray-300">Yield Increase</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-red-500 mb-2">30%</div>
                        <p className="text-gray-300">Water Savings</p>
                    </div>
                </div>
            </div>
        </div>
    );
}