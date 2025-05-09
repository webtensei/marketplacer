import { GoogleGuard } from './google.guard';
import { YandexGuard } from './yandex.guard';

export const AUTH_GUARDS = [GoogleGuard, YandexGuard];
