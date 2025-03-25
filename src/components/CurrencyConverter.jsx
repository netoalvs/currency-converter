import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BRL");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies] = useState(["USD", "BRL", "EUR", "GBP"]);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = async () => {
    if (isNaN(amount) || amount === "") {
      setConvertedAmount(null); // Se o valor não for numérico ou estiver vazio, limpa a conversão
      return;
    }

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      const rate = data.rates[toCurrency];
      setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
    } catch (error) {
      console.error("Erro ao converter moeda:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Conversor de Moedas</h2>
      <div style={styles.inputGroup}>
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          style={styles.select}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.inputGroup}>
        <span style={styles.equals}>=</span>
        <input
          type="text"
          value={convertedAmount !== null ? convertedAmount : ""}
          readOnly
          style={styles.input}
        />
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          style={styles.select}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "30px",
    border: "1px solid var(--input-border-color)",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "var(--card-bg-color)",
  },
  header: {
    color: "var(--primary-color)",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    width: "100px",
    marginRight: "10px",
    backgroundColor: "var(--input-bg-color)",
    color: "var(--input-text-color)",
    border: "1px solid var(--input-border-color)",
    borderRadius: "5px",
  },
  select: {
    padding: "8px",
    fontSize: "16px",
    backgroundColor: "var(--input-bg-color)",
    color: "var(--input-text-color)",
    border: "1px solid var(--input-border-color)",
    borderRadius: "5px",
  },
  equals: {
    margin: "0 10px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "var(--text-color)",
  },
};

export default CurrencyConverter;
