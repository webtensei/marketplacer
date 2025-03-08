import { routes } from '@/shared/lib/react-router';
import { AuroraBackground, FlipWords } from '@/shared/ui';
import { Link } from '@nextui-org/react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const AuthView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const words = ["Автоматизировать", "Анализировать", "Управлять"]
	const placeholders = [
		"У меня хороший товар?",
		"В моей нише большая конкуренция?",
		"Расскажи мне сказку про успех",
		"Удобно ли работать с телефона?",
	]

  return <div className="flex min-h-[100vh] flex-row">
  <div className="w-10/12 sm:block hidden">
				<AuroraBackground>
        <motion.div className="w-4/5 h-3/5 text-2xl text-foreground flex flex-col gap-2">
						<p>Давай так, мы будем <FlipWords words={words} /> <br /></p>
            <p>потому что мы - <span className="p-1 pt-0 bg-primary/20  text-primary rounded-md align-middle">Marketplacer</span></p>
					</motion.div>

				</AuroraBackground>
			</div>
      <div className="w-full bg-accent min-h-full sm:min-w-[350px] sm:w-3/12 px-8 py-24 flex flex-col h-[100vh] justify-between">
      <motion.div className="gap-4 flex flex-col">
        <h3 className=" text-2xl w-full border-b-4 border-b-primary">
          {location.pathname === routes.auth.login() && "Авторизация"}
          {location.pathname === routes.auth.register() && "Регистрация"}
        </h3>
        <Outlet />
        {location.pathname === routes.auth.login() && <p>Нет аккаунта? <Link color="primary" className="p-0 cursor-pointer" onPress={() => navigate(routes.auth.register())}>Зарегистрироваться</Link></p>}
        {location.pathname === routes.auth.register() && <p>Есть аккаунт? <Link color="primary" className="p-0 cursor-pointer" onPress={() => navigate(routes.auth.login())}>На страницу входа</Link></p>}

      </motion.div>


      </div>
  </div>;
};

export default AuthView;
