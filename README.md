# O desafio

Crie um microsserviço em node capaz de aceitar solicitações RESTful que recebam como parâmetro o nome da cidade ou as coordenadas (*latitude e longitude*) e retorne uma sugestão de playlist (*apenas nomes da músicas*) de acordo com a temperatura atual.


## Requisitos

1. Se a temperatura (*celsius*) estiver acima de 30 graus, as músicas sugeridas serão para festas
2. Caso a temperatura esteja entre 15 e 30 graus, sugira faixas de música pop
3. Se estiver um pouco frio (entre 10 e 14 graus), sugira faixas de rock
4. Caso contrário, se estiver frio lá fora, proponha músicas clássicas

## Requisitos não funcionais

- Como este serviço será um sucesso mundial, ele deve estar preparado para ser tolerante a falhas, responsivo e resiliente.

- Use qualquer ferramenta e estrutura com as quais se sinta confortável e elabore brevemente sua solução, detalhes de arquitetura, escolha de padrões e estruturas.

- Além disso, facilite a implantação/execução de seus serviços localmente (*considere usar alguma solução de container/VM para isso*). 


- Usado a API do *[OpenWeatherMaps](https://openweathermap.org)* para buscar dados de temperatura e o *[Spotify](https://developer.spotify.com/)* para sugerir as músicas da playlist.
