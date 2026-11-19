import { http } from "./http";

export type ChannelMapping = { id: string; productId: string; channel: string; shop: string; listingId: string; variantId: string; version: number; effectiveAt: string; status: "ACTIVE" | "INACTIVE"; snapshot?: string };
export type ImportBatch = { id: string; fileName: string; sourceScope: string; checksum: string; createdAt: string; status: "COMPLETED" | "COMPLETED_WITH_ERRORS"; createdCount: number; updatedCount: number; errorCount: number };
export type PIMException = { id: string; productId: string; owner: string; dueAt: string; reason: string; evidence: string; action: string; status: "OPEN" | "RESOLVED" | "IGNORED"; verifiedOutcome: string | null };
export type ExportJob = { id: string; channel: string; shop: string; productId: string; status: "EXPORTED" | "BLOCKED"; evidence: string; createdAt: string };
export type FieldOwner = { id: string; field: string; ownerRole: string; allowedRoles: string[]; sourceSystems: string[] };
export type AuditLog = { id: string; productId: string; author: string; occurredAt: string; version: number; modified: string[]; reason: string };

const list = <T>(path: string) => http.get<T[]>(path).then(response => response.data);

export const pimService = {
  mappings: (productId: string) => list<ChannelMapping>(`/channelMappings?productId=${encodeURIComponent(productId)}`),
  allMappings: () => list<ChannelMapping>("/channelMappings"),
  addMapping: (mapping: Omit<ChannelMapping, "id">) => http.post<ChannelMapping>("/channelMappings", mapping).then(response => response.data),
  updateMapping: (id: string, patch: Partial<ChannelMapping>) => http.patch<ChannelMapping>(`/channelMappings/${id}`, patch).then(response => response.data),
  imports: () => list<ImportBatch>("/importBatches"),
  addImport: (batch: Omit<ImportBatch, "id">) => http.post<ImportBatch>("/importBatches", batch).then(response => response.data),
  exceptions: () => list<PIMException>("/exceptions"),
  addException: (exception: Omit<PIMException, "id">) => http.post<PIMException>("/exceptions", exception).then(response => response.data),
  updateException: (id: string, patch: Partial<PIMException>) => http.patch<PIMException>(`/exceptions/${id}`, patch).then(response => response.data),
  exports: () => list<ExportJob>("/exportJobs"),
  addExport: (job: Omit<ExportJob, "id">) => http.post<ExportJob>("/exportJobs", job).then(response => response.data),
  owners: () => list<FieldOwner>("/fieldOwners"),
  audits: () => list<AuditLog>("/auditLogs"),
  addAudit: (log: Omit<AuditLog, "id">) => http.post<AuditLog>("/auditLogs", log).then(response => response.data),
};
