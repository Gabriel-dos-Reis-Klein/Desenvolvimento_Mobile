## Requisitos Funcionais

Gerenciar: conjunto de operações que inclui cadastrar, visualizar, editar e excluir (CRUD).

|ID|Título|Descrição|
|-|-|-|
|RF01|Gerenciar pedidos|O sistema deve permitir gerenciar pedidos, contendo: cliente do pedido, tipo de pedido, status de pedido, quantidade de peças, descrição, modelo, data de prova, data de entrega e preço|
|RF02|Alternar status do pedido|O sistema deve permitir alterar o status dos pedidos entre: em produção, pronto e entregue|
|RF03|Gerenciar clientes|O sistema deve permitir gerenciar clientes, contendo: nome, telefone, e-mail|
|RF04|Agenda de pedidos|O sistema deve exibir uma agenda com as datas de início, prova e entrega dos pedidos|
|RF05|Gerenciar usuários|O sistema deve permitir gerenciar os usuários do sistema, contendo: nome, telefone, e-mail e senha|
|RF06|Redefinir senha de exclusão|O sistema deve permitir alterar a senha de exclusão|
|RF07|Filtragem de pedidos|O sistema deve permitir filtrar pedidos por tipo|
|RF08|Anexar modelos|O sistema deve permitir ao usuário anexar modelos enviados pelo cliente|
|RF09|Validação de entrada de dados|O sistema deve validar dados fornecido pelo usuário|

**Observação:**

Se o sistema tiver apenas um tipo de usuário, vale trocar o "O sistema deve permitir gerenciar usuários" por "O sistema deve permitir visualizar e editar os dados do usuário".

## Regras de Negócio

|ID|Título|Descrição|
|-|-|-|
|RN01|Especificação de costura|Todo pedido deve ser classificado como: confecção, reparo ou modificação|
|RN02|Confirmação de exclusão|A exclusão de pedidos e clientes deve exigir a senha de exclusão|
|RN03|Vincular pedido a um cliente|Todo pedido deve estar vinculado a um cliente|



