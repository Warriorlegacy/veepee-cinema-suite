-- Insert the service "Self-Designing Facades"
INSERT INTO public.services (id, name, description, icon, sort_order)
VALUES (
  '7a00f135-e63d-4c38-89c5-842211bbcc01',
  'Self-Designing Facades',
  'Highly artistic metal mesh and lace fencing designs, seamlessly integrating traditional patterns with modern architecture for residential, commercial and security applications.',
  'Building2',
  110
) ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    sort_order = EXCLUDED.sort_order;

-- Delete existing service images for this service to avoid duplicates when running migration multiple times
DELETE FROM public.service_images WHERE service_id = '7a00f135-e63d-4c38-89c5-842211bbcc01';

-- Insert the service gallery images
INSERT INTO public.service_images (service_id, url, caption, sort_order)
VALUES 
  ('7a00f135-e63d-4c38-89c5-842211bbcc01', '/catalogue/self-designing-facades/facade-sample.png', 'Parametric CNC Laser-Cut Facade Screen', 5),
  ('7a00f135-e63d-4c38-89c5-842211bbcc01', '/catalogue/self-designing-facades/facade-1.jpg', 'Artistic Lace Pattern Fencing in public park', 10),
  ('7a00f135-e63d-4c38-89c5-842211bbcc01', '/catalogue/self-designing-facades/facade-2.jpg', 'Intricate lace mesh privacy screen on deck balcony', 20),
  ('7a00f135-e63d-4c38-89c5-842211bbcc01', '/catalogue/self-designing-facades/facade-3.jpg', 'Lace-woven residential security gate panel', 30);

-- Update the primary image_url in services table
UPDATE public.services s 
SET image_url = sub.url 
FROM (
  SELECT DISTINCT ON (service_id) service_id, url 
  FROM public.service_images 
  ORDER BY service_id, sort_order
) sub 
WHERE sub.service_id = s.id AND s.id = '7a00f135-e63d-4c38-89c5-842211bbcc01';
