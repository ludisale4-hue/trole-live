
CREATE TABLE public.live_status (
  id INT PRIMARY KEY DEFAULT 1,
  is_live BOOLEAN NOT NULL DEFAULT false,
  stream_title TEXT,
  stream_url TEXT,
  video_id TEXT,
  thumbnail_url TEXT,
  viewer_count INT DEFAULT 0,
  started_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT singleton CHECK (id = 1)
);

INSERT INTO public.live_status (id, is_live) VALUES (1, false);

ALTER TABLE public.live_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read live status"
  ON public.live_status FOR SELECT
  USING (true);

ALTER TABLE public.live_status REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_status;
