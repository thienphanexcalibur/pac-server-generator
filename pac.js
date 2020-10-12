module.exports = (urls = [], hosts = [], proxyHost, proxyPort) => {
	const proxyUrls = urls.map(url => `shExpMatch(url, "${url}")`).join(' || ');
	const proxyHosts = hosts.map(host => `shExpMatch(host, "${host}")`).join(' || ');
  const proxyHostsString = proxyHosts ?
`if(${proxyHosts}) {
      return "PROXY ${proxyHost}:${proxyPort}; DIRECT";
   }` : '';
  const proxyUrlsString = proxyUrls ?
`if(${proxyUrls}) {
      return "PROXY ${proxyHost}:${proxyPort}; DIRECT";
   }` : '';

	return ` function FindProxyForURL(url, host) {

		if (dnsDomainIs(host, "trochoi.coccoc.com")) {
			return "PROXY ${proxyHost}:${proxyPort}; DIRECT";
		}

		if (shExpMatch(url, "*favicon.ico") || shExpMatch(url, "*composer") || shExpMatch(url, "https://coccoc.com/webhp/ntp.json?*")) {
			return "DIRECT";
		}

		if (shExpMatch(host, "dev-browser-game-api.coccoc.com")) {
			return "DIRECT";
		}

		if (url.substring(0, 6) == "https:" && shExpMatch(host, "coccoc.com")) {
			return "PROXY ${proxyHost}:${proxyPort}; DIRECT";
		}
		${proxyHostsString}
		${proxyUrlsString}
			return "DIRECT";
	}`
}
