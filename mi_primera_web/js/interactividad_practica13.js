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
