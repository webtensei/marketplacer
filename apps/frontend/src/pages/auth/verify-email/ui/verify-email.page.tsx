import { InputOtp, Link } from "@nextui-org/react";
import { useState } from "react";

export const VerifyEmailPage = () => {

    return (
        <div className="flex flex-col">
            <p className="text-sm text-foreground mb-4">Сообщение с кодом отправлено на почту webtensei@gmail.com</p>
            <p className="text-sm text-foreground">Введите код из письма ниже</p>
            <InputOtp  length={6} variant="bordered" />
            <p className="text-sm text-foreground mt-4">
            <div className="flex flex-col gap-4">
            <Link color="primary" className="p-0 cursor-pointer">Отправить повторно</Link>
            <Link color="primary" className="p-0 cursor-pointer">Изменить почту</Link>
            </div>

            </p>
        </div>
    );
};

