import axios from "axios";

export async function currencyConverter(amount, fromCur, toCur) {
  const res = await axios.get(
    `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
  );

  console.log("res", res.data.rates[toCur]);

  return res.data.rates[toCur];
}

export async function formatPriceRange(priceRange) {
  if (!priceRange) return { usdRange: "", eurRange: "" };

  const [minStr, maxStr] = priceRange.split("-").map((str) => str.trim());
  const min = parseFloat(minStr);
  const max = parseFloat(maxStr);

  const usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const usdRange = `${usdFormatter.format(min)} - ${usdFormatter.format(max)}`;

  const eurMin = await currencyConverter(min, "USD", "EUR");
  const eurMax = await currencyConverter(max, "USD", "EUR");

  const eurFormatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
  const eurRange = `${eurFormatter.format(eurMin)} - ${eurFormatter.format(
    eurMax
  )}`;

  return { usdRange, eurRange };
}
