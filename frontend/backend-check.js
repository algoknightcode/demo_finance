// Run this script to check if your backend is accessible

const checkBackend = async () => {
  console.log("Checking backend server status...");
  
  const endpoints = [
    "http://localhost:5000",
    "http://localhost:5000/api/auth/login"
  ];
  
  for (const url of endpoints) {
    try {
      console.log(`Testing endpoint: ${url}`);
      const startTime = Date.now();
      
      const response = await fetch(url, {
        method: "OPTIONS",
        headers: { "Accept": "application/json" },
      }).catch(e => null);
      
      const endTime = Date.now();
      const timeElapsed = endTime - startTime;
      
      if (response) {
        console.log(`✅ ${url} is reachable (${timeElapsed}ms)`);
      } else {
        console.log(`❌ ${url} is NOT reachable (${timeElapsed}ms)`);
      }
    } catch (error) {
      console.error(`❌ Error checking ${url}: ${error.message}`);
    }
  }
  
  console.log("\nTroubleshooting tips:");
  console.log("1. Make sure your backend server is running");
  console.log("2. Check if your backend has CORS enabled");
  console.log("3. Verify the port number (5000 or 8000?)");
  console.log("4. Check your firewall settings");
};

// Auto-run when imported
checkBackend();
