import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from './../components/layout/Footer';
import { useAuth } from './../components/AuthContext';
import { useTranslation } from 'react-i18next';
import AnimatedCounter from './../components/Animations/AnimatedCounter';
import { wintr_backend } from 'declarations/wintr_backend';

function LandingPage() {
  const { principal, login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    if (principal) {
      const redirectPath = sessionStorage.getItem('redirectPath');
      if (redirectPath) {
        sessionStorage.removeItem('redirectPath');
        navigate(redirectPath);
      } else {
        navigate('/admin');
      }
    }
  }, [principal, navigate]);


  useEffect(() => {
    async function initialize() {
      setIsLoading(true);
      try {
        const response = await wintr_backend.getTotalUsers();
        console.log('response:', response.ok);

        // Safely extract data with optional chaining and fallbacks
        setTotalUsers(response.toString());

      } catch (error) {
        console.error('Error fetching :', error);
      } finally {
        setIsLoading(false);
      }
    }

    initialize();
  }, []);

  const proceedWithLogin = async () => {
    await login();
  };


  return (
    <main className='duration-300 bg-light_background dark:bg-dark_background text-light_text dark:text-dark_text'>

      {/* section 1  */}
      <section className="pt-24 shadow-2xl flex flex-col items-center justify-between gap-3">
        <div className="mt-28"></div>
        <div className="flex flex-col gap-5 items-center text-center px-6">
          <h1 className='text-7xl font-normal max-w-[600px] '>
            {t('landing_page.title')}</h1>
          <p className='max-w-[600px] text-xl text-center'>{t('landing_page.intro')}</p>
          <div className="mt-5">
            <button className='dark:bg-light_background dark:text-light_text bg-light_button text-light_text py-5 px-8 rounded-full hover:scale-105 duration-300 shadow-lg' onClick={proceedWithLogin}>{t('landing_page.get_started')}</button>
          </div>
        </div>

        <div className=" pt-12 w-full overflow-hidden px-6">
          <div className="rounded-t-3xl w-full h-[400px] overflow-hidden ">
            <img src="./images/LP1.png" className=' object-cover bg-dark_background dark:bg-light_background hover:scale-105 duration-300 h-full w-full' alt="Landing Page Image 1" />
          </div>
        </div>
      </section>

      {/* section 2  */}
      <section className='px-6 pt-20 flex flex-col gap-5 xl:w-5/6 duration-300'>
        <p className=' '>{t('landing_page.what_is_wintr')}</p>
        <p className='text-3xl tracking-wide leading-snug font-normal'>{t('landing_page.wintr_description')}</p>
      </section>

      {/* section 3  */}
      <section className='px-6 pt-20 flex flex-col gap-5 xl:w-5/6 duration-300'>
        <p className=' '>{t('landing_page.total_users')}</p>
        <p className='text-3xl tracking-wide leading-snug font-normal'>
          {isLoading ? (
            <div className="bg-disabled w-24 h-8 rounded-full animate-pulse"></div>
          ) : (
            <AnimatedCounter target={totalUsers} />
          )}
        </p>
      </section>

      {/* section 4  */}
      <section className='px-6 pt-20 flex flex-col gap-10 duration-300'>

        {/* title */}
        <div className="flex flex-col gap-5">
          <p>{t('landing_page.features')}</p>
          <p className='text-3xl font-normal'>{t('landing_page.gateway_to_web3')}</p>
        </div>

        {/* content  */}
        <div className="grid gap-7 grid-cols-1 md:grid-cols-2 duration-300">
          {/* 1  */}
          <div className=" w-full flex flex-col gap-5 ">
            <div className="w-full aspect-[6/4] shadow-lg overflow-hidden rounded-3xl">
              <img src="./images/LP2.jpg" className='object-cover w-full h-full hover:scale-110 duration-300' />
            </div>
            <p className='text-xl '>{t('landing_page.nft_integration')}</p>
          </div>
          {/* 2  */}
          <div className=" w-full flex flex-col gap-5">
            <div className="w-full aspect-[6/4] shadow-lg overflow-hidden rounded-3xl">
              <img src="./images/LP3.jpg" className='object-cover w-full h-full hover:scale-110 duration-300' />
            </div>
            <p className='text-xl '>{t('landing_page.zero_gas_fee')}</p>
          </div>
          {/* 3 */}
          <div className=" w-full flex flex-col gap-5">
            <div className="w-full aspect-[6/4] shadow-lg overflow-hidden rounded-3xl">
              <img src="./images/LP4.jpg" className='object-cover w-full h-full hover:scale-110 duration-300' />
            </div>
            <p className='text-xl '>{t('landing_page.customizable_profiles')}</p>
          </div>
          {/* 4 */}
          <div className=" w-full flex flex-col gap-5">
            <div className="w-full aspect-[6/4] shadow-lg overflow-hidden rounded-3xl">
              <img src="./images/LP5.jpg" className='object-cover w-full h-full hover:scale-110 duration-300' />
            </div>
            <p className='text-xl '>{t('landing_page.seamless_navigation')}</p>
          </div>
        </div>
      </section>

      {/* section 5  */}
      <section className='mx-6 mt-20 rounded-3xl shadow-xl bg-dark_background text-dark_text dark:bg-light_background dark:text-light_text duration-300'>
        <div className="flex flex-col gap-6 xl:w-5/6 duration-300 py-16 px-10">
          <p >{t('landing_page.join_innovative_journey')}</p>
          <p className='text-3xl tracking-wide leading-snug font-normal'>{t('landing_page.ready_to_elevate')}</p>
          <div className="">
            <button className='dark:bg-light_button bg-dark_button text-dark_text dark:text-light_text py-5 px-8 rounded-full shadow-lg hover:scale-105 duration-300' onClick={proceedWithLogin}>
              {t('landing_page.get_started')}
            </button>
          </div>
        </div>
      </section>

      {/* section 6  */}
      <section className='px-6 pt-20 pb-14 flex flex-col gap-10 duration-300'>
        {/* title */}
        <div className="flex flex-col gap-5">
          <p>{t('landing_page.team')}</p>
          <p className='text-3xl font-normal'>{t('landing_page.to_keep_innovative')}</p>
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