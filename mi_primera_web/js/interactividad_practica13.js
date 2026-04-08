/* ============================================================
   BLOQUE DE VISUALIZACIÓN DINÁMICA - TASAS DE INSERCIÓN
   Interactividad y gestión de gráficos con Chart.js
   ============================================================ */

// Datos de los cursos (inventados pero realistas)
const coursesData = {
  labels: ['Programación', 'Inteligencia Artificial', 'Automatizaciones'],
  
  insertion: {
    label: 'Tasa de Inserción Laboral (%)',
    data: [92, 88, 85],
    unit: '%'
  },
  
  students: {
    label: 'Número de Estudiantes',
    data: [1245, 856, 634],
    unit: ' estudiantes'
  }
};

// Variable global para almacenar la instancia del gráfico
let coursesChart = null;

/* ============================================================
   INICIALIZACIÓN - Se ejecuta cuando el DOM está listo
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  initChart('insertion'); // Iniciar con tasa de inserción
  setupEventListeners();
  console.log('✅ Gráfico de estadísticas inicializado correctamente');
});

/* ============================================================
   FUNCIÓN: Inicializar Chart.js
   ============================================================ */

function initChart(metric = 'insertion') {
  const ctx = document.getElementById('coursesChart');
  
  if (!ctx) {
    console.error('❌ Error: No se encontró el elemento canvas con id "coursesChart"');
    return;
  }

  // Si ya existe un gráfico, destruirlo antes de crear uno nuevo
  if (coursesChart !== null) {
    coursesChart.destroy();
  }

  // Seleccionar datos según la métrica
  const data = coursesData[metric];
  const colors = getColorsPalette(metric);

  // Crear nueva instancia del gráfico
  coursesChart = new Chart(ctx, {
    type: 'bar', // Gráfico de barras (mejor para comparaciones)
    data: {
      labels: coursesData.labels,
      datasets: [
        {
          label: data.label,
          data: data.data,
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderWidth: 2,
          borderRadius: 8,
          tension: 0.4,
          fill: false,
          
          // Estilos por punto (útil para líneas)
          pointBackgroundColor: colors.points,
          pointBorderColor: colors.border,
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          
          // Sombra y efectos
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10,
        }
      ]
    },
    
    options: {
      responsive: true,
      maintainAspectRatio: false, // Permite que el contenedor defina la altura
      
      // Animaciones suaves
      animation: {
        duration: 750,
        easing: 'easeInOutQuart'
      },
      
      // Plugins (interactividad)
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: {
              family: "'Roboto', sans-serif",
              size: 14,
              weight: '600'
            },
            color: '#212121',
            padding: 20,
            usePointStyle: true,
            boxWidth: 8,
            boxHeight: 8,
            borderRadius: 50
          }
        },
        
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(33, 33, 33, 0.9)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: getActiveColor(metric),
          borderWidth: 2,
          padding: 12,
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13
          },
          displayColors: true,
          callbacks: {
            // Personalizar el contenido del tooltip
            label: function(context) {
              const value = context.parsed.y;
              return `${data.label}: ${value}${data.unit}`;
            },
            afterLabel: function(context) {
              // Mostrar información adicional según la métrica
              if (metric === 'insertion') {
                return '(Mayor tasa = más empleabilidad)';
              } else {
                return '(Mayor número = mayor demanda)';
              }
            }
          },
          borderRadius: 6
        },
        
        // Efecto hover
        filler: {
          propagate: true
        }
      },
      
      // Escala (ejes)
      scales: {
        y: {
          beginAtZero: true,
          max: metric === 'insertion' ? 100 : undefined,
          
          grid: {
            color: 'rgba(228, 231, 235, 0.5)',
            drawBorder: false,
            lineWidth: 1
          },
          
          ticks: {
            font: {
              family: "'Roboto', sans-serif",
              size: 12
            },
            color: '#8a8894',
            padding: 10,
            callback: function(value) {
              return metric === 'insertion' ? value + '%' : value;
            }
          },
          
          title: {
            display: true,
            text: data.label,
            font: {
              size: 13,
              weight: '600'
            },
            color: '#212121',
            padding: {
              bottom: 10
            }
          }
        },
        
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          
          ticks: {
            font: {
              family: "'Roboto', sans-serif",
              size: 12,
              weight: '600'
            },
            color: '#212121',
            padding: 10
          },
          
          title: {
            display: true,
            text: 'Cursos',
            font: {
              size: 13,
              weight: '600'
            },
            color: '#212121',
            padding: {
              top: 10
            }
          }
        }
      },
      
      // Interactividad
      interaction: {
        intersect: false,
        mode: 'index'
      },
      
      // Hover
      onHover: (event, activeElements) => {
        event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
      }
    }
  });

  console.log(`📊 Gráfico actualizado: ${data.label}`);
}

/* ============================================================
   FUNCIÓN: Obtener colores según la métrica
   ============================================================ */

function getColorsPalette(metric) {
  // Colores que armonicen con el diseño existente
  const softOrange = 'hsl(35, 77%, 62%)';    // #C8961D
  const softRed = 'hsl(5, 85%, 63%)';        // #FF6B35
  const grayishBlue = '#e4e7eb';
  
  if (metric === 'insertion') {
    return {
      background: [softOrange, softRed, grayishBlue],
      border: [softOrange, softRed, '#8a8894'],
      points: [softOrange, softRed, grayishBlue]
    };
  } else {
    // Para métrica de estudiantes, usar colores más suaves
    return {
      background: [
        'rgba(200, 150, 29, 0.7)',    // Orange con transparencia
        'rgba(255, 107, 53, 0.7)',    // Red con transparencia
        'rgba(228, 231, 235, 0.7)'    // Gray con transparencia
      ],
      border: [softOrange, softRed, '#8a8894'],
      points: [softOrange, softRed, grayishBlue]
    };
  }
}

/* ============================================================
   FUNCIÓN: Obtener color activo según métrica
   ============================================================ */

function getActiveColor(metric) {
  return metric === 'insertion' ? 'hsl(35, 77%, 62%)' : 'hsl(5, 85%, 63%)';
}

/* ============================================================
   FUNCIÓN: Actualizar datos del gráfico
   ============================================================ */

function updateChartData(metric) {
  if (!coursesChart) {
    console.error('❌ El gráfico no ha sido inicializado');
    return;
  }

  const data = coursesData[metric];
  const colors = getColorsPalette(metric);

  // Actualizar datasets
  coursesChart.data.datasets[0].data = data.data;
  coursesChart.data.datasets[0].label = data.label;
  coursesChart.data.datasets[0].backgroundColor = colors.background;
  coursesChart.data.datasets[0].borderColor = colors.border;
  coursesChart.data.datasets[0].pointBackgroundColor = colors.points;

  // Actualizar opciones de escala Y
  coursesChart.options.scales.y.max = metric === 'insertion' ? 100 : undefined;
  coursesChart.options.scales.y.title.text = data.label;

  // Aplicar cambios
  coursesChart.update('active'); // 'active' para animación más rápida

  console.log(`✅ Datos actualizados a: ${data.label}`);
}

/* ============================================================
   FUNCIÓN: Cambiar botón activo
   ============================================================ */

function toggleButton(clickedButton) {
  // Remover clase 'active' de todos los botones
  const allButtons = document.querySelectorAll('.stats-btn');
  allButtons.forEach(btn => btn.classList.remove('active'));

  // Agregar clase 'active' al botón clickeado
  clickedButton.classList.add('active');

  // Agregar animación de transición al gráfico
  const chartWrapper = document.querySelector('.chart-wrapper');
  if (chartWrapper) {
    chartWrapper.classList.add('chart-transition');
    setTimeout(() => {
      chartWrapper.classList.remove('chart-transition');
    }, 400);
  }
}

/* ============================================================
   FUNCIÓN: Configurar event listeners
   ============================================================ */

function setupEventListeners() {
  const buttons = document.querySelectorAll('.stats-btn');

  buttons.forEach((button) => {
    button.addEventListener('click', function() {
      const metric = this.getAttribute('data-metric');
      
      // Cambiar estado visual del botón
      toggleButton(this);
      
      // Actualizar datos del gráfico
      updateChartData(metric);
      
      // Log para debugging
      console.log(`🔄 Métrica cambiada a: ${metric}`);
    });

    // Agregar efecto hover (feedback adicional)
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateY(0)';
      }
    });
  });

  console.log('✅ Event listeners configurados correctamente');
}

/* ============================================================
   FUNCIÓN: Animar entrada del gráfico (opcional)
   ============================================================ */

function animateChartEntrance() {
  const chartWrapper = document.querySelector('.chart-wrapper');
  if (chartWrapper) {
    chartWrapper.style.animation = 'chart-fade-in 0.6s ease';
  }
}

/* ============================================================
   FUNCIÓN: Exportar datos a CSV (función extra)
   ============================================================ */

function exportChartData(metric = 'insertion') {
  const data = coursesData[metric];
  let csvContent = 'Curso,Valor\n';

  coursesData.labels.forEach((label, index) => {
    csvContent += `"${label}","${data.data[index]}${data.unit}"\n`;
  });

  console.log('📋 Datos para exportar:\n', csvContent);
  return csvContent;
}

/* ============================================================
   FUNCIÓN: Imprimir información del gráfico en consola
   ============================================================ */

function logChartInfo() {
  console.log('%c📊 INFORMACIÓN DEL GRÁFICO', 'font-size: 14px; font-weight: bold; color: #C8961D;');
  console.log('Datos disponibles:', coursesData);
  console.log('Instancia del gráfico:', coursesChart);
  console.log('Canvas elemento:', document.getElementById('coursesChart'));
}

// Hacer funciones disponibles globalmente para debugging
window.chartDebug = {
  logInfo: logChartInfo,
  exportData: exportChartData,
  reinitChart: initChart,
  updateData: updateChartData
};

console.log('💡 Tip: Usa window.chartDebug.logInfo() para ver información del gráfico');

/* ============================================================
   RED INTERACTIVA DE NODOS ELÁSTICOS - TECNOLOGÍA ALTO RENDIMIENTO
   Física de muelle, repulsión y retorno a posición original.
   ============================================================ */

const networkCanvas = document.getElementById('networkCanvas');
let networkCtx = null;

if (networkCanvas) {
  networkCtx = networkCanvas.getContext('2d');
  
  const networkProperties = {
    nodeColor: '#C8961D',
    lineColor: 'rgba(200, 150, 29, 0.15)',
    gridSpacing: 40,      // Espacio entre nodos en la cuadrícula
    mouseRadius: 150,     // Radio de influencia del ratón
    friction: 0.9,        // Resistencia al movimiento
    elasticity: 0.05,     // Fuerza de retorno a la base
    repulsion: 1.2        // Fuerza de empuje del ratón
  };

  let networkMouse = { x: null, y: null };
  let networkNodes = [];
  let dpr = window.devicePixelRatio || 1;

  /* ============================================================
     CLASE: ElasticParticle (Partícula con física de muelle)
     ============================================================ */
  class ElasticParticle {
    constructor(x, y) {
      this.baseX = x;     // Posición de reposo (X)
      this.baseY = y;     // Posición de reposo (Y)
      this.x = x;         // Posición actual (X)
      this.y = y;         // Posición actual (Y)
      this.vx = 0;        // Velocidad (X)
      this.vy = 0;        // Velocidad (Y)
    }

    update() {
      // 1. Fuerza de muelle (intentar volver a baseX, baseY)
      let dxBase = this.baseX - this.x;
      let dyBase = this.baseY - this.y;
      
      this.vx += dxBase * networkProperties.elasticity;
      this.vy += dyBase * networkProperties.elasticity;

      // 2. Interacción con el ratón (repulsión)
      if (networkMouse.x !== null) {
        let dxMouse = this.x - networkMouse.x;
        let dyMouse = this.y - networkMouse.y;
        let dist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (dist < networkProperties.mouseRadius) {
          let force = (networkProperties.mouseRadius - dist) / networkProperties.mouseRadius;
          // El ángulo del vector de empuje
          this.vx += (dxMouse / dist) * force * networkProperties.repulsion * 10;
          this.vy += (dyMouse / dist) * force * networkProperties.repulsion * 10;
        }
      }

      // 3. Aplicar fricción y movimiento
      this.vx *= networkProperties.friction;
      this.vy *= networkProperties.friction;
      this.x += this.vx;
      this.y += this.vy;
    }

    draw() {
      networkCtx.beginPath();
      networkCtx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
      networkCtx.fillStyle = networkProperties.nodeColor;
      networkCtx.fill();
    }
  }

  /* ============================================================
     FUNCIÓN: Inicializar Red (Grid)
     ============================================================ */
  function initNetworkGrid() {
    networkNodes = [];
    const w = networkCanvas.logicalWidth;
    const h = networkCanvas.logicalHeight;
    const spacing = networkProperties.gridSpacing;

    // Crear una cuadrícula de puntos
    for (let y = spacing; y < h; y += spacing) {
      for (let x = spacing; x < w; x += spacing) {
        networkNodes.push(new ElasticParticle(x, y));
      }
    }
    console.log(`✅ Red elástica inicializada: ${networkNodes.length} nodos`);
  }

  /* ============================================================
     FUNCIÓN: Redimensionar y Configurar Resolución (HD)
     ============================================================ */
  function resizeNetworkCanvas() {
    const parent = networkCanvas.parentElement;
    const rect = parent.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;

    // Tamaño lógico (CSS)
    networkCanvas.style.width = rect.width + 'px';
    networkCanvas.style.height = rect.height + 'px';
    networkCanvas.logicalWidth = rect.width;
    networkCanvas.logicalHeight = rect.height;

    // Tamaño real (Píxeles HD)
    networkCanvas.width = rect.width * dpr;
    networkCanvas.height = rect.height * dpr;
    
    // Escalar contexto una sola vez
    networkCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initNetworkGrid();
  }

  /* ============================================================
     EVENTOS DE RATÓN
     ============================================================ */
  window.addEventListener('mousemove', (e) => {
    const rect = networkCanvas.getBoundingClientRect();
    networkMouse.x = e.clientX - rect.left;
    networkMouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseout', () => {
    networkMouse.x = null;
    networkMouse.y = null;
  });

  window.addEventListener('resize', resizeNetworkCanvas);

  /* ============================================================
     FUNCIÓN: Dibujar Conexiones (Malla Elástica)
     ============================================================ */
  function drawElasticGrid() {
    networkCtx.beginPath();
    networkCtx.strokeStyle = networkProperties.lineColor;
    networkCtx.lineWidth = 0.5;

    // Solo dibujamos líneas entre partículas que estén a una distancia razonable
    const maxDist = networkProperties.gridSpacing * 1.5;

    for (let i = 0; i < networkNodes.length; i++) {
      const p1 = networkNodes[i];
      
      for (let j = i + 1; j < networkNodes.length; j++) {
        const p2 = networkNodes[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDist * maxDist) {
          networkCtx.moveTo(p1.x, p1.y);
          networkCtx.lineTo(p2.x, p2.y);
        }
      }
    }
    networkCtx.stroke();
  }

  /* ============================================================
     FUNCIÓN: Bucle de Animación
     ============================================================ */
  function animateNetwork() {
    // Fondo oscuro sólido para rendimiento máximo
    networkCtx.fillStyle = '#1a1a2e';
    networkCtx.fillRect(0, 0, networkCanvas.logicalWidth, networkCanvas.logicalHeight);

    // Actualizar y dibujar nodos
    networkNodes.forEach(node => {
      node.update();
      node.draw();
    });

    // Dibujar la malla de conexiones
    drawElasticGrid();

    requestAnimationFrame(animateNetwork);
  }

  // Inicio
  resizeNetworkCanvas();
  requestAnimationFrame(animateNetwork);
}

