import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { motion } from "framer-motion";

export const RegisterPage = () => {
  return (
        <form className="flex flex-col gap-4">
				<Input type="email" placeholder="Почта" />
				<Input type="password" placeholder="Пароль" />
				<Input type="password" placeholder="Повторите пароль" />
				<Button className="w-full" color="primary">Зарегистрироваться</Button>
        </form>
  )
};


