## Requisitos Funcionais

> [!NOTE]
> **Gerenciar:** conjunto de operações que inclui cadastrar, visualizar, editar e excluir (CRUD).

|ID|Título|Descrição|
|-|-|-|
|RF01|Gerenciar pedidos|O sistema deve permitir gerenciar pedidos, contendo: título do pedido, cliente do pedido, tipo de pedido, status de pedido, quantidade de peças, descrição, modelo (anexo fornecido pelo cliente), data de prova, data de entrega, data de prazo, orçamento, pagamento antecipado, saldo e tipo de pagamento|
|RF02|Filtragem de pedidos|O sistema deve permitir filtrar pedidos por status (em produção, pronto e entregue), tipo (confecção, reparo ou modificação) ou título|
|RF03|Gerenciar clientes|O sistema deve permitir gerenciar clientes, contendo: nome, telefone, descrição|
|RF04|Agenda de pedidos|O sistema deve exibir uma agenda com pedidos que possuam uma data de prova, prazo ou entrega num determinado mês|
|RF05|Gerenciar usuários|O sistema deve permitir criar, editar e mostrar dados dos usuários do sistema, contendo: nome, e-mail, senha|
|RF06|Ordenação de pedidos|O sistema deve permitir ordenar pedidos por títulos em ordem alfabética, datas de prazo mais próximas ou por nome de cliente|
|RF07|Filtragem de clientes|O sistema deve permitir filtrar clientes por nome ou telefone|
|RF08|Ordenação de clientes|O sistema deve permitir ordenar clientes por nomes em ordem alfabética ou por data de registro decrescente|
|RF09|Anexar modelos|O sistema deve permitir ao usuário anexar modelos (imagens) enviados pelo cliente|
|RF10|Enviar código de confirmação|O sistema deve enviar um código de verificação para validar a identidade do usuário antes de permitir a alteração de sua senha, caso ele ainda não esteja autenticado. O código deve ser enviado via e-mail|
|RF11|Desenvolver relatório|O sistema deve gerar relatório mensal de pagamentos e pedidos separados entre entregue e não entregue|

<!-- Observações
- Para excluir/desativar uma entidade é necessário também excluir/desativar as demais entidades que dependem dela.

- Talvez, um pedido possa ter mais de um tipo de pagamento. Quem sabe algo parcelado ou com múltiplos pagamentos antecipados, com diferentes tipos de pagamento.

- Precisaria armazenar comprovantes de pagamento?
-->

## Requisitos Não Funcionais

|ID|Título|Descrição|
|-|-|-|
|RNF01|Critérios de senha|A senha deve ter no mínimo 8 caracteres, devendo conter: letra maiúscula, minúscula, caracter especial e número|
|RNF02|Confirmação de exclusão|A exclusão de entidades deve exigir a senha do usuário para confirmação|
|RNF03|Unicidade de e-mail|Um e-mail apenas pode estar vinculado a um usuário|

> [!NOTE]
> Se o sistema tiver apenas um tipo de usuário, vale trocar o "O sistema deve permitir gerenciar usuários" por "O sistema deve permitir visualizar e editar os dados do usuário".

## Regras de Negócio

|ID|Título|Descrição|
|-|-|-|
|RN01|Especificação de costura|Todo pedido deve ser classificado como: confecção, reparo ou modificação|
