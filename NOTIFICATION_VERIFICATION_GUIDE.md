# 🔍 Guía de Verificación de Notificaciones

## Cómo verificar que las notificaciones están funcionando

### 📍 Paso 1: Abrir la Consola del Servidor
1. Ve a la terminal donde está corriendo `npm run dev`
2. Esta es la consola del **servidor** (Node.js)
3. Aquí verás los logs del lado del servidor

### 📍 Paso 2: Abrir la Consola del Navegador
1. Abre tu navegador en `http://localhost:3000`
2. Presiona `F12` o `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
3. Ve a la pestaña "Console"
4. Esta es la consola del **cliente** (navegador)

### 📍 Paso 3: Resolver una Incidencia
1. En el dashboard, busca una incidencia con estado "Open" (abierta)
2. Haz clic en el botón verde con el ícono ✓
3. Escribe comentarios de resolución (ej: "Fixed the elevator motor")
4. Haz clic en "Confirm Resolution"

### 📍 Paso 4: Verificar los Logs

#### En la CONSOLA DEL SERVIDOR (Terminal):
Deberías ver algo como esto:

```
🔧 [ADMIN ACTION] Starting incident resolution for ID: 1
📝 Resolution comments: "Fixed the elevator motor"
✅ Incident found: { id: 1, type: 'Maintenance', location: 'Lobby', status: 'Open' }
📤 Preparing to send notification...
📧 Calling sendNotification function...

🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔
📧 NOTIFICATION SENT TO TENANT
🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔
⏰ Timestamp: 12/12/2025, 1:53:00 AM
👤 To: Tenant #1
🎫 Incident ID: #1
📝 Message:
   Your maintenance issue at Lobby has been resolved. Resolution: Fixed the elevator motor
🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔

📬 Notification sent status: true
✅ Incident 1 fully resolved. Tenant notified: true
```

#### En la CONSOLA DEL NAVEGADOR:
- Verás un toast verde que dice "✅ Incident resolved successfully! Tenant has been notified."
- NO verás los logs de notificación aquí porque se ejecutan en el servidor

#### En el DASHBOARD:
1. La incidencia ahora mostrará:
   - Badge verde "RESOLVED"
   - Timestamp de resolución
   - Comentarios de resolución
   - 🔔 **"Tenant Notified"** en color índigo

### ❌ Si NO ves las notificaciones:

1. **Verifica que estés mirando la terminal correcta**
   - Los logs aparecen en la terminal donde corre `npm run dev`
   - NO en la consola del navegador

2. **Verifica que el servidor esté corriendo**
   - Debe decir algo como "Ready in XXXms" o "compiled successfully"

3. **Intenta resolver una incidencia nueva**
   - Usa el botón verde ✓ en una incidencia "Open"

4. **Revisa si hay errores**
   - En la consola del servidor
   - En la consola del navegador

### 📊 Indicadores de Éxito:

✅ Logs detallados en la terminal del servidor
✅ Toast verde aparece en el dashboard
✅ Badge "🔔 Tenant Notified" visible en la tarjeta
✅ Estado cambia a "Resolved"
✅ Timestamp y comentarios visibles

### 🐛 Troubleshooting:

**Problema**: No veo ningún log
- **Solución**: Asegúrate de estar viendo la terminal correcta (donde corre npm run dev)

**Problema**: El toast no aparece
- **Solución**: Verifica la consola del navegador por errores

**Problema**: El badge "Tenant Notified" no aparece
- **Solución**: Refresca la página después de resolver la incidencia
