const getCountryFlag = (country) => {
    const flagURL = `https://countryflagsapi.com/png/${country}`;
    return flagURL;
}

export default getCountryFlag;