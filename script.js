// 1º - Funções auxiliares
function formatName(filename) {
    return filename
        .replace(/_/g, ' ')
        .replace(/\d+/g, '')
        .replace(/\.[^/.]+$/, "");
}











// Sistema de abas corrigido
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Esconde TODOS os conteúdos
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Mostra APENAS o conteúdo correspondente
        const targetId = this.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
        
        // Atualiza botão ativo
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});


// Zoom na imagem do tabuleiro
document.querySelector('.board-container img')?.addEventListener('click', function() {
    this.classList.toggle('zoomed');
});

// Função para verificar se imagem existe
const checkImage = async (url) => {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = encodeURI(url);
    });
};

// Carregamento das Cartas
document.addEventListener('DOMContentLoaded', async () => {
    // LIMPE o container antes de adicionar novas cartas
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; 

	// Lista de cartas para incluir categorias
	const cardCategories = [
		{
			name: "Bioma Abismo",
			cards: [
				"Aberrante_das_Marés_Negras_9269.png",
				"Afogado_das_profundezas_1276.png",
				"Autômato_Profanado_3516.png",
				"Azergron,_Forja_Sombria_4763.png",
				"Carniçal_das_Fendas_Negras_4885.png",
				"Devoto_das_Chamas_Profundas_6281.png",
				"Drakzhar,_Fúria_Abissal_4087.png",
				"Engrenagem_Profana_7628.png",
				"Ferrugem_Profana_6650.png",
				"Forjadraco_Rubro_3648.png",
				"Gorvaxx_das_Fossas_Profundas_1705.png",
				"Krathun,_o_Escamarrocha_5095.png",
				"Maltheron,_o_Trono_Quebrado_7640.png",
				"Naulmor,_o_Submerso_Eterno_4290.png",
				"Olho_de_Forja_Profana_1848.png",
				"Putreflexo_da_Selva_Sombria_1321.png",
				"Ruína_Escarlate_8533.png",
				"Sentinela_Abissomarinha_3525.png",
				"Serviçal_do_Abismo_de_Cinzas_1031.png",
				"Sulvagar,_o_Abissal_Escamado_8443.png",
				"Sussurro_Abissal_7789.png",
				"Uimorrath,_o_Horror_Abissal_1149.png",
				"Varnak,_o_Tirano_das_Fendas_9418.png",
				"Verzakar,_Engrenagem_Primal_5196.png",
				"Vórtice_de_Basalto_5028.png",
				"Zuraak,_o_Flagelo_Verde-Abissal_9874.png",

				
					
				
				
			]
		},
		{
			name: "Bioma Aquático", 
			cards: [
				"Aberração_Escamada_das_Profundezas_3717.png",
				"Afogado_Profanado_7851.png",
				"Brumi_Oceano_Vivo_9328.png",
				"Carniçal_da_Marés_Escura_8140.png",
				"Cria_Dracônica_das_Marés_Negras_6670.png",
				"Defunto_do_Brejo_Salgado_5182.png",
				"Despertar_de_Sotaluz_6037.png",
				"Desviante_das_Águas_Turvas_4672.png",
				"Devoto_da_Maré_Esquecida_2351.png",
				"Errante_das_Profundezas_Silenciosas_9805.png",
				"Espreitador_Tritônico_das_Águas_Rasas_7219.png",
				"Fiel_Abissal_das_Marés_2860.png",
				"Guardião_das_Fendas_Submersas_9296.png",
				"Guardião_Escamoso_2249.png",
				"Invocador_das_Marés_Profanas_6400.png",
				"Kael_Morath_o_Náufrago_Profanado_1659.png",
				"Orun_Meir_o_Profeta_Submerso_9472.png",
				"Protetor_do_Folego_Infinito_3913.png",
				"Putrefator_das_Profundezas_Verdes_8985.png",
				"Rastejante_das_Pedras_Mareadas_2140.png",
				"Sacerdote_Afogado_das_Profundezas_9889.png",
				"Sumo_Oráculo_da_Marés_4514.png",
				"Sussurrante_das_Marés_Profanas_3525.png",
				"Terror_do_Breu_Oceânico_2693.png",
				"Thal_Zuur_o_Terror_Abissal_5326.png",
				"Thar_Zuun_o_Espinhaço_do_Abismo_9670.png",


			]
		},
		{
			name: "Bioma Rochoso",
			cards: [
				"Abutre_das_Fendas_7244.png",
				"Carniçal_das_Ravinas_6895.png",
				"Colosso_Musgoso_6032.png",
				"Constructo_Crente_5752.png",
				"Engrenfundo_Rachado_6036.png",
				"Engrenodonte_de_Xar_Gar_9804.png",
				"Espreitador_de_Granito_9774.png",
				"Espreitador_Musgoso_8246.png",
				"Gárgula_de_Basalto_3930.png",
				"Gárgula_Profanada_3882.png",
				"Horror_das_Cavernas_4242.png",
				"Lorde_da_Podridão_Pétrea_1786.png",
				"Parasita_de_Xisto_4437.png",
				"Profanador_de_Granito_9599.png",
				"Príncipe_Profano_de_Khar-Zhul_2740.png",
				"Rastejante_de_Granito_2870.png",
				"Saqueador_de_Laje_5474.png",
				"Serpente_das_Gargantas_Mescladas_6852.png",
				"Serpente_de_Basaltoa_2462.png",
				"Serpente_Pétrea_6948.png",
				"Serpentina_de_Latão_4347.png",
				"Talhador_Profundo_7418.png",
				"Terror_das_Ruas_de_Pedra_7474.png",
				"Terror_de_Thramak_9463.png",
				"Terror_Mecadracônico_6809.png",
				"Viscídia_das_Cavernas_6978.png",


			]
		},
		{
			name: "Bioma Urbano",
			cards: [
				"Alto_Dirigente_da_Quimera_8086.png",
				"Andarilho_Enferrujado_7275.png",
				"Andarilho_Sepulcral_9733.png",
				"Arqui-heresiarca_das_Ruas_3647.png",
				"Colosso_de_Alvenaria_4664.png",
				"Crente_de_Sarom_8986.png",
				"Cultista_Insano_6524.png",
				"Cão_das_Sarjetas_7729.png",
				"Demônio_das_Ruelas_7483.png",
				"Desforme_das_Galerias_8122.png",
				"Devoto_dos_Jardins_Oculto_5404.png",
				"Devoto_do_Torvelino_7282.png",
				"Exegeta_Escamado_7013.png",
				"Idolo_Protetor_de_Xar_5111.png",
				"Infestador_das_Cisternas_5558.png",
				"Parasita_da_Rua_3543.png",
				"Parasita_de_Alvenaria_8429.png",
				"Profanador_de_Drenos_4471.png",
				"Quebrador_de_Torres_8198.png",
				"Rastejante_de_Valas_9622.png",
				"Sentinela_Fanatica_1390.png",
				"Serpente_de_Latão_1954.png",
				"Silvo_de_Cobre_2820.png",
				"Sussurrador_do_Subsolo_8647.png",
				"Terror_das_Profundezas_Urbano_4635.png",
				"Tormento_Submerso_4627.png",


			]
		},
		
				{
			name: "Bioma Verdejante",
			cards: [
				"Ancião_das_Cascatas_Petrificadas_3147.png",
				"Arquivista_de_Casca_Viva_2525.png",
				"Brutamonte_do_Limo_7947.png",
				"Carapaça_Reanimada_7257.png",
				"Colosso_das_Fendas_Musgosas_7458.png",
				"Criacúspide_Verdejante_8979.png",
				"Devoto_do_Bosque_Eterno_4762.png",
				"Eco_de_Ritual_Ancestral_5175.png",
				"Engenho_da_Rede_Carnívora_8986.png",
				"Engrenagem_Musgosa_7065.png",
				"Enguiçalho_Marshico_1059.png",
				"Espreitador_Musgoso_6731.png",
				"Golem_de_Semente_Primitiva_2324.png",
				"Larva_das_Copas_7385.png",
				"Mutante_do_Subbosque_4351.png",
				"Orador_das_Raízes_Profundas_9534.png",
				"Oráculo_das_Entranhas_Terrestres_8774.png",
				"Pavor_das_Raízes_Negadas_3908.png",
				"Profeta_da_Semente_Eterna_4317.png",
				"Protoforma_de_Musgo_Vivo_4165.png",
				"Semeador_de_Esporos_5769.png",
				"Serpente_do_Subcaule_5485.png",
				"Sussurrante_do_Ventre_Selvagem_4966.png",
				"Sáurio_das_Marés_Silvestres_8961.png",
				"Terror_das_Poças_Profundas_2227.png",
				"Titã_de_Cipó_e_Pedra_5030.png",


			]
		}
		
	];

    // Processamento das cartas por categoria
    for (const category of cardCategories) {
        // Adiciona o divisor de categoria
        const divider = document.createElement('div');
        divider.className = 'category-divider';
        divider.innerHTML = `<span>${category.name}</span>`;
        cardContainer.appendChild(divider);

        // Adiciona as cartas da categoria
        for (const image of category.cards) {
            const imagePath = `cards/${image}`;
            const exists = await checkImage(imagePath);
            
            const card = document.createElement('div');
            card.className = 'card';
            
            if (exists) {
                const img = document.createElement('img');
                img.src = encodeURI(imagePath);
                img.alt = formatName(image);
                card.appendChild(img);

                // Sistema de zoom melhorado
				img.addEventListener('click', function(e) {
					e.stopPropagation();
					
					const zoomedImg = this;
					const overlay = document.querySelector('.zoom-overlay');
					
					if (zoomedImg.classList.contains('zoomed')) {
						// Remove zoom
						zoomedImg.classList.remove('zoomed');
						document.body.classList.remove('zoom-active');
						overlay.style.display = 'none';
					} else {
						// Remove zoom de outras cartas
						document.querySelectorAll('.card img.zoomed').forEach(el => {
							el.classList.remove('zoomed');
						});
						
						// Aplica zoom (primeiro mostra o overlay, depois a imagem)
						document.body.classList.add('zoom-active');
						overlay.style.display = 'block';
						zoomedImg.classList.add('zoomed');
						
						// Remove event listener antigo para evitar duplicação
						overlay.onclick = null;
						// Fechar ao clicar no overlay
						overlay.addEventListener('click', function() {
							zoomedImg.classList.remove('zoomed');
							document.body.classList.remove('zoom-active');
							overlay.style.display = 'none';
						});
					}
				});
            } else {
                card.innerHTML = `
                    <div class="error-card">
                        <p>Arquivo existente mas não carregado:</p>
                        <strong>${image}</strong>
                        <p>Verifique:</p>
                        <ul>
                            <li>Caminho: ${imagePath}</li>
                            <li>Extensão exata</li>
                            <li>Caracteres especiais</li>
                        </ul>
                    </div>
                `;
            }
            
            cardContainer.appendChild(card);
        }
    }

    // Contador de visitas
	function initVisitCounter() {
		const visitCounter = document.getElementById('visit-counter');
		const resetButton = document.getElementById('reset-counter');
		
		if (!visitCounter || !resetButton) {
			console.warn('Elementos do contador não encontrados');
			return;
		}
	
		if (!localStorage.getItem('pageVisits')) {
			localStorage.setItem('pageVisits', '0');
		}
		
		updateCounterDisplay();
		
		resetButton.addEventListener('click', () => {
			if (confirm('Resetar contador?')) {
				localStorage.setItem('pageVisits', '0');
				updateCounterDisplay();
			}
		});
	
		// Atalho Admin (Shift+Alt+A)
		document.addEventListener('keydown', (e) => {
			if (e.shiftKey && e.altKey && e.key === 'a') {
				document.body.classList.toggle('admin-mode');
				resetButton.style.display = document.body.classList.contains('admin-mode') 
					? 'block' 
					: 'none';
			}
		});
	}
	
	function updateCounterDisplay() {
		const counterElement = document.getElementById('visit-counter');
		if (!counterElement) return;
		
		const visits = parseInt(localStorage.getItem('pageVisits')) + 1;
		localStorage.setItem('pageVisits', visits.toString());
		counterElement.textContent = visits;
	}
	
	// Inicialização segura
	document.addEventListener('DOMContentLoaded', () => {
		initVisitCounter();
});})

// Adicione no final do seu script.js
console.log('Conteúdo da aba Cartas:', document.getElementById('cartas').innerHTML);
console.log('Conteúdo da aba Regras:', document.getElementById('tabuleiro').innerHTML);