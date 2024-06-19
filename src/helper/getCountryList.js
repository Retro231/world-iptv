const getCountryList = async () => {
  const url = 'https://iptv-org.github.io/api/countries.json';

  try {
    let response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    // Check if the fetch was successful
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    // Parse the JSON
    let data = await response.json();

    // console.log(data);

    // Log the data to the console
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return [];
  }
};

export default getCountryList;
