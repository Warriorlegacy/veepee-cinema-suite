-- Insert the service "Customized Metal Furniture"
INSERT INTO public.services (id, name, description, icon, sort_order)
VALUES (
  'e0d37651-789a-41f2-ba2c-29a3a1f9ee01',
  'Customized Metal Furniture',
  'Bespoke metal and wood furniture — dining tables, study desks, coffee tables, modern shelving units, and custom metal seating. Engineered for durability and style.',
  'Armchair',
  120
) ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    sort_order = EXCLUDED.sort_order;

-- Delete existing service images for this service to avoid duplicates when running migration multiple times
DELETE FROM public.service_images WHERE service_id = 'e0d37651-789a-41f2-ba2c-29a3a1f9ee01';

-- Insert the service gallery images
INSERT INTO public.service_images (service_id, url, caption, sort_order)
VALUES 
  ('e0d37651-789a-41f2-ba2c-29a3a1f9ee01', '/catalogue/metal-furniture/furniture-1.png', 'Modern Geometric Laser-Cut Coffee Table', 5),
  ('e0d37651-789a-41f2-ba2c-29a3a1f9ee01', '/catalogue/metal-furniture/furniture-2.png', 'Modern Industrial Shelving Unit', 10),
  ('e0d37651-789a-41f2-ba2c-29a3a1f9ee01', '/catalogue/metal-furniture/furniture-3.png', 'Bespoke Spider-Leg Dining Table Base', 20),
  ('e0d37651-789a-41f2-ba2c-29a3a1f9ee01', '/catalogue/metal-furniture/furniture-4.png', 'Art Deco Laser-Cut Accent Chair', 30);

-- Update the primary image_url in services table
UPDATE public.services s 
SET image_url = sub.url 
FROM (
  SELECT DISTINCT ON (service_id) service_id, url 
  FROM public.service_images 
  ORDER BY service_id, sort_order
) sub 
WHERE sub.service_id = s.id AND s.id = 'e0d37651-789a-41f2-ba2c-29a3a1f9ee01';
