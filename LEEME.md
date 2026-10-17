# Actualización v2 de seli (Pichu evoluciona)

## 1. Aplicar los archivos
Descomprime este zip encima de la raíz de tu proyecto y sobrescribe lo que pregunte.

## 2. Personalizar (src/config.ts)
- herName: su nombre (o '' para ocultarlo)
- sinceDate: fecha en formato 'AAAA-MM-DD' (o '' para ocultar el contador)
- Foto: guarda una imagen en public/foto.jpg (si no existe, no se muestra)

## 3. Sprites
Los sprites de Pichu/Pikachu/Raichu ya van incluidos en public/sprites (no dependen de internet externo).

## 4. Dependencias (si no las tenías ya)
npm install canvas-confetti
npm install -D @types/canvas-confetti

## 5. Subir al repositorio
git add .
git commit -m "Pichu evoluciona + personalizacion"
git push origin main

Cuando termine la pestaña Actions, comprueba https://supercbb.github.io/seli/
