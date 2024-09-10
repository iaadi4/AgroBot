import { useEffect, useState, useRef } from 'react';
import { getDatabase, ref, onValue, off} from "firebase/database";
import { initializeApp } from "firebase/app";
import useWeatherInfo from '../hooks/weatherinfo';
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { BsMoisture } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";

const apiKey = import.meta.env.VITE_Firebase_api;
const appId = import.meta.env.VITE_app_id;
const messageSenderId = import.meta.VITE_messaging_sender_id;
const databaseUrl = import.meta.VITE_database_url;

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "sparkbot-ee008.firebaseapp.com",
    databaseURL: databaseUrl,
    projectId: "sparkbot-ee008",
    storageBucket: "sparkbot-ee008.appspot.com",
    messagingSenderId: messageSenderId,
    appId: appId
};

const app = initializeApp(firebaseConfig);

const FirebaseComponent = () => {
  //const [distance, setDistance] = useState(null)
  const [moisture, setMoisture] = useState("")
  const [condition, setCondition] = useState("")
  const [temperature, setTemperature] = useState("")
  const [temp, setTemp] = useState("")
  const [humidity, setHumidity] = useState("")
  const [icon, setIcon] = useState(null)
  const containerRef = useRef()

  useEffect(() => {
    const database = getDatabase(app);
    const data1Ref = ref(database, 'MoistureData/Moisture');
    const container = document.querySelector("#container");
    const data2Ref = ref(database, 'HumidityData/Humidity');
    const data3Ref = ref(database, 'HumidityData/Temp');

    const handleMoistureChange = (snapshot) => {
        let moist = snapshot.val();
        moist = parseInt(moist);
        setMoisture(moist);
        const newDiv = document.createElement("div");
        newDiv.innerHTML = moist;
        let backgroundColor;

        if(moist < 20) {
            backgroundColor = 'bg-blue-200'
        } else if (moist < 40) {
            backgroundColor = 'bg-blue-300'
        } else if(moist < 60) {
            backgroundColor = 'bg-blue-400'
        } else if(moist < 80) {
            backgroundColor = 'bg-blue-500'
        } else {
            backgroundColor = 'bg-blue-600'
        }

        newDiv.className = `${backgroundColor} h-10 w-10 text-white flex items-center justify-center rounded-sm m-0.5`
        if(!isNaN(moist))
            container.appendChild(newDiv);
    };

    const handleHumidityChange = (snapshot) => {
        let humi = snapshot.val();
        setHumidity(humi);
    };

    const handleTempChange = (snapshot) => {
        let temp = snapshot.val();
        setTemp(temp);
    };

    onValue(data1Ref, handleMoistureChange);
    onValue(data2Ref, handleHumidityChange);
    onValue(data3Ref, handleTempChange);

    return () => {
        off(data1Ref, 'value', handleMoistureChange);
        off(data2Ref, 'value', handleHumidityChange);
        off(data3Ref, 'value', handleTempChange);
    };
}, []);

  const weatherInfo = useWeatherInfo("Ranchi")

  useEffect(() => {
    if(weatherInfo.location) {
      setTemperature(weatherInfo.current.temp_c)
      setCondition(weatherInfo.current.condition.text)
      setIcon(weatherInfo.current.condition.icon)
    }
  }, [weatherInfo])

  return (
    <div className='flex flex-col sm:mx-14 mx-6 mt-8 w-full'>
        <div className=''>
            <p className='text-2xl text-gray-600 font-semibold'>Analytical Overview</p>
        </div>
        <div className='flex flex-row basis-1/6 flex-wrap justify-evenly'>
            <div className='flex sm:basis-1/4 max-w-[230px] min-w-[160px] w-[160px] bg-gradient-to-tl from-red-400 to-pink-500 h-[125px] sm:mr-16 mr-3 mt-6 rounded-md shadow-lg'>
                <div className='flex w-[40%] items-center justify-center'>
                    <div className='flex'>
                        {icon && <img src={icon} alt="Weather Icon" className="h-18 w-18 ml-1" />}  
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center mx-2 ml-2'>
                    <p className='text-white lg:text-3xl text-2xl font-semmibold items-center'>{temperature}°C</p>
                    <p className='text-white text-sm text-center'>{condition}</p>
                </div>
            </div>
            <div className='flex sm:basis-1/4 w-[160px] max-w-[230px] min-w-[160px] bg-gradient-to-tl from-palegreen to-blue-400 h-[125px] sm:mr-16 mt-6 rounded-md shadow-lg'>
                <div className='flex sm:w-[40%] w-1/3 items-center justify-center'>
                    <FaTemperatureThreeQuarters className=' sm:h-10 sm:w-10 h-8 w-8 text-white' />
                </div>
                <div className='flex flex-col items-center justify-center mx-2'>
                    <p className='text-white lg:text-3xl text-2xl font-semmibold items-center'>{temp}°C</p>
                    <p className='text-white text-sm text-center'>Field Tempreture</p>
                </div>
            </div>
            <div className='flex sm:basis-1/4 w-[160px] max-w-[230px] min-w-[160px] bg-gradient-to-tl from-pink-400 to-mediumpurple h-[125px] sm:mr-16 mr-3 mt-6 rounded-md shadow-lg'>
                <div className='flex sm:w-[40%] w-1/3 items-center justify-center'>
                    <WiHumidity className=' h-14 w-14 text-white' />
                </div>
                <div className='flex flex-col items-center justify-center mx-2'>
                    <p className='text-white lg:text-3xl text-2xl font-semmibold items-center '>{humidity}%</p>
                    <p className='text-white text-sm text-center'>Field Humidity</p>
                </div>
            </div>
            <div className='flex sm:basis-1/4 w-[160px] max-w-[230px] min-w-[160px] bg-gradient-to-tl from-tomato to-goldenrod h-[125px] mt-6 rounded-md shadow-lg'>
                <div className='flex sm:w-[40%] w-1/3 items-center justify-center'>
                    <BsMoisture className=' h-10 w-10 text-white' />
                </div>
                <div className='flex flex-col items-center justify-center mx-2 ml-4'>
                    <p className='text-white lg:text-3xl text-2xl font-semmibold items-center'>{moisture}%</p>
                    <p className='text-white text-sm text-center'>Soil Moisture</p>
                </div>
            </div>
        </div>
        
        <div className='flex flex-row basis-3/4 flex-wrap lg:flex-nowrap'>
            <div className='flex flex-col h-[435px] overflow-y-auto lg:w-[760px] w-full rounded-lg mt-8 shadow-lg p-2 bg-white'>
                <div className='mb-2 ml-1 flex items-center'>
                    <FaMapMarkedAlt className='ml-3 h-4 w-4 mr-2' /> 
                    <p className='font-semibold'>Moisture Mapping</p>
                </div>
                <div ref={containerRef} id='container' className='flex flex-wrap w-full'>

                </div>
            </div>

            <div className='flex flex-col h-[430px] lg:basis-5/12 min-w-[300px] w-full rounded-lg mt-8 shadow-lg lg:ml-14 mb-20 bg-gray-200'>
                <div className='flex mt-3 ml-3 h-4'>
                    <FaCamera className='mt-1 ml-3 h-4 w-4'/><p className='mx-2 font-medium'>Camera</p>
                    
                </div>
                <div className='flex items-center justify-center h-full'>
                    <p className='text-xl text-gray-600'>Offline!</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FirebaseComponent;
