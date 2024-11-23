import { nanoid } from "nanoid";

export const gen = {
  id: () => nanoid(32),
  ms_of_30_minutes: () => 30 * 60 * 1000,
  ms_of_24_hours: () => 24 * 60 * 60 * 1000,
  ms_of_7_days: () => 7 * 24 * 60 * 60 * 1000,
  x_hours_from_now_in_sec: (x: number) => Date.now() / 1000 + x * 60 * 60,
  x_hours_from_now_in_ms: (x: number) => Date.now() + x * 60 * 60 * 1000,
  x_days_from_now_in_sec: (x: number) => Date.now() / 1000 + x * 60 * 60 * 24,
};
