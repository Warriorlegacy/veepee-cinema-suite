
CREATE POLICY "Service images are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'service-images');
