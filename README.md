# Open When…

Una caja de 13 cartas personales, hecha con Next.js, TypeScript, Tailwind CSS y Framer Motion. Sin backend ni base de datos. Las cartas contienen los textos proporcionados por su autor; la carta de recuerdos está preparada para recibir sus fotos.

## Desarrollo

Requiere Node.js 22 o posterior y npm.

```sh
npm ci
npm run dev
```

Abre http://localhost:3000. La clave es **03042004**.
En PowerShell, si la política impide ejecutar `npm.ps1`, utiliza `npm.cmd`.

## Añadir contenido

Modifica `src/data/letters.ts`. Conserva los IDs: son la identidad persistente de cada carta. El subtítulo se configura en `collection.subtitle`.

- `content`: texto, con saltos de línea y párrafos (`\n\n` o template literals).
- `images`: rutas como `/memories/photo1.jpg`. También admite objetos `{ src, alt, width, height }` para describir cada foto y preservar su proporción exacta.
- `audio`: una ruta como `/music/song.mp3`.
- `video`: una ruta como `/videos/memory.mp4`.
- `blocks`: bloques ordenados de tipo `text`, `image`, `audio`, `video` o `moon-journey`, para intercalar contenido. Sus tipos se encuentran en `src/types/letter.ts`. `moon-journey` muestra el viaje de ida y vuelta del cohete en un bucle de 12 segundos, con pausa y adaptación a movimiento reducido.

Coloca los archivos en `public/memories`, `public/music` o `public/videos` según corresponda. Estas carpetas se pueden crear cuando tengas los archivos. Las imágenes usan Next/Image; los medios tienen controles y nunca se reproducen automáticamente. Prefiere archivos locales; las imágenes externas necesitan configurar sus dominios en Next.js.

El mensaje de carta vacía desaparece automáticamente cuando añades contenido. No hace falta cambiar componentes para las combinaciones previstas. Para videos con voz, añade subtítulos mediante `<track>` en el renderizador cuando dispongas del archivo de subtítulos.

## Persistencia y acceso

`src/lib/storage.ts` centraliza la clave y las claves LocalStorage. Se guardan la sesión y los IDs abiertos, se validan datos persistidos y se sincronizan cambios entre pestañas. Bloquear las cartas conserva el historial. Si el almacenamiento no está disponible, la sesión sigue funcionando en memoria y se muestra un aviso.

El acceso es una barrera visual; la clave y el contenido frontend no constituyen seguridad real. El historial pertenece a cada navegador y dispositivo.

## Verificación

```sh
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Las pruebas cubren la clave, recargas, bloqueo, las 13 cartas, persistencia, almacenamiento no disponible, teclado, cierre externo, animaciones y anchuras de 320 a 1536 px. El servidor de pruebas selecciona automáticamente el comando de npm para tu sistema operativo.

## Vercel

Sube el proyecto a un repositorio e impórtalo en Vercel. El preset Next.js detecta `npm run build` automáticamente. No necesita variables de entorno ni servicios externos. Para producción local: `npm run build` y `npm start`.
