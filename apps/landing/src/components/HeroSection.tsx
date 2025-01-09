import { Button, Link } from '@nextui-org/react';
import Image from 'next/image';

//TODO src="/hero-section-primary-image.webp" ПЕРЕВЕСТИ КАРТИНКУ НА WEBP
const HeroSection = () => {
  return (
    <div className="bg-background grid grid-cols-1 md:grid-cols-2" aria-labelledby="hero-section">
      {/* Левый блок: Основное содержимое */}
      <div className="col-span-1 text-center md:text-start mt-[6%] px-6 sm:pr-0 md:pl-6 md:pt-24 md:max-w-[512px] md:ml-auto">
        <h1 id="hero-section-heading" className="font-black text-3xl md:text-5xl pb-5">
          Автоматизация процессов бизнеса на маркетплейсах
        </h1>
        <p className="text-gray-600 text-lg font-semibold">
Систематизируйте и анализируйте работу с несколькими маркетплейсами, используя всего один интуитивно понятный интерфейст.
        </p>
        <div className="mt-10 gap-4 flex pb-4 md:pb-12 justify-center flex-col md:flex-row items-center md:justify-start">
          <Button
            radius="sm"
            size="lg"
            color="primary"
            as={Link}
            href="/register"
            aria-label="Перейти к регистрации"
          >
            Зарегистрироваться
          </Button>
          <Button
            radius="sm"
            size="lg"
            color="primary"
            variant="light"
            as={Link}
            href="/login"
            aria-label="Перейти к входу"
          >
            Войти
          </Button>
        </div>
      </div>

      {/* Правый блок: Изображение */}
        <figure className="col-span-1 flex items-center justify-center relative">
          <Image
            src="/hero-section-primary-image.png"
            alt="Скриншот страницы создания карточки для маркетплейсов, скриншот аналитики карточки товара, процесс автоматизации с использованием нашего приложения"
            width={700}
            height={500}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-auto object-contain"
            priority
          />
          <figcaption className="sr-only">
            Скриншот страницы создания карточки для маркетплейсов, скриншот аналитики карточки товара, процесс автоматизации с использованием нашего приложения
          </figcaption>
        </figure>
    </div>
  );
};

export default HeroSection;
