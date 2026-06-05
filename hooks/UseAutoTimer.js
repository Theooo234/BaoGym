import { useEffect, useState } from "react";

export const useAutoTimer = () => {
  const [secondes, setSecondes] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondes((secondesPrecedentes) => secondesPrecedentes + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formaterTemps = (tempsEnSecondes) => {
    const minutes = Math.floor(tempsEnSecondes / 60);
    const secondesRestantes = tempsEnSecondes % 60;

    const minutesFormatees = minutes < 10 ? `0${minutes}` : minutes;
    const secondesFormatees =
      secondesRestantes < 10 ? `0${secondesRestantes}` : secondesRestantes;

    return `${minutesFormatees}:${secondesFormatees}`;
  };

  return {
    secondesBrutes: secondes,
    tempsFormate: formaterTemps(secondes),
  };
};
