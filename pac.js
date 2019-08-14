module.exports = (urls = [], hosts = [], proxyHost, proxyPort) => {
	const proxyUrls = urls.map(url => `shExpMatch(url, "${url}")`).join(' || ');
	const proxyHosts = hosts.map(host => `shExpMatch(host, "${host}")`).join(' || ');
	return ` function FindProxyForURL(url, host) {
		if (${proxyUrls}) {
			return "PROXY ${proxyHost}:${proxyPort}; DIRECT;";
		}
		if (${proxyHosts}) {
			return "PROXY ${proxyHost}:${proxyPort}; DIRECT;";
		}
		return "DIRECT;";
	}`
}
