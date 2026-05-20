import { auth } from "@clerk/nextjs/server";

/**
 * Возвращает текущий organizationId.
 * Если пользователь работает без организации,
 * используется personal workspace.
 */
export async function getCurrentOrganizationId() {
  const { orgId, userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return orgId ?? `personal_${userId}`;
}

/**
 * Создаёт универсальный tenant filter
 * для использования в запросах к базе данных.
 */
export async function getTenantFilter() {
  const organizationId = await getCurrentOrganizationId();

  return {
    organizationId,
  };
}