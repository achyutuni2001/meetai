const endpoint = "http://127.0.0.1:4040/api/tunnels";

try {
  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error(`ngrok API returned ${res.status}`);
  }

  const data = await res.json();
  const tunnel = data.tunnels?.find((t) => t.proto === "https");

  if (!tunnel?.public_url) {
    throw new Error("No active HTTPS ngrok tunnel found");
  }

  console.log(`Public URL: ${tunnel.public_url}`);
  console.log(`Webhook URL: ${tunnel.public_url}/api/webhook`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Failed to read ngrok tunnel URL: ${message}`);
  process.exit(1);
}
