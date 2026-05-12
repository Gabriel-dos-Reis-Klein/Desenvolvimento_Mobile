## Requisitos Funcionais

> [!NOTE]
> **Gerenciar:** conjunto de operações que inclui cadastrar, visualizar, editar e excluir (CRUD).

|ID|Título|Descrição|
|-|-|-|
|RF01|Gerenciar pedidos|O sistema deve permitir gerenciar pedidos, contendo: título do pedido, cliente do pedido, tipo de pedido, status de pedido, quantidade de peças, descrição, modelo (anexo fornecido pelo cliente), data de prova, data de entrega, orçamento, pagamento antecipado, saldo e tipo de pagamento|
|RF02|Alternar status do pedido|O sistema deve permitir alterar o status dos pedidos entre: em produção, pronto e entregue|
|RF03|Gerenciar clientes|O sistema deve permitir gerenciar clientes, contendo: nome, telefone, e-mail e outro (forma de contato genérica)|
|RF04|Agenda de pedidos|O sistema deve exibir uma agenda com as datas de início, prova e entrega dos pedidos|
|RF05|Gerenciar usuários|O sistema deve permitir gerenciar os usuários do sistema, contendo: nome, telefone, e-mail, senha e senha de exclusão|
|RF06|Filtragem de pedidos|O sistema deve permitir filtrar pedidos por tipo|
|RF07|Anexar modelos|O sistema deve permitir ao usuário anexar modelos enviados pelo cliente|
|RF08|Validação de entrada de dados|O sistema deve validar dados fornecido pelo usuário|
|RF09|Enviar código de confirmação|O sistema deve enviar um código de verificação para validar a identidade do usuário antes de permitir a alteração de sua senha, caso ele ainda não esteja autenticado. O código deve ser enviado via e-mail ou número de telefone cadastrado|
|RF10|Desenvolver relatório|O sistema deve gerar relatório mensal de pagamentos|

<!-- Observações
- Para excluir/desativar uma entidade é necessário também excluir/desativar as demais entidades que dependem dela.

- Talvez, um pedido possa ter mais de um tipo de pagamento. Quem sabe algo parcelado ou com múltiplos pagamentos antecipados, com diferentes tipos de pagamento.

- Precisaria armazenar comprovantes de pagamento?
-->

## Requisitos Não Funcionais

|ID|Título|Descrição|
|-|-|-|
|RNF01|Critérios de senha|A senha deve ter no mínimo 8 caracteres, devendo conter: letras maiúsculas, minúsculas, caracteres especiais e números|

> [!NOTE]
> Se o sistema tiver apenas um tipo de usuário, vale trocar o "O sistema deve permitir gerenciar usuários" por "O sistema deve permitir visualizar e editar os dados do usuário".

## Regras de Negócio

|ID|Título|Descrição|
|-|-|-|
|RN01|Especificação de costura|Todo pedido deve ser classificado como: confecção, reparo ou modificação|
|RN02|Confirmação de exclusão|A exclusão ou desativação de entidades deve exigir a senha de exclusão do usuário|
