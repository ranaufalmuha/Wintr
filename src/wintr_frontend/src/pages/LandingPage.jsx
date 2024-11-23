import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from './../components/layout/Footer';
import { useAuth } from './../components/AuthContext';

function LandingPage() {
  const { principal, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (principal) {
      const redirectPath = sessionStorage.getItem('redirectPath');
      if (redirectPath) {
        sessionStorage.removeItem('redirectPath');
        navigate(redirectPath);
      } else {
        navigate('/create_user');
      }
    }
  }, [principal, navigate]);

  const proceedWithLogin = async () => {
    await login();
  };

  return (
    <main className='duration-300 bg-light_background dark:bg-dark_background text-light_text dark:text-dark_text'>

      {/* section 1  */}
      <section className="pt-24 shadow-2xl flex flex-col items-center justify-between gap-3 px-6">
        <div className="mt-28"></div>
        <div className="flex flex-col gap-5 items-center text-center">
          <h1 className='text-7xl font-normal '>
            Accelerate Your <br /> Online Impact!</h1>
          <p className='max-w-[600px] text-xl text-center'>Transform your digital interactions into unforgettable experiences. Discover Wintr today and take the first step towards a limitless future!</p>
          <div className="mt-5">
            <button className='dark:bg-light_background dark:text-light_text bg-white text-light_text py-5 px-8 rounded-full hover:scale-105 duration-300 shadow-lg' onClick={proceedWithLogin}>Get Started Now</button>
          </div>
        </div>
        <div className=" pt-32 w-full overflow-hidden ">
          <div className="rounded-t-3xl w-full h-[400px] overflow-hidden ">
            <img src="./images/LP1.png" className=' object-cover bg-dark_background dark:bg-light_background hover:scale-105 duration-300 h-full w-full' alt="Landing Page Image 1" />
          </div>
        </div>
      </section>

      {/* section 2  */}
      <section className='px-6 pt-20 flex flex-col gap-5 xl:w-5/6 duration-300'>
        <p className=' '>What is Wintr?</p>
        <p className='text-3xl tracking-wide leading-snug font-normal'>Wintr is your bridge to the limitless possibilities of Web3. Designed for creators, influencers, and enthusiasts of the digital world, Wintr consolidates all your key digital touchpoints into one dynamic, interactive platform.</p>
      </section>

      {/* section 3  */}
      <section className='px-6 pt-20 flex flex-col gap-10 '>

        {/* title */}
        <div className="flex flex-col gap-5">
          <p>Features</p>
          <p className='text-3xl font-normal'>Your Gateway to the Web3 World</p>
        </div>

        {/* content  */}
        <div className="grid gap-7 grid-cols-1 md:grid-cols-2 duration-300">
          {/* 1  */}
          <div className=" w-full flex flex-col gap-5 ">
            <div className="w-full aspect-[6/4] shadow-lg overflow-hidden rounded-3xl">
              <img src="./images/LP2.jpg" className='object-cover w-full h-full hover:scale-110 duration-300' />
            </div>
            <p className='text-xl '>NFT Integration</p>
          </div>
          {/* 2  */}
          <div className=" w-full flex flex-col gap-5">
            <div className="w-full aspect-[6/4] shadow-lg overflow-hidden rounded-3xl">
              <img src="./images/LP3.jpg" className='object-cover w-full h-full hover:scale-110 duration-300' />
            </div>
            <p className='text-xl '>Zero Gas Fee Transactions</p>
          </div>
          {/* 3 */}
          <div className=" w-full flex flex-col gap-5">
            <div className="w-full aspect-[6/4] shadow-lg overflow-hidden rounded-3xl">
              <img src="./images/LP4.jpg" className='object-cover w-full h-full hover:scale-110 duration-300' />
            </div>
            <p className='text-xl '>Customizable Profiles</p>
          </div>
          {/* 4 */}
          <div className=" w-full flex flex-col gap-5">
            <div className="w-full aspect-[6/4] shadow-lg overflow-hidden rounded-3xl">
              <img src="./images/LP5.jpg" className='object-cover w-full h-full hover:scale-110 duration-300' />
            </div>
            <p className='text-xl '>Seamless Navigation</p>
          </div>
        </div>
      </section>

      {/* section 4  */}
      <section className='mx-6 mt-20 rounded-3xl shadow-xl bg-dark_background text-dark_text dark:bg-light_background dark:text-light_text duration-300'>
        <div className="flex flex-col gap-6 xl:w-5/6 duration-300 py-16 px-10">
          <p className=' '>Join us on this innovative journey and explore the future of digital interaction!</p>
          <p className='text-3xl tracking-wide leading-snug font-normal'>Ready to elevate your digital presence? Sign up for Wintr today and unlock the true potential of Web3!</p>
          <div className="">
            <button className='dark:bg-white bg-dark_button text-light_text py-5 px-8 rounded-full shadow-lg hover:scale-105 duration-300' onClick={proceedWithLogin}>Get Started Now</button>
          </div>
        </div>
      </section>

      {/* section 5  */}
      <section className='px-6 pt-20 flex flex-col gap-10 duration-300'>
        {/* title */}
        <div className="flex flex-col gap-5">
          <p>Team</p>
          <p className='text-3xl font-normal'>To Keep Innovative Wintr</p>
        </div>

        {/* Content */}
        <div className=" w-full flex flex-col gap-5">
          <div className="w-full aspect-[2/1] shadow-lg overflow-hidden rounded-3xl">
            <img src="./images/LPLast.jpg" className='object-cover w-full h-full hover:scale-110 duration-300' />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default LandingPage;


// Dependencies: pnpm install lucide-react
