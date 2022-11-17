import { Currency } from "./currency";

export const Currencies = [
    {
        name: "Brazilian Real",
        code: "BRL",
        countryFlag: "BRA"
    },
    {
        name: "United States Dollar",
        code: "USD",
        countryFlag: "USA"
    },
    {
        name: "Canadian Dollar",
        code: "CAD",
        countryFlag: "CAD"
    }
].map((c) => new Currency(c.name, c.code, c.countryFlag));