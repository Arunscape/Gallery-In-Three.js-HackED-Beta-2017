const getGyfs = async () => {
  return await fetch('https://api.gfycat.com/v1/gfycats/trending?tagName=_gfycat_all_trending&count=100&cursor=')
    .then(res => res.json())
    .then(data => {
      data = data.gfycats.map(e => e.webmUrl);
      console.log(data);
      return data;
    });

}
