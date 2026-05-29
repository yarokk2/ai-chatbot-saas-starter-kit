import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Создаём Redis клиент.
 *
 * Upstash предоставляет serverless Redis, идеально подходящий для Next.js и Vercel.
 * URL и TOKEN будут храниться в .env.local.
 */
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * Основной rate limiter.
 *
 * Ограничение: 20 запросов в день на одного пользователя.
 * Ключом может быть userId, tenantId или IP-адрес.
 */
export const rateLimit = new Ratelimit({
  redis,

  /**
   * slidingWindow(20, "1 d")
   *
   * Позволяет выполнить максимум 20 запросов в течение последних 24 часов.
   * Это более гибкий и справедливый алгоритм, чем простой fixed window.
   */
  limiter: Ratelimit.slidingWindow(9999, "1 d"),

  /**
   * Включает локальное кэширование результатов,
   * что уменьшает количество запросов к Redis
   * и повышает производительность.
   */
  analytics: true,

  /**
   * Добавляет префикс к ключам в Redis.
   * Это помогает организовать данные и избегать конфликтов.
   */
  prefix: "ai-chatbot",
});

/**
 * Проверяет, разрешён ли запрос для конкретного идентификатора.
 *
 * @param identifier userId, tenantId или IP-адрес
 * @returns результат проверки с полями success, limit, remaining и reset
 */
export async function checkRateLimit(identifier: string) {
  return await rateLimit.limit(identifier);
}