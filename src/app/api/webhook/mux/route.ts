export async function POST(request: Request) {
  const body = await request.json();
  const { type, data } = body;

  switch (type) {
    case "video.asset.created":
      console.log("CREATED", data);
      break;
    case "video.asset.ready":
      console.log("READY", data);
    default:
      break;
  }
  return Response.json({ message: "ok" });
}
