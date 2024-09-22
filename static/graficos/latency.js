const ctx_5 = document.getElementById('latency').getContext('2d');

// Configurações do gráfico de barras
const latency = new Chart(ctx_5, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'], // Exemplo de meses
        datasets: [{
            label: 'Latência',
            data: [12, 19, 3, 5, 2, 3],  // Exemplo de dados
            backgroundColor: 'rgba(54, 162, 235, 0.7)',  // Cor das barras
            borderColor: 'rgba(54, 162, 235, 1)',  // Cor da borda das barras
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',  // Legenda no topo (pode ajustar para 'bottom', 'left', etc)
                labels: {
                    color: '#000',  // Cor do texto da legenda
                    padding: 10  // Espaçamento ao redor da legenda
                }
            },
            tooltip: {
              backgroundColor: "#333",
              titleColor: "#fdfdfd",
              bodyColor: "#fdfdfd",
              borderColor: "#3ed91b",
              borderWidth: 2,
              caretSize: 13,
              bodyFont: {
                size: 17,
              },
          callbacks: {
            label: function (context) {
              return '  ' + context.raw;
            }
          },
        },
        },
        layout: {
            padding: {
                top: 20,  // Espaçamento no topo do gráfico
                right: 10,
                bottom: 10,
                left: 10
            }
        },
        scales: {
            y: {
                beginAtZero: true,  // Começar o eixo Y no zero
                grid: {
                    color: "rgba(14,14,14,0.9)",
                },
                ticks: {
                    color: "rgb(0,0,0)",
                    stepSize: 1  // Exibir números inteiros no eixo Y
                },
            },

            x: {
                grid: {
                    color: "rgba(14,14,14,0.9)",
                },
                ticks: {
                    color: "rgb(0,0,0)",
                    stepSize: 1  // Exibir números inteiros no eixo Y
                },
            },
        }
    }
});
