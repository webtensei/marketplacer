import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export const LoginPage = () => {
  return (
			<div className="flex flex-col gap-4">
            <form className="flex flex-col gap-4">
				<Input type="email" placeholder="Почта" />
				<Input type="password" placeholder="Пароль" />
				<Button className="w-full" color="primary">Войти</Button>
			</form>
			<div>
				<div className="gap-4 flex flex-row">
					<Button isIconOnly aria-label="telegram" className="w-1/3" disabled>T</Button>
					<Button isIconOnly aria-label="google" className="w-1/3" disabled>G</Button>
					<Button isIconOnly aria-label="yandex" className="w-1/3" disabled>Y</Button>
				</div>
			</div>
            </div>

  );
};

