import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const RegisterDtoSchema = z.object({
  username: z.string({ message: 'Необходимо ввести имя пользователя' }).min(1),
  password: z.string({ message: 'Необходимо ввести пароль' }).min(1),
});

export class RegisterDto  extends createZodDto(RegisterDtoSchema) {}