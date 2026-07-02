"use client";

import { useEffect, useState } from "react";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function useCountdown(targetDate: string): Countdown | null {
  const calculate = (): Countdown | null => {
    const difference = new Date(targetDate).getTime() - Date.now();

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [countdown, setCountdown] = useState<Countdown | null>(calculate());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}
