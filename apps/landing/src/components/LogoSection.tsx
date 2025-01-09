import Image from 'next/image';

const LogoSection = () => {
  return (
    <section aria-labelledby="integrated-with-logo-section" className="relative bg-[#E7E6E5] py-16">
      <div className="mx-auto px-6 max-w-screen-lg container text-center">
        <h4 className="text-gray-600 text-medium font-bold mb-5">
          Уже автоматизировали работу с этими маркетплейсами
        </h4>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 opacity-40">
          <figure className="w-[132px] flex items-center">
            <Image
              src={'/ozon_logo.png'}
              alt={'Логотип маркетплейса ozon'}
              width={132}
              height={33.19}
            />
            <figcaption className="sr-only">
              Логотип маркетплейса ozon
            </figcaption>
          </figure>
          <figure className="flex items-center">
            <Image
              src={'/wilderries_logo.png'}
              alt={'Логотип маркетплейса wildberries'}
              width={216}
              height={33.19}
            />
            <figcaption className="sr-only">
              Логотип маркетплейса wildberries
            </figcaption>
          </figure>
          <div className='text-2xl font-black flex justify-center items-center'>
            А сколько ждёт впереди...
          </div>
        </div>
      </div>
    </section>
  )
    ;
};

export default LogoSection;
