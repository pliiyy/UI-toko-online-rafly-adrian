import moment from "moment";

const rounded: number = parseInt(process.env.NEXT_PUBLIC_APP_ROUNDED || "1000");

export const IDRFormat = (number: number) => {
  const temp = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    currency: "IDR",
  }).format(number);
  return temp;
};

export const AngsuranAnuitas = (
  plafond: number,
  tenor: number,
  bunga: number,
  unit: number
) => {
  const r = bunga / (365 / unit) / 100;

  const angsuran =
    (plafond * (r * Math.pow(1 + r, tenor))) / (Math.pow(1 + r, tenor) - 1);
  const pokok = plafond / tenor;
  const margin = angsuran - pokok;

  return {
    angsuran: Math.ceil(angsuran / rounded) * rounded,
    pokok,
    margin,
  };
};

export const AngsuranFlat = (
  plafond: number,
  tenor: number,
  bunga: number,
  unit: number
) => {
  const r = bunga / (365 / unit) / 100;

  const angsuran = parseInt(
    ((plafond + plafond * r * tenor) / tenor).toFixed(0)
  );
  const pokok = parseInt((plafond / tenor).toFixed(0));
  const margin = parseInt((angsuran - pokok).toFixed(0));

  return {
    angsuran: Math.ceil(angsuran / rounded) * rounded,
    pokok,
    margin,
  };
};

export const GetStartPaidDate = (
  startDate: Date,
  tenor: number,
  blokir: number,
  unit: number
) => {
  switch (unit) {
    case 30:
      return {
        startDate: moment(startDate)
          .add(1 + blokir, "month")
          .format("DD/MM/YYYY"),
        endDate: moment(startDate).add(tenor, "month").format("DD/MM/YYYY"),
      };
    case 7:
      return {
        startDate: moment(startDate)
          .add(1 + blokir, "week")
          .format("DD/MM/YYYY"),
        endDate: moment(startDate).add(tenor, "week").format("DD/MM/YYYY"),
      };
    case 1:
      return {
        startDate: moment(startDate)
          .add(1 + blokir, "day")
          .format("DD/MM/YYYY"),
        endDate: moment(startDate).add(tenor, "day").format("DD/MM/YYYY"),
      };
    default:
      return {
        startDate: "DD/MM/YYYY",
        endDate: "DD/MM/YYYY",
      };
  }
};
