# MVP

## Autenticacão
- [ ] Login (Lucas)
    - [ ] autenticar usuário com e-mail e senha
- [ ] Cadastro (Luiz)
    - [ ] validar e cadastrar novo usuário

## Pedidos
- [ ] Mostrar pedidos (Gabriel)
    - [ ] Filtragem
        - [ ] mostrar todos os pedidos
        - [ ] mostrar pedidos por título
        - [ ] mostrar pedidos por categoria (confecção, reparo ou modificação)
        - [ ] mostrar pedidos por estado (em produção, pronto e entregue)
    - [ ] Ordenação
        - [ ] títulos em ordem alfabética
        - [ ] datas de prazo mais próximas
        - [ ] por nome de cliente
- [ ] Criar pedidos (Igor)
    - [ ] validar e cadastrar novo pedido
- [ ] Mostrar detalhes do pedido (Luiz)
    - [ ] mostrar todos os campo de pedido por id
    - [ ] deletar pedido por id
    - [ ] alterar dados de um pedido

**OBS1.:** recomendo o uso de DTOs e a filtragem e ordenação de pedidos por meio de _paramns_

**OBS2.:** também recomendo uso do verbo PATCH para requisições de edições de dados

## Clientes
- [ ] Mostrar clientes (Gabriel)
    - [ ] Filtragem
        - [ ] mostrar todos os clientes
        - [ ] mostrar clientes por nome ou telefone
    - [ ] Ordenação
        - [ ] nomes em ordem alfabética
        - [ ] por data de registro decrescente (do mais novo ao mais velho)
- [ ] Criar clientes (Igor)
    - [ ] validar e cadastrar novo cliente
- [ ] Mostrar detalhes do cliente (Lucas)
    - [ ] mostrar todos os campo de cliente por id
    - [ ] deletar cliente por id
    - [ ] alterar dados de um cliente

## Configuração
- [ ] Mostrar usuário (Lucas)
    - [ ] mostrar dados de usuário, com exceção da senha
    - [ ] alterar dados de usuário, com exceção da senha
    - [ ] alterar senha de usuário

# Adicional

## Autenticacão
- Validação
    - enviar código de validação via e-mail
    - validar código enviado pelo usuário
- Trocar senha
    - alterar senha de usuário

## Clientes
- Mostrar pedidos relacionados ao cliente em específico
    - Mostrar pedidos vinculados ao um cliente


## Análise
- Mostrar análises estatíticas com dados de pedidos e clientes
    - Mostrar orçamento total de valores pagos referentes a pedidos mensalmente (incluso valores pagos antecipadamente)
    - Mostrar a quantidade de pedidos separados entre entregue e não entregue

## Agenda
- Mostrar agenda com datas de prova, prazo e entrega de pedidos
    - Mostrar pedidos com datas de prova, prazo ou entrega num determinado mês