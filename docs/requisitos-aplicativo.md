## Requisitos Funcionais

> [!NOTE]
> **Gerenciar:** conjunto de operações que inclui cadastrar, visualizar, editar e excluir (CRUD).

|ID|Título|Descrição|
|-|-|-|
|RF01|Gerenciar pedidos|O sistema deve permitir gerenciar pedidos, contendo: cliente do pedido, tipo de pedido, status de pedido, quantidade de peças, descrição, modelo (anexo fornecido pelo cliente), data de prova, data de entrega, orçamento, pagamento antecipado, saldo e tipo de pagamento|
|RF02|Alternar status do pedido|O sistema deve permitir alterar o status dos pedidos entre: em produção, pronto e entregue|
|RF03|Gerenciar clientes|O sistema deve permitir gerenciar clientes, contendo: nome, telefone, e-mail e outro (forma de contato genérica)|
|RF04|Agenda de pedidos|O sistema deve exibir uma agenda com as datas de início, prova e entrega dos pedidos|
|RF05|Gerenciar usuários|O sistema deve permitir gerenciar os usuários do sistema, contendo: nome, telefone, e-mail, senha e senha de exclusão|
|RF06|Filtragem de pedidos|O sistema deve permitir filtrar pedidos por tipo|
|RF07|Anexar modelos|O sistema deve permitir ao usuário anexar modelos enviados pelo cliente|
|RF08|Validação de entrada de dados|O sistema deve validar dados fornecido pelo usuário|

<!-- Observações
- Para excluir/desativar uma entidade é necessário também excluir/desativar as demais entidades que dependem dela.

- Talvez, um pedido possa ter mais de um tipo de pagamento. Quem sabe algo parcelado ou com múltiplos pagamentos antecipados, com diferentes tipos de pagamento.
-->

> [!NOTE]
> Se o sistema tiver apenas um tipo de usuário, vale trocar o "O sistema deve permitir gerenciar usuários" por "O sistema deve permitir visualizar e editar os dados do usuário".

## Regras de Negócio

|ID|Título|Descrição|
|-|-|-|
|RN01|Especificação de costura|Todo pedido deve ser classificado como: confecção, reparo ou modificação|
|RN02|Confirmação de exclusão|A exclusão ou desativação de entidades deve exigir a senha de exclusão do usuário|
