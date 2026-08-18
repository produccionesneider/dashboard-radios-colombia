-- ============================================================
-- EJECUTA ESTE SQL EN SUPABASE > SQL EDITOR
-- Soluciona el error de que no se suben las imagenes a Supabase Storage
-- ============================================================

-- 1. Permitir que cualquier persona pueda VER los logos (necesario para que las URLs públicas funcionen)
CREATE POLICY "Lectura publica de logos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'logos_emisoras');

-- 2. Permitir subir nuevas imágenes al bucket
CREATE POLICY "Subir logos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'logos_emisoras');

-- 3. Permitir actualizar/reemplazar imágenes en el bucket
CREATE POLICY "Actualizar logos" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'logos_emisoras');

-- 4. Permitir eliminar imágenes del bucket
CREATE POLICY "Eliminar logos" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'logos_emisoras');
