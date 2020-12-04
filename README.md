# Recuperação de senha

**RF(REQUISITOS FUNCIONAIS)**

- Usuário deve poder recuperar sua senha informando o seu email;
- Usuário deve receber email com instruções de recuperação de senha;
- Usuário deve poder resetar sua senha.

**RNF (REQUISITOS NÃO FUNCIONAIS)**

- Utilizar mailtrap para ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (background job).

**RN (REGRAS DE NEGÓCIO)**

- Link enviado por email para restar senha deve expirar em 2h;
- Usuário precisa confirmar a nova senha no momento do reset;


# Atualização do perfil


**RF(REQUISITOS FUNCIONAIS)**

- Usuário deve poder atualizar nome, email, senha e imagem.


**RN (REGRAS DE NEGÓCIO)**

- Usuário não pode alterar seu email para email já utilizado;
- Para atualizar senha, usuário deve inserir a senha antiga;
- Para atualizar senha, usuário deve confirmar a nova senha.

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- Usuário deve poder listar todos prestadores de serviço cadastrados;
- Usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- Usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- Usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Os agendamentos devem estar disponíveis entre 8h e 18h (Primeiro às 8h, último às 17h);
- Usuário não pode agendar em um horário que já passou;
- Usuário não pode agendar serviços consigo mesmo;
- Cada agendamento deve durar 1h exatamente;
- Usuário não pode agendar em um horário já ocupado;
