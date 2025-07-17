const inquirer = require('inquirer');
const notifier = require('node-notifier');
const ora = require('ora');
const chalk = require('chalk');
const fs = require('fs');

console.log("Valor de chalk:", chalk); // 

let proyectos = [];

// --- Funciones de Persistencia ---
function cargarDatos() {
    try {
        const data = fs.readFileSync('data.json', 'utf8');
        proyectos = JSON.parse(data);
    } catch (error) {
        proyectos = []; // Si el archivo no existe o está vacío
    }
}

function guardarDatos() {
    const data = JSON.stringify(proyectos, null, 2);
    fs.writeFileSync('data.json', data, 'utf8');
}

// --- Funciones de la Aplicación ---
function mostrarMenuPrincipal() {
    cargarDatos();
    console.clear();
    console.log(chalk.bold.blue('===== Gestor de Proyectos Pomodoro ====='));

    const opcionesMenu = [
        { name: '1. Añadir nuevo proyecto/tarea', value: 'add' },
        { name: '2. Iniciar sesión de trabajo (Pomodoro)', value: 'start' },
        { name: '3. Ver estado de proyectos y tareas', value: 'view' },
        { name: '4. Salir', value: 'exit' },
    ];

    inquirer.prompt({
        type: 'list',
        name: 'opcion',
        message: '¿Qué quieres hacer?',
        choices: opcionesMenu
    }).then(answers => {
        switch (answers.opcion) {
            case 'add':
                añadirProyectoTarea();
                break;
            case 'start':
                iniciarPomodoro();
                break;
            case 'view':
                verEstado();
                break;
            case 'exit':
                console.log(chalk.yellow('¡Hasta luego!'));
                break;
        }
    });
}

function añadirProyectoTarea() {
    console.clear();
    console.log(chalk.bold.green('--- Añadir Proyecto/Tarea ---'));

    inquirer.prompt([
        {
            type: 'input',
            name: 'proyecto',
            message: 'Nombre del proyecto:',
        },
        {
            type: 'input',
            name: 'tarea',
            message: 'Descripción de la tarea:',
        }
    ]).then(answers => {
        const nuevoProyecto = {
            nombre: answers.proyecto,
            tareas: [{
                descripcion: answers.tarea,
                tiempoDedicado: 0,
                completada: false
            }]
        };
        proyectos.push(nuevoProyecto);
        guardarDatos();
        console.log(chalk.green('\nProyecto y tarea añadidos correctamente.'));
        setTimeout(mostrarMenuPrincipal, 2000);
    });
}

function verEstado() {
    console.clear();
    console.log(chalk.bold.cyan('--- Estado de Proyectos ---'));
    if (proyectos.length === 0) {
        console.log(chalk.red('No hay proyectos registrados.'));
        setTimeout(mostrarMenuPrincipal, 2000);
        return;
    }

    proyectos.forEach(proyecto => {
        console.log(chalk.bgBlue.white.bold(`\n- Proyecto: ${proyecto.nombre}`));
        proyecto.tareas.forEach(tarea => {
            const estado = tarea.completada ? chalk.green('Completada') : chalk.yellow('Pendiente');
            console.log(`  - Tarea: ${tarea.descripcion} | Tiempo dedicado: ${tarea.tiempoDedicado} min | Estado: ${estado}`);
        });
    });
    inquirer.prompt({
        type: 'confirm',
        name: 'continuar',
        message: '\nPresiona Enter para volver al menú principal...'
    }).then(() => mostrarMenuPrincipal());
}

function iniciarPomodoro() {
    console.clear();
    console.log(chalk.bold.magenta('--- Iniciar Sesión de Trabajo ---'));

    if (proyectos.length === 0) {
        console.log(chalk.red('No hay proyectos ni tareas para trabajar.'));
        setTimeout(mostrarMenuPrincipal, 2000);
        return;
    }

    const tareasPlanas = proyectos.flatMap(proyecto =>
        proyecto.tareas.map(tarea => ({
            name: `[${proyecto.nombre}] ${tarea.descripcion}`,
            value: { proyecto, tarea }
        }))
    );

    inquirer.prompt({
        type: 'list',
        name: 'tareaSeleccionada',
        message: 'Selecciona una tarea para trabajar:',
        choices: tareasPlanas
    }).then(answers => {
        const { proyecto, tarea } = answers.tareaSeleccionada;
        const tiempoPomodoro = 5  * 1000; // 25 minutos en milisegundos
        let tiempoRestante = tiempoPomodoro;

        const spinner = ora(chalk.magenta(`Iniciando Pomodoro de 25 minutos para la tarea: ${tarea.descripcion}`)).start();

        const intervalo = setInterval(() => {
            tiempoRestante -= 1000;
            const minutos = Math.floor(tiempoRestante / 60000);
            const segundos = Math.floor((tiempoRestante % 60000) / 1000);
            spinner.text = chalk.magenta(`Tiempo restante: ${minutos}m ${segundos}s`);

            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
                spinner.stop();
                console.log(chalk.bgGreen.white.bold('\n¡Sesión de Pomodoro finalizada!'));
                tarea.tiempoDedicado += 25;
                guardarDatos();

                notifier.notify({
                    title: 'Pomodoro Finalizado',
                    message: `¡Felicidades! Terminaste tus 25 minutos de trabajo en la tarea: ${tarea.descripcion}.`,
                    sound: true,
                    wait: true
                });

                setTimeout(mostrarMenuPrincipal, 5000);
            }
        }, 1000);
    });
}

// Iniciar la aplicación
mostrarMenuPrincipal();