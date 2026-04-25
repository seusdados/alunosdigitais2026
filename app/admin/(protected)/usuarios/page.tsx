import { listAdminUsers } from "@/lib/db/queries/users";

import { InviteForm } from "./_components/invite-form";
import { UsersTable } from "./_components/users-table";

export default async function UsuariosPage() {
  const users = await listAdminUsers();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Usuários</h1>
        <p className="text-sm text-muted-foreground">
          Gestão de perfis do painel. Atribua papéis e convide novos colaboradores.
        </p>
      </header>

      <InviteForm />
      <UsersTable users={users} />
    </div>
  );
}
