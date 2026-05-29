import { appendFile, mkdir } from "fs/promises";
import path from "path";

export interface AuditLogEntry {
  action: string;
  userId?: string;
  tenantId?: string;
  metadata?: Record<string, unknown>;
  timestamp?: string;
}

const LOGS_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOGS_DIR, "audit.log");

/**
 * Создаёт запись в audit log.
 */
export async function createAuditLog(
  entry: AuditLogEntry
): Promise<void> {
  try {
    // Создаём папку logs, если её нет.
    await mkdir(LOGS_DIR, { recursive: true });

    // Формируем итоговую запись.
    const logEntry = {
      ...entry,
      timestamp:
        entry.timestamp ?? new Date().toISOString(),
    };

    // Каждая запись хранится как отдельная JSON-строка.
    await appendFile(
      LOG_FILE,
      JSON.stringify(logEntry) + "\n",
      "utf8"
    );
  } catch (error) {
    // Логирование никогда не должно ломать приложение.
    console.error("Audit Log Error:", error);
  }
}