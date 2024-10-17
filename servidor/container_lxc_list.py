import subprocess
import requests
import json
import time
import csv
from io import StringIO

url = 'http://192.168.2.105:8000/data_lxc_list/'

# Função para contar o número de containers ativos
def contar_containers_ativos():
    try:
        command = "lxc list --format csv --columns s | grep -c RUNNING"
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        active_count = int(result.stdout.strip())
        print(f"Número de containers ativos: {active_count}")
        return active_count
    except Exception as e:
        print(f"Erro ao contar containers: {e}")
        return 0


# Função para coletar os dados detalhados do LXC list
def coletar_dados_lxc():
    try:
        # Executa o comando lxc list com as colunas necessárias
        command = "lxc list --format csv --columns n,s,4,6"
        result = subprocess.run(command, shell=True, capture_output=True, text=True)

        # Converte o resultado em formato CSV
        csv_data = StringIO(result.stdout)
        reader = csv.reader(csv_data)

        # Estrutura para armazenar os dados dos containers
        containers = []

        # Itera sobre o CSV e coleta os dados
        for row in reader:
            if len(row) < 4:
                continue  # Ignora linhas incompletas ou mal formatadas

            # Tratamento para múltiplos IPs: separar múltiplos IPs por espaço ou vírgula
            ipv4_list = row[2].split() if row[2] else []
            ipv6_list = row[3].split() if row[3] else []

            container = {
                'name': row[0],
                'status': row[1],
                'ipv4': ipv4_list,  # Lista de IPv4
                'ipv6': ipv6_list   # Lista de IPv6
            }
            containers.append(container)

        return containers

    except Exception as e:
        print(f"Erro ao coletar dados do LXC: {e}")
        return []


# Função para enviar os dados para o software
def enviar_dados():
    # Coleta o número de containers ativos
    active_containers = contar_containers_ativos()

    # Coleta os dados detalhados dos containers
    containers_data = coletar_dados_lxc()
    print(active_containers)
    print(containers_data)

    # Cria um dicionário com todos os dados
    data = {
        'active_containers': active_containers,
        'containers': containers_data  # Adiciona os dados detalhados dos containers
    }

    # Cabeçalhos para indicar que estamos enviando JSON
    headers = {'Content-Type': 'application/json'}

    # Envia os dados para o software
    try:
        response = requests.post(url, data=json.dumps(data), headers=headers)
        if response.status_code == 200:
            print("Dados enviados com sucesso!")
        else:
            print(f"Erro ao enviar dados. Status: {response.status_code}, Resposta: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Erro de conexão: {e}")


# Loop infinito para enviar os dados a cada 30 segundos
while True:
    enviar_dados()
    time.sleep(30)  # Aguarda 30 segundos antes de executar novamente
