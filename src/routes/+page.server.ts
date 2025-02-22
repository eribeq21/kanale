export const load = async () => {
  return {
      streamed: {
          streamURL: fetchStreamURL()
      }
  };
};

// Simulated function to fetch stream URL
async function fetchStreamURL() {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve("http://spt.securedirect.org/skyatlantic/index.m3u8");
      }, 2000); // Simulate delay
  });
}
