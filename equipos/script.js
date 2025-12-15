(function() {
 
    
    class Arquero {
        constructor(nombre, atajadas) {
            this.nombre = nombre;
            this.atajadas = atajadas;
        }
    }

    class JugadorCampo {
        constructor(nombre, defensa, pase, regate, tiro, velocidad, resistencia) {
            this.nombre = nombre;
            this.defensa = defensa;
            this.pase = pase;
            this.regate = regate;
            this.tiro = tiro;
            this.velocidad = velocidad;
            this.resistencia = resistencia;
        }

        get ritmo() {
            return (this.velocidad + this.resistencia) / 2; 
        }

        get ataqueTotal() {
        return this.pase + this.regate + this.tiro;
    }
        get defensa() {
        return this.defensa + this.velocidad + this.resistencia;
    }
        
        get ratingGlobal() {
        return (this.defensa + this.pase + this.regate + this.tiro + this.velocidad + this.resistencia) / 6;
    }
    }

    
    
    const listaJugadoresCampo = [];
    const listaArqueros = []; 

    

    function inicializarSelects() {
    const attributes = ['defensa', 'pase', 'regate', 'tiro', 'velocidad', 'resistencia', 'atajadas'];

    attributes.forEach(attr => {
        const selectElement = document.getElementById(attr);
        if (selectElement) {
            selectElement.innerHTML = '';
            
            
            const defaultOption = document.createElement('option');
            defaultOption.value = '0';
            defaultOption.textContent = '0';
            defaultOption.disabled = true; 
            defaultOption.selected = true;
            selectElement.appendChild(defaultOption);
            

            
            for (let i = 1; i <= 10; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                selectElement.appendChild(option);
            }
        }
    });

    
    const totalOptions = [10, 12, 14, 16, 18, 22];
    const totalSelectElement = document.getElementById('numJugadoresTotal');
    
    if (totalSelectElement) {
        totalSelectElement.innerHTML = ''; 
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Selecciona el total';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        totalSelectElement.appendChild(defaultOption);

        totalOptions.forEach(num => {
            const option = document.createElement('option');
            option.value = num;
            option.textContent = num;
            totalSelectElement.appendChild(option);
        });
    }
}
    
    function manejarRol() {
        const esArqueroCheckbox = document.getElementById('esArquero');
        const atributosCampoDiv = document.getElementById('atributosCampo');
        const contenedorAtajadaDiv = document.getElementById('contenedorAtajada');
        
        
        const selectsCampo = atributosCampoDiv.querySelectorAll('select'); 
       
        const selectAtajada = document.getElementById('atajadas'); 
        
        const esArquero = esArqueroCheckbox.checked;

        if (esArquero) {
            
            contenedorAtajadaDiv.style.display = 'block'; 

            
            atributosCampoDiv.style.opacity = '0.5'; 
            selectsCampo.forEach(select => {
                select.disabled = true; 
            });
            
            
            if (selectAtajada) selectAtajada.disabled = false;


        } else {
           
            contenedorAtajadaDiv.style.display = 'none';

            
            atributosCampoDiv.style.opacity = '1.0';
            selectsCampo.forEach(select => {
                select.disabled = false; 
            });
            
           
            if (selectAtajada) selectAtajada.disabled = true;
        }
    }

    
function agregarJugador() {
    const totalJugadoresRequeridos = parseInt(document.getElementById('numJugadoresTotal').value, 10);
    const todosLosJugadores = [...listaJugadoresCampo, ...listaArqueros];
    const totalJugadoresActual = todosLosJugadores.length;

    
    if (isNaN(totalJugadoresRequeridos) || totalJugadoresRequeridos === 0) {
         alert("Por favor, selecciona primero el número total de jugadores requeridos.");
         return;
    }

    if (totalJugadoresActual >= totalJugadoresRequeridos) {
        alert(`¡Límite alcanzado! Ya tienes ${totalJugadoresActual} jugadores, que es el total requerido (${totalJugadoresRequeridos}).`);
        return;
    }
  

    const nombre = document.getElementById('nombre').value.trim();
    const esArquero = document.getElementById('esArquero').checked; 
    
    
    if (!nombre) {
        alert("Por favor, ingresa el nombre.");
        return;
    }
    
    

    if (esArquero) {
        
        const atajadasValor = parseInt(document.getElementById('atajadas').value, 10);
        
        
        if (isNaN(atajadasValor) || atajadasValor < 1) { 
             alert("Por favor, selecciona un puntaje de Atajada válido (1-10).");
             return;
        }

        const nuevoArquero = new Arquero(nombre, atajadasValor);
        listaArqueros.push(nuevoArquero);
        console.log("Arquero Agregado:", nuevoArquero);

    } else {
       
        
        
        const defensa = parseInt(document.getElementById('defensa').value, 10);
        const pase = parseInt(document.getElementById('pase').value, 10);
        const regate = parseInt(document.getElementById('regate').value, 10);
        const tiro = parseInt(document.getElementById('tiro').value, 10);
        const velocidad = parseInt(document.getElementById('velocidad').value, 10);
        const resistencia = parseInt(document.getElementById('resistencia').value, 10);

        
        if (isNaN(defensa) || isNaN(pase) || isNaN(regate) || isNaN(tiro) || isNaN(velocidad) || isNaN(resistencia)) 
        {
             alert("Por favor, selecciona todos los puntajes del Jugador de Campo.");
             return;
        }

        const nuevoJugador = new JugadorCampo(
            nombre, defensa, pase, regate, tiro, velocidad, resistencia
        );
        listaJugadoresCampo.push(nuevoJugador);
        console.log("Jugador de Campo Agregado:", nuevoJugador);
    }
    
    
    document.getElementById('nombre').value = '';
    actualizarListaPendientes();
}

function eliminarJugador(nombreJugador, esArquero) {
    if (esArquero) {
        
        const index = listaArqueros.findIndex(a => a.nombre === nombreJugador);
        if (index > -1) {
            listaArqueros.splice(index, 1);
            console.log(`Arquero ${nombreJugador} eliminado.`);
        }
    } else {
        
        const index = listaJugadoresCampo.findIndex(j => j.nombre === nombreJugador);
        if (index > -1) {
            listaJugadoresCampo.splice(index, 1);
            console.log(`Jugador de Campo ${nombreJugador} eliminado.`);
        }
    }
    
    actualizarListaPendientes();
}
        
    

    function calcularStats(equipo) {
        let ataqueAcumulado = 0;
        let defensaAcumulada = 0;
        let atajadaAcumulada = 0;
        
        equipo.jugadores.forEach(j => {
            if (j instanceof JugadorCampo) {
                ataqueAcumulado += j.ataqueTotal;
                defensaAcumulada += j.defensa;
            } else if (j instanceof Arquero) {
                atajadaAcumulada += j.atajadas;
            }
        });

        return { ataque: ataqueAcumulado, defensa: defensaAcumulada, atajada: atajadaAcumulada };
    }

    function actualizarListaPendientes() {
    const ul = document.getElementById('ulJugadores');
    const contador = document.getElementById('contadorJugadores');
    
    // Si la estructura HTML no existe, salimos
    if (!ul || !contador) {
        console.error("Error: No se encontró el elemento ulJugadores o contadorJugadores en el HTML.");
        return; 
    }

    ul.innerHTML = ''; 
    
    
    const todosLosJugadores = [...listaJugadoresCampo, ...listaArqueros];

    todosLosJugadores.forEach(jugador => {
        const li = document.createElement('li');
        
        const esArquero = jugador.hasOwnProperty('atajadas');
        
        let detalle = '';
        if (esArquero) {
            detalle = `(Arquero - Atajada: ${jugador.atajadas})`;
        } else {
            
            detalle = `(Global: ${jugador.ratingGlobal.toFixed(2)}, Def: ${jugador.defensa.toFixed(2)}, Atq: ${jugador.ataqueTotal.toFixed(2)})`;
        }

        
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = ' ❌';
        btnEliminar.style.marginLeft = '10px';
        btnEliminar.style.padding = '2px 5px';
        btnEliminar.style.cursor = 'pointer';
        
        
        btnEliminar.addEventListener('click', () => {
            if (confirm(`¿Seguro que quieres eliminar a ${jugador.nombre}?`)) {
                eliminarJugador(jugador.nombre, esArquero);
            }
        });
        

        li.textContent = `${jugador.nombre} ${detalle}`;
        li.appendChild(btnEliminar); // Añadir el botón al elemento de la lista
        ul.appendChild(li);
    });

    
    contador.textContent = todosLosJugadores.length;
}
    function mostrarResultadosAvanzado(equipoA, equipoB, statsA, statsB) {
        const divA = document.getElementById('equipoA');
        const divB = document.getElementById('equipoB');

        const renderJugadores = (equipo) => {
            let html = `
                <h4>Jugadores de Campo (Total Global: ${equipo.ratingAcumulado.toFixed(2)})</h4>
                <ul>
            `;
            
            equipo.jugadores
                .filter(j => j instanceof JugadorCampo)
                .forEach(j => {
                    html += `<li>${j.nombre} (Global: ${j.ratingGlobal.toFixed(2)}, Def: ${j.defensa}, Atq: ${j.ataqueTotal.toFixed(2)})</li>`;
                });
            html += `</ul>`;
            
            
            const arqueros = equipo.jugadores.filter(j => j instanceof Arquero);
            if (arqueros.length > 0) {
                html += `
                    <h4>Arquero(s)</h4>
                    <ul>
                `;
                arqueros.forEach(a => {
                    html += `<li>${a.nombre} (Atajada: ${a.atajadas})</li>`;
                });
                html += `</ul>`;
            }
            return html;
        };

        divA.innerHTML = `
            <h3>🔵 Equipo A</h3>
            <p><strong>ATQ: ${statsA.ataque.toFixed(2)} | DEF: ${statsA.defensa.toFixed(2)} | ATAJADA: ${statsA.atajada}</strong></p>
            ${renderJugadores(equipoA)}
        `;
        divB.innerHTML = `
            <h3>🔴 Equipo B</h3>
            <p><strong>ATQ: ${statsB.ataque.toFixed(2)} | DEF: ${statsB.defensa.toFixed(2)} | ATAJADA: ${statsB.atajada}</strong></p>
            ${renderJugadores(equipoB)}
        `;
    }

    

    function balancearEquipos() {
        
        document.getElementById('resultados').style.display = 'none'; 
        document.getElementById('listaPendientes').style.display = 'block';

        const totalJugadoresRequeridos = parseInt(document.getElementById('numJugadoresTotal').value, 10);
        const todosLosJugadores = [...listaJugadoresCampo, ...listaArqueros];
        const totalJugadoresActual = todosLosJugadores.length;

        
        if (isNaN(totalJugadoresRequeridos) || totalJugadoresRequeridos === 0) {
            alert("Selecciona primero el numero total de jugadores para el partido.");
            return;
        }

        
        if (totalJugadoresActual !== totalJugadoresRequeridos) {
            alert(`Faltan jugadores. Se requieren ${totalJugadoresRequeridos} en total para balancear, y solo tienes ${totalJugadoresActual}.`);
            return;
        }
        
    
        if (listaArqueros.length > 2) {
            alert("No se permite mas de dos arqueros.");
            return;
        }
        
        //  Ordenar Jugadores de Campo por Rating Global (de mejor a peor)
        const jugadoresOrdenados = [...listaJugadoresCampo].sort((a, b) => b.ratingGlobal - a.ratingGlobal);

        
        const equipoA = { jugadores: [], ratingAcumulado: 0 };
        const equipoB = { jugadores: [], ratingAcumulado: 0 };
        
        // Aplicar el Algoritmo Serpiente (Zig-Zag) a los jugadores de campo
        jugadoresOrdenados.forEach((jugador, index) => {
            const equipoDestino = (index % 2 === 0) ? equipoA : equipoB; 

            equipoDestino.jugadores.push(jugador);
            equipoDestino.ratingAcumulado += jugador.ratingGlobal;
        });

        //  Calcular stats iniciales antes de asignar arqueros
        const statsA = calcularStats(equipoA);
        const statsB = calcularStats(equipoB);
        
        const arquerosOrdenados = [...listaArqueros].sort((a, b) => b.atajadas - a.atajadas);
        
        // 4. Estrategia de Contraposición: Asignar el mejor arquero
        if (arquerosOrdenados.length > 0) {
            const mejorArquero = arquerosOrdenados[0];
            const peorArquero = arquerosOrdenados[1] || null;
            
            
            const difAtaque = statsA.ataque - statsB.ataque;

            let equipoMejorAtajada = equipoA;
            if (difAtaque > 0) {
                equipoMejorAtajada = equipoA;
            } else if (difAtaque < 0) {
                equipoMejorAtajada = equipoB;
            } else {
                 
                 if (equipoA.ratingAcumulado < equipoB.ratingAcumulado) {
                     equipoMejorAtajada = equipoA;
                 }
            }

            
            if (mejorArquero) {
                equipoMejorAtajada.jugadores.push(mejorArquero);
            }
            if (peorArquero) {
                const equipoPeorAtajada = (equipoMejorAtajada === equipoA) ? equipoB : equipoA;
                equipoPeorAtajada.jugadores.push(peorArquero);
            }
        }
        
        //  Recalcular las estadísticas finales y mostrar
        const statsFinalA = calcularStats(equipoA);
        const statsFinalB = calcularStats(equipoB);

        
        mostrarResultadosAvanzado(equipoA, equipoB, statsFinalA, statsFinalB);
        
        // ACCIONES AL FINALIZAR EL BALANCEO
        document.getElementById('resultados').style.display = 'block'; 
        document.getElementById('listaPendientes').style.display = 'none'; 
    }
        
    // --- CONEXION DE EVENTOS AL CARGAR EL DOM ---

    document.addEventListener('DOMContentLoaded', () => {
        inicializarSelects();
        
        // Conexion de botones
        const btnAgregar = document.getElementById('btnAgregar');
        const btnBalancear = document.getElementById('btnBalancear');
        const esArqueroCheckbox = document.getElementById('esArquero');
        
        if (btnAgregar) {
            btnAgregar.addEventListener('click', agregarJugador);
        }
        if (btnBalancear) {
            btnBalancear.addEventListener('click', balancearEquipos);
        }
        
        if (esArqueroCheckbox) {
            esArqueroCheckbox.addEventListener('change', manejarRol);
            manejarRol(); 
        }
    }); 

})(); 