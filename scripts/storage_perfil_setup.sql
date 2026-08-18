-- ============================================================
-- EJECUTA ESTE SQL EN SUPABASE > SQL EDITOR
-- Soluciona el error de que no se suben las imagenes a Supabase Storage (perfil)
-- ============================================================

-- 1. Permitir lectura publica de las fotos de perfil
CREATE POLICY "Lectura publica de fotos de perfil" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'image-perfil');

-- 2. Permitir subir nuevas fotos al bucket de perfil
CREATE POLICY "Subir fotos de perfil" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'image-perfil');

-- 3. Permitir actualizar/reemplazar fotos en el bucket de perfil
CREATE POLICY "Actualizar fotos de perfil" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'image-perfil');

-- 4. Permitir eliminar fotos del bucket de perfil
CREATE POLICY "Eliminar fotos de perfil" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'image-perfil');
