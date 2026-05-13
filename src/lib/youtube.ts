// Client-side YouTube helpers. The API key is exposed in the browser
// bundle — restrict it by HTTP referrer in Google Cloud Console.

const CHANNEL_HANDLE = "Trole";
// TEMP: hardcoded key. Restrict by HTTP referrer in Google Cloud Console.
const API_KEY: string | undefined =
  (import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined) ||
  "AIzaSyCPW1SSmzSukbhHsfKXATYXp2zRD4LrloI";

let cachedChannelId: string | null = null;

async function resolveChannelId(): Promise<string> {
  if (cachedChannelId) return cachedChannelId;
  if (!API_KEY) throw new Error("Missing VITE_YOUTUBE_API_KEY");
  const url = `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`;
  const res = await fetch(url);
  const json = await res.json();
  const id = json?.items?.[0]?.id;
  if (!id) throw new Error("Could not resolve channel id");
  cachedChannelId = id;
  return id;
}

export interface LiveStatus {
  is_live: boolean;
  stream_title: string | null;
  stream_url: string | null;
  video_id: string | null;
  thumbnail_url: string | null;
  viewer_count: number;
  started_at: string | null;
}

export interface RecentVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export async function fetchLiveStatus(): Promise<LiveStatus> {
  const empty: LiveStatus = {
    is_live: false,
    stream_title: null,
    stream_url: null,
    video_id: null,
    thumbnail_url: null,
    viewer_count: 0,
    started_at: null,
  };
  if (!API_KEY) return empty;

  try {
    const channelId = await resolveChannelId();
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${API_KEY}`;
    const searchRes = await fetch(searchUrl);
    const searchJson = await searchRes.json();
    const liveItem = searchJson?.items?.[0];
    if (!liveItem) return empty;

    const videoId = liveItem.id.videoId as string;
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,snippet&id=${videoId}&key=${API_KEY}`;
    const detailsRes = await fetch(detailsUrl);
    const detailsJson = await detailsRes.json();
    const v = detailsJson?.items?.[0];

    return {
      is_live: true,
      stream_title: v?.snippet?.title ?? liveItem.snippet?.title ?? null,
      stream_url: `https://www.youtube.com/watch?v=${videoId}`,
      video_id: videoId,
      thumbnail_url:
        v?.snippet?.thumbnails?.maxres?.url ??
        v?.snippet?.thumbnails?.high?.url ??
        liveItem.snippet?.thumbnails?.high?.url ??
        null,
      viewer_count: Number(v?.liveStreamingDetails?.concurrentViewers ?? 0),
      started_at: v?.liveStreamingDetails?.actualStartTime ?? null,
    };
  } catch (e) {
    console.error("fetchLiveStatus error", e);
    return empty;
  }
}

export async function fetchRecentVideos(): Promise<RecentVideo[]> {
  if (!API_KEY) return [];
  try {
    const channelId = await resolveChannelId();
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=6&key=${API_KEY}`;
    const res = await fetch(url);
    const json = await res.json();
    return (json?.items ?? [])
      .filter((i: { id?: { videoId?: string } }) => i?.id?.videoId)
      .map((i: {
        id: { videoId: string };
        snippet: {
          title: string;
          publishedAt: string;
          thumbnails: { high?: { url: string }; medium?: { url: string } };
        };
      }) => ({
        id: i.id.videoId,
        title: i.snippet.title,
        thumbnail: i.snippet.thumbnails.high?.url ?? i.snippet.thumbnails.medium?.url ?? "",
        publishedAt: i.snippet.publishedAt,
      }));
  } catch (e) {
    console.error("fetchRecentVideos error", e);
    return [];
  }
}
