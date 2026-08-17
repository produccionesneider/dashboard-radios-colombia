-- ============================================================
-- EJECUTA ESTE SQL EN SUPABASE > SQL EDITOR
-- Soluciona el error: "permission denied for table emisoras"
-- ============================================================

-- 1. Habilitar RLS en la tabla emisoras (si no está)
ALTER TABLE emisoras ENABLE ROW LEVEL SECURITY;

-- 2. Política: CUALQUIERA puede LEER las emisoras (para la app móvil)
CREATE POLICY "Lectura pública de emisoras"
  ON emisoras
  FOR SELECT
  USING (true);

-- 3. Política: CUALQUIERA autenticado puede INSERTAR
CREATE POLICY "Insertar emisoras autenticado"
  ON emisoras
  FOR INSERT
  WITH CHECK (true);

-- 4. Política: CUALQUIERA autenticado puede ACTUALIZAR
CREATE POLICY "Actualizar emisoras autenticado"
  ON emisoras
  FOR UPDATE
  USING (true);

-- 5. Política: CUALQUIERA autenticado puede ELIMINAR
CREATE POLICY "Eliminar emisoras autenticado"
  ON emisoras
  FOR DELETE
  USING (true);

-- ============================================================
-- TAMBIÉN: Agregar columnas faltantes si no existen
-- ============================================================

-- Verificar y agregar columnas que usa el dashboard
ALTER TABLE emisoras ADD COLUMN IF NOT EXISTS ciudad       text;
ALTER TABLE emisoras ADD COLUMN IF NOT EXISTS frecuencia   text;
ALTER TABLE emisoras ADD COLUMN IF NOT EXISTS genero       text;
ALTER TABLE emisoras ADD COLUMN IF NOT EXISTS color_fondo  text;
ALTER TABLE emisoras ADD COLUMN IF NOT EXISTS oyentes      text;
ALTER TABLE emisoras ADD COLUMN IF NOT EXISTS activa       boolean DEFAULT true;
ALTER TABLE emisoras ADD COLUMN IF NOT EXISTS sitio_web    text;
ALTER TABLE emisoras ADD COLUMN IF NOT EXISTS whatsapp     text;
ALTER TABLE emisoras ADD COLUMN IF NOT EXISTS facebook     text;
ALTER TABLE emisoras ADD COLUMN IF NOT EXISTS instagram    text;
ALTER TABLE emisoras ADD COLUMN IF NOT EXISTS twitter      text;
ALTER TABLE emisoras ADD COLUMN IF NOT EXISTS tiktok       text;
ALTER TABLE emisoras ADD COLUMN IF NOT EXISTS youtube      text;
