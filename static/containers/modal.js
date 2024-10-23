document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os botões "Adicionar IP" e "Remover IP"
    const addIpButtons = document.querySelectorAll('.add-ip-btn');
    const removeIpButtons = document.querySelectorAll('.remove-ip-btn');

    // Manipular clique no botão de adicionar IP
    addIpButtons.forEach(button => {
        button.addEventListener('click', function() {
            const containerName = this.getAttribute('data-container-name');
            const interfaces = this.getAttribute('data-interfaces');
            const interfaceList = interfaces.split(',');
            openIpModal(containerName, 'add', interfaceList);
        });
    });

    // Manipular clique no botão de remover IP
    removeIpButtons.forEach(button => {
        button.addEventListener('click', function() {
            const containerName = this.getAttribute('data-container-name');
            const interfaces = this.getAttribute('data-interfaces');
            const ips = this.getAttribute('data-ips');
            const interfaceList = interfaces.split(',');
            const ipList = ips.split(',');  // Transformar os IPs em uma lista
            openIpModal(containerName, 'remove', interfaceList, ipList);
        });
    });

    // Função para abrir o modal e preparar os dados para a ação de adicionar ou remover IP
    function openIpModal(containerName, actionType, interfaceList, ipList = []) {
        const modalTitle = document.getElementById('modalLabel');
        const saveButton = document.getElementById('saveIpAction');
        const ipAddressInput = document.getElementById('ipAddressAdd')
        const ipAddressSelectContainer = document.getElementById('ipAddressSelectContainer')
        // Muda o título e o texto do botão dependendo da ação (adicionar/remover)
        if (actionType === 'add') {
            modalTitle.textContent = `Adicionar IP ao container ${containerName}`;
            saveButton.textContent = 'Adicionar IP';
            ipAddressInput.style.display = 'block'; // Mostrar input para adicionar IP
            ipAddressSelectContainer.style.display = 'none'; // Ocultar select de remoção de IP
        } else if (actionType === 'remove') {
            modalTitle.textContent = `Remover IP do container ${containerName}`;
            saveButton.textContent = 'Remover IP';
            ipAddressInput.style.display = 'none'; // Mostrar input para adicionar IP
            ipAddressSelectContainer.style.display = 'block'; // Ocultar select de remoção de IP
        }



        // Supondo que você tenha um select no modal com id "interface"
        const interfaceSelect = document.getElementById('interface');

        // Limpar o select antes de adicionar novas opções
        interfaceSelect.innerHTML = '';

        interfaceList = [...new Set(interfaceList)]
        console.log(interfaceList)

        // Adicionar as interfaces como opções no select
        interfaceList.forEach(function(iface) {
            console.log(iface)
            const option = document.createElement('option');
            option.value = iface;
            option.textContent = iface;
            interfaceSelect.appendChild(option);
        });

        // Caso seja uma ação de remoção de IP, também vamos popular o select de IPs
        if (actionType === 'remove') {
            const ipSelect = document.getElementById('ipAddressSelect');  // Select de IPs no modal

            // Limpar o select de IPs antes de adicionar novas opções
            ipSelect.innerHTML = '';

            // Adicionar os IPs como opções no select
            ipList.forEach(function(ip) {
                const option = document.createElement('option');
                option.value = ip;
                option.textContent = ip;
                ipSelect.appendChild(option);
            });

            // Exibir o select de IPs (caso esteja escondido por padrão)
            document.getElementById('ipAddressSelectContainer').style.display = 'block';
        } else {
            // Esconder o select de IPs se estivermos adicionando um novo IP
            document.getElementById('ipAddressSelectContainer').style.display = 'none';
        }

        // Mostrar o modal usando MDBootstrap
        const ipModal = new mdb.Modal(document.getElementById('modalIpActions'));
        ipModal.show();

        // Manipular o clique no botão de salvar no modal
        saveButton.addEventListener('click', function() {
            const selectedInterface = document.getElementById('interface').value;
            const selectedIpType = document.getElementById('ipType').value;
            let ipAddress = '';

            // Se for uma ação de remoção, obter o IP selecionado no select de IPs
            if (actionType === 'remove') {
                ipAddress = document.getElementById('ipAddressSelect').value;
            } else {
                // Se for uma ação de adição, pegar o IP digitado no campo de input
                ipAddress = document.getElementById('ipAddress').value;
            }

            // Verifica se os campos foram preenchidos
            if (!selectedInterface || !selectedIpType || !ipAddress) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Fazer a requisição via fetch para adicionar ou remover o IP
            fetch(`/containers/${containerName}/ip/${saveButton.textContent === 'Adicionar IP' ? 'add' : 'remove'}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    // Se você estiver usando CSRF no Django, adicione o token aqui
                    // 'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    interface: selectedInterface,
                    ip_type: selectedIpType,
                    ip_address: ipAddress
                })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);  // Exibir mensagem de sucesso ou erro
                ipModal.hide();  // Fechar o modal
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao processar a solicitação.');
                ipModal.hide();  // Fechar o modal em caso de erro também
            });
        });
    }
});
