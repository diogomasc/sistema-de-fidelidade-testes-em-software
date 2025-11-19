# Justificativa da Arquitetura do Projeto

## Escolha: Domain-Driven Design (DDD) Simplificado

### Por que DDD?

Este projeto foi estruturado seguindo os princípios do **Domain-Driven Design (DDD)** simplificado, ao invés de MVC, pelas seguintes razões:

1. **Foco em Regras de Negócio**: O sistema de fidelidade é centrado em regras de domínio complexas (cálculo de pontos por tipo de cliente, resgate, expiração, bônus). O DDD prioriza a modelagem do domínio e suas regras.

2. **Encapsulamento de Lógica**: As entidades (`Cliente`, `Carteira`) encapsulam não apenas dados, mas também comportamentos e regras de negócio (ex: calcular pontos, resgatar pontos). Isso é mais alinhado com DDD do que MVC, onde a lógica geralmente fica em controllers.

3. **Repository Pattern**: O padrão Repository, já sugerido no projeto, é uma peça fundamental do DDD, abstraindo a persistência e permitindo que o domínio seja testado independentemente da infraestrutura.

4. **Simplicidade Acadêmica**: Embora DDD possa ser complexo em projetos grandes, aqui foi aplicado de forma simplificada, mantendo apenas:
   - **Entities**: Classes de domínio com lógica de negócio
   - **Repository**: Abstração de persistência (em memória)
   - **Consts**: Valores constantes das regras de negócio

5. **Testabilidade**: DDD facilita a criação de testes unitários focados no domínio, pois as regras de negócio estão encapsuladas nas entidades, não espalhadas em controllers ou services.

### Estrutura de Pastas

```
src/
├── entities/        # Entidades de domínio (Cliente, Carteira)
├── repository/      # Padrão Repository para abstração de persistência
├── consts/          # Constantes globais (tipos de cliente, taxas, etc.)
└── tests/           # Testes unitários organizados por funcionalidade
```

### Por que não MVC?

MVC seria mais adequado se houvesse:
- Interface gráfica (View)
- Controllers para gerenciar requisições HTTP
- Separação entre apresentação e lógica

Como o projeto é focado apenas na camada de negócio, sem interface ou API, MVC adicionaria complexidade desnecessária sem benefícios claros.

### Princípios Aplicados

- **Encapsulamento**: Regras de negócio dentro das entidades
- **Separação de Responsabilidades**: Repository cuida da persistência, Entities do domínio
- **Testabilidade**: Código organizado para facilitar testes unitários
- **Simplicidade**: Estrutura mínima necessária para o escopo acadêmico

