import React from 'react';
import Image from 'next/image';

const AdvantagesSection = () => {
  return (
    <div className="bg-background" aria-labelledby="advantages-section">
      <div className='max-w-screen-lg mx-auto px-6 mt-24 mb-14 grid grid-cols-1 sm:grid-cols-2'>
        <div className='col-span-1 text-start sm:pr-0 md:max-w-[512px] pb-5'>
          <h2 id="automatization-advantage" className="font-black text-2xl md:text-4xl pb-5">Скорость имеет
            значение</h2>
          <p className='text-gray-600 font-semibold'>Централизованная система чтобы <b>объединить функционал разных
            маркетплейсов</b> вокруг единого интерфейса, который ускорит работу всей Вашей команды
            <br />
            <br />
            Нажмите одну кнопку, и смотрите как товар окажется везде!

          </p>
        </div>
        {/*  тут про сквозную интеграцию, единый интерфейс, экономию на скорости */}
        <figure className="col-span-1 max-w-[460px] flex items-center justify-center relative">
          <Image
            src="/automatization-advantage-image.png"
            alt="Изображение функций различных маркетплейсов и сквозной оптимизации процессов благодаря marketplacer"
            width={460}
            height={300}

            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-auto object-contain"
            priority
          />
          <figcaption className="sr-only">
            Изображение функций различных маркетплейсов и сквозной оптимизации процессов благодаря marketplacer
          </figcaption>
        </figure>
      </div>
      {/*  тут про ведение одной фирмы\команды */}

      <div className='max-w-screen-lg mx-auto px-6 mt-24 my-28 grid grid-cols-1 sm:grid-cols-2'>
        <div className='col-span-1 text-start sm:pr-0 md:max-w-[512px] pb-5'>
          <h2 id="automatization-advantage" className="font-black text-2xl md:text-4xl pb-5">Создан для совместной работы</h2>
          <p className='text-gray-600 font-semibold'>В одной команде может быть несколько людей
            <br />
            <br />
            создайте чето там

          </p>
        </div>
        {/*  тут про сквозную интеграцию, единый интерфейс, экономию на скорости */}
        <figure className="col-span-1 max-w-[460px] flex items-center justify-center relative">
          <Image
            src="/automatization-advantage-image.png"
            alt="Скриншот страницы создания карточки для маркетплейсов, скриншот аналитики карточки товара, процесс автоматизации с использованием нашего приложения"
            width={460}
            height={300}

            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-auto object-contain"
            priority
          />
          <figcaption className="sr-only">
            Изображение функций различных маркетплейсов и сквозной оптимизации процессов благодаря marketplacer
          </figcaption>
        </figure>
      </div>
      <div className='mb-96'>
        <h2>Аналитически подкован - значит безупречен</h2>
        <p>Много данных - сложно, одно место которое собирает эти данные - в разы проще</p>
        {/*  тут про аналитику продукта сразу из нескольких ресурсов - в едином интерфейсе */}
      </div>
    </div>
  );
};

export default AdvantagesSection;
