# Actualización v2 de seli (Pichu evoluciona)

## 1. Aplicar los archivos
Descomprime este zip encima de la raíz de tu proyecto y sobrescribe lo que pregunte.

## 2. Personalizar (src/config.ts)
La fecha de "Novios desde..." se genera sola: es el momento exacto en que ella pulsa el último "Sí".
- herName: su nombre (o '' para ocultarlo)
- Foto: guarda una imagen en public/foto.jpg (si no existe, no se muestra)

## 3. Dependencias (si no las tenías ya)
npm install canvas-confetti
npm install -D @types/canvas-confetti

## 4. Subir al repositorio
git add .
git commit -m "Pichu evoluciona + personalizacion"
git push origin main

Cuando termine la pestaña Actions, comprueba https://supercbb.github.io/seli/
