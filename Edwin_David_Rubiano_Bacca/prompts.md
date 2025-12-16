1. Gemini

2. Chain of thought, Modo consultor, Opro
Eres un desarrollador de software experto en css, javascript y html, y debes crear un temporizador pomodoro en ingles. Cuentas con los archivos:
 * index.html
     ```
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Pomodoro Timer</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍅</text></svg>">
    
        <link rel="stylesheet" href="style.css">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body>
        <div id="app">
        </div>
        <script src="script.js"></script>
    </body>
    </html>
     ```
* style.css
    ```
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'Inter', sans-serif;
        background-color: #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }
     ```
     
 * script.js
    ```  ```
 
El archivo index.html solo debe contener html.

Agrega el css necesario al archivo style.css para generar el diseño de la pagina: https://pomofocus.io.
* Evita saltos de linea en los textos
* El texto de los botones cambia de acuerdo al color de cada modo
* Los iconos de los botones no cambian  de color

Agrega al archivo script.js las siguientes funcionalidades:

* Boton CTA "Pomodoro":
    * Modifica el color de fondo a **#ba4949**
    * Modifica temporizador a 25 minutos con el formato hh:mm

* Boton CTA "Short Break":
    * Modifica el color de fondo a **#38858a**
    * Modifica temporizador a 5 minutos con el formato hh:mm

* Boton CTA "Long Break":
    * Modifica el color de fondo a **#397097**
    * Modifica temporizador a 15 minutos con el formato hh:mm

* Boto CTA "START":
    * El texto del boton se alterna entre **START** y **PAUSE** cada vez que se activa
    * Cuando el texto esta en **PAUSE** y se activa el boton se detiene el temporizador
    * Cuando el texto esta en **START** y se activa el boton, el temporizador inicia desde su ultimo estado

* Boton CTA Skip:
    * Se ubica al lado del boton "START".
    * No contiene texto ni bordes, contiene un icono con color de relleno blanco similar al de avanzar de cancion en los reproductores de musica.
    * Al activarse reinicia el temporizador de acuerdo al modo seleccionado
    * Solo es visible cuando el boton CTA "START" tiene el texto **PAUSE**

* Al detenerse el temporizador se reproduce un sonido de alarma de duracion de 2 segundos, valida que cumpla las politicas de seguridad.

3. - La IA no es 100% fiel al diseño de referencia, aqui tambien se requiere de refinamiento, indicar fuentes, colores, entre otros.
   - Aspectos como politicas de seguridad o compatibilidad en las herramientas que se usara tambien es ideal indicarlo
   - La IA trabaja bien con palabras claves, es ideal resumir lo mas posible sin perder contexto, si se mejora los tiempos de las respuestas.
   - Gemini no reprodujo la alarma, pero chat gpt si, revisando se debe a politicas de seguridad, aunque se coloco en la instruccion, no fue capaz de
   implementarlo Gemini.
   - El refinamiento aplicado fue sobre el prompt, no se indico a la IA de errores.