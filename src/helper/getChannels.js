// import test from '../test.json';

const fatchURLOne = async countryCode => {
  // URL of the M3U file
  const m3uUrl = `https://iptv-org.github.io/iptv/countries/${countryCode}.m3u`;

  try {
    // Fetch the contents of the M3U file
    const data = await fetch(m3uUrl, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    }).then(response => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(
          `Failed to fetch M3U file. Status code: ${response.status}`,
        );
      }
      // Return the response text
      return response.text();
    });
    // Split the contents of the file by lines

    const lines = data.split('\n');
    const channels = [];

    // Process each line
    lines.forEach((line, index) => {
      // Check if the line is a valid stream entry
      if (line.startsWith('#EXTINF:')) {
        // Extract channel details from the line
        const [, titleMatch] = line.match(/,(.*)$/);
        // const matchResult = line.match(
        //   /tvg-id="([^"]+)" tvg-logo="([^"]+)" group-title="([^"]+)"/,
        // );
        // Regular expression pattern to match the desired values
        const regex =
          /tvg-id="([^"]*)" tvg-logo="([^"]*)" group-title="([^"]*)"/;

        // Executing the regular expression on the line
        const match = regex.exec(line);

        // Extracting the values from the matched groups
        if (match !== null) {
          const tvgId = match[1];
          const tvgLogo = match[2];
          const groupTitle = match[3];

          const streamUrl = lines[index + 1];

          // Create channel object
          const channel = {
            title: titleMatch.trim() !== undefined ? titleMatch.trim() : 'none',
            tvgId: tvgId,
            tvgLogo:
              tvgLogo !== undefined && tvgLogo !== null && tvgLogo.length !== 0
                ? tvgLogo
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwiLDAcEivE3TadqQM4NizO0TYfIBh6R7vnv-hzg8Cmg&s',
            groupTitle: groupTitle !== undefined ? groupTitle : 'none',
            streamUrl:
              streamUrl !== undefined &&
              streamUrl !== null &&
              streamUrl.length !== 0
                ? streamUrl
                : 'https://3abn-live.akamaized.net/hls/live/2010549/Proclaim/master.m3u8',
          };
          // Push channel object into array
          if (channel.tvgId !== '') {
            channels.push(channel);
          }
        }
      }
    });

    return channels;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const sortDataOne = async countryCode => {
  const dataOne = await fatchURLOne(countryCode);

  // Filter elements with groupTitle = 'News'
  const newsItems = dataOne.filter(item => item.groupTitle === 'News');
  // Filter elements that do not have groupTitle = 'News'
  const otherItems = dataOne.filter(item => item.groupTitle !== 'News');

  // Concatenate newsItems first followed by otherItems
  const sortedDataOne = newsItems.concat(otherItems);

  console.log(sortDataOne.length);

  return sortedDataOne;
};

const fatchURLTwo = async () => {
  // const url = 'https://retrosoft.co/iptv_test_json.json';

  const url = 'https://ads.livemtv.com/Usa_json_bowntown_version2.json';

  // const url = 'https://api.jsonbin.io/v3/b/66624163ad19ca34f87552f3';

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

    // Log the data to the console
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return [];
  }
};

export const getChannels = async countryCode => {
  const dataTwo = await fatchURLTwo();

  // console.log(dataTwo);

  // return [...dataTwo, ...sortedDataOne];

  const infoJSON = dataTwo;

  // console.log(infoJSON);

  if (infoJSON.showDefaultURL === true && infoJSON.showCustomURL === true) {
    const sortedDataOne = await sortDataOne(countryCode);
    return [...infoJSON.customURL, ...sortedDataOne];
  } else if (
    infoJSON.showDefaultURL === true &&
    infoJSON.showCustomURL === false
  ) {
    const sortedDataOne = await sortDataOne(countryCode);
    return [...sortedDataOne];
  } else if (
    infoJSON.showDefaultURL === false &&
    infoJSON.showCustomURL === true
  ) {
    console.log('hit false true');

    return [...infoJSON.customURL];
  } else {
    return [];
  }
};
