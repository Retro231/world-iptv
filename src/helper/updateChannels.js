const updateChannels = async (data, item) => {
  const channels = [...data];
  channels.forEach(channel => {
    if (channel.tvgId === item.tvgId && channel.title === item.title) {
      if (channel.hasOwnProperty('favourite')) {
        if (channel.favourite === true) {
          channel.favourite = false;
        } else {
          channel.favourite = true;
        }
      } else {
        channel.favourite = true;
      }
    }
  });

  const favouriteChannels = data.filter(item => item.favourite === true);
  return {channels, favouriteChannels};
};

export default updateChannels;
