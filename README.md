
# Gestor de Proyectos Pomodoro CLI

---

### Descripción del Problema
Este proyecto fue desarrollado como parte de un taller de Node.js y se enfoca en resolver el desafío de la gestión de tareas y la optimización del tiempo de estudio o trabajo mediante la técnica Pomodoro. En un mundo lleno de distracciones, una herramienta simple y eficaz en la línea de comandos puede ser fundamental.

La aplicación permite a los usuarios:
* Organizar sus actividades en **proyectos y tareas**.
* Iniciar **sesiones de trabajo Pomodoro** (25 minutos de concentración, seguidos de un breve descanso).
* Recibir **notificaciones** del sistema operativo cuando una sesión Pomodoro finaliza, evitando que el usuario tenga que estar pendiente del reloj.
* Visualizar el **estado actual** de sus proyectos y el tiempo dedicado a cada tarea.
* **Persistir los datos** de proyectos y tareas para que no se pierdan al cerrar la aplicación.

Está diseñada para ser una herramienta minimalista y sin distracciones, ideal para enfocarse en la productividad.

---

### Librerías NPM utilizadas
Para el desarrollo de esta aplicación de consola, se hizo uso de las siguientes librerías de Node Package Manager (NPM), cada una con un propósito específico y crucial:

1.  **`inquirer`**:
    * **Link oficial**: [https://www.npmjs.com/package/inquirer](https://www.npmjs.com/package/inquirer)
    * **Propósito**: `inquirer` es una herramienta robusta para crear interfaces de línea de comandos interactivas. Se utilizó para construir el menú principal de la aplicación y para solicitar al usuario información de entrada (como nombres de proyectos, descripciones de tareas) de una manera amigable y estructurada, a través de listas seleccionables y preguntas de texto.

2.  **`node-notifier`**:
    * **Link oficial**: [https://www.npmjs.com/package/node-notifier](https://www.npmjs.com/package/node-notifier)
    * **Propósito**: Esta librería fue fundamental para implementar la funcionalidad central del Pomodoro: las notificaciones. `node-notifier` permite enviar notificaciones nativas al sistema operativo del usuario (Windows, macOS, Linux). Se utiliza para alertar al usuario cuando una sesión de trabajo Pomodoro ha finalizado, indicando el momento de tomar un descanso.

3.  **`ora`**:
    * **Link oficial**: [https://www.npmjs.com/package/ora](https://www.npmjs.com/package/ora)
    * **Propósito**: `ora` se integró para mejorar la experiencia de usuario durante las sesiones de Pomodoro. Mientras el temporizador está activo, `ora` muestra un indicador de carga animado (spinner) en la consola, lo que visualmente informa al usuario que el proceso está en curso sin bloquear la interfaz. Esto hace que la espera sea más interactiva y menos aburrida.

4.  **`chalk`**:
    * **Link oficial**: [https://www.npmjs.com/package/chalk](https://www.npmjs.com/package/chalk)
    * **Propósito**: Para hacer la interfaz de la línea de comandos más legible y visualmente atractiva, `chalk` se utilizó para añadir color y estilo al texto de la consola. Esto permite resaltar información importante, como títulos de menú, mensajes de confirmación o errores, mejorando la usabilidad general de la aplicación.

---

### Cómo se implementó
La aplicación sigue una arquitectura basada en funciones modulares. Un `switch` principal en la función `mostrarMenuPrincipal` dirige el flujo de la aplicación según la elección del usuario.

* **Persistencia de Datos**: Los datos de los proyectos y tareas se almacenan en un archivo `data.json` en la raíz del proyecto. Las funciones `cargarDatos()` y `guardarDatos()` (utilizando el módulo `fs` nativo de Node.js) se encargan de leer y escribir este archivo, asegurando que la información persista entre las ejecuciones de la aplicación.

* **Temporizador Pomodoro**: La función `iniciarPomodoro()` maneja la lógica del temporizador. Utiliza `setInterval` para decrementar el tiempo cada segundo. Mientras el temporizador está activo, `ora` muestra un spinner y actualiza el tiempo restante en la consola.

* **Notificaciones**: Una vez que el `setInterval` llega a cero (es decir, los 25 minutos de trabajo han transcurrido), se activa una notificación del sistema utilizando `node-notifier`, alertando al usuario sobre el final de la sesión y el momento del descanso.

* **Experiencia de Usuario**: `inquirer` facilita la interacción, permitiendo al usuario seleccionar opciones del menú y proporcionar entradas de texto. `chalk` se utiliza para colorear los mensajes y títulos, haciendo la interfaz más intuitiva.

---

### Instrucciones de Instalación y Uso

Para poner en marcha este Gestor de Proyectos Pomodoro en tu máquina, sigue estos sencillos pasos:

1.  **Clonar el repositorio (o descargar el código):**
    Abre tu terminal (Símbolo del sistema, PowerShell o Bash en Linux/macOS) y ejecuta:
    ```bash
    git clone 
    ```
    Luego, navega a la carpeta del proyecto:
    ```bash
    cd gestor-pomodoro
    ```
    (Si descargaste el ZIP, simplemente descomprímelo y navega a la carpeta).

2.  **Instalar las dependencias:**
    Una vez dentro de la carpeta del proyecto, instala todas las librerías necesarias con NPM:
    ```bash
    npm install
    ```
    Esto leerá el archivo `package.json` y descargará todas las dependencias en la carpeta `node_modules`.

3.  **Ejecutar la aplicación:**
    Finalmente, inicia la aplicación Node.js:
    ```bash
    node index.js
    ```
    La aplicación se iniciará y te mostrará el menú principal en la consola.

---

### Link al Video de Presentación
[**https://drive.google.com/file/d/1NCjtRqGdzL32rC9aS8fBlNRyqQksZyG1/view?usp=sharing**]
 ## Realizado por: 
 KARINA SANABRIA CASAS

---
