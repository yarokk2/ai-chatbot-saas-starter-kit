export type UserRole = "admin" | "member" | "viewer";

export const ROLE_PERMISSIONS = {
  admin: [
    "dashboard",
    "conversations",
    "chat",
    "files",
    "billing",
    "analytics",
    "settings",
    "teams",
    "templates",
    "agents",
    "knowledge-base",
    "audit-logs",
  ],

  member: [
    "dashboard",
    "conversations",
    "chat",
    "files",
    "analytics",
    "templates",
    "agents",
    "knowledge-base",
    "audit-logs",
  ],

  viewer: [
    "dashboard",
    "conversations",
    "chat",
    "files",
    "analytics",
  ],
} as const;

/**
 * Проверяет, есть ли у роли доступ к указанному ресурсу.
 */
export function hasPermission(
  role: UserRole,
  resource: string
): boolean {
  const permissions = ROLE_PERMISSIONS[role] ?? [];
  return permissions.includes(resource as never);
}

/**
 * Роль по умолчанию для demo-версии.
 * Позже здесь можно читать роль из Clerk Organization membership.
 */
export function getCurrentUserRole(): UserRole {
  return "admin";
}