import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {tenantFromDTO, tenantsPagedFromDTO, tenantToDTO} from "@app/features/tenants/tenants/converters";
import {ITenantInDTO, ITenantsPagedResponseDTO} from "@app/features/tenants/tenants/dto";
import {ITenant, ITenantsPaged} from "@app/features/tenants/tenants/models";

export const TenantsService = {
    async search(req?: ListResourceParams): Promise<ITenantsPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<ITenantsPagedResponseDTO>(
            "/tenants/search", params
        );

        return tenantsPagedFromDTO(response.data);
    },

    async get(id: string): Promise<ITenant> {
        const response = await getApi().get<ITenantInDTO>(`/tenants/${id}`);
        return tenantFromDTO(response.data);
    },

    async create(payload: Omit<ITenant, "id">): Promise<ITenant> {
        const dtoPayload = tenantToDTO(payload as ITenant);
        const response = await getApi().post<ITenantInDTO>("/tenants", dtoPayload);
        return tenantFromDTO(response.data);
    },

    async update(id: string, payload: Partial<ITenant>): Promise<ITenant> {
        const dtoPayload = tenantToDTO(payload as ITenant);
        const response = await getApi().put<ITenantInDTO>(`/tenants/${id}`, dtoPayload);
        return tenantFromDTO(response.data);
    },

    async remove(id: string): Promise<void> {
        await getApi().delete(`/tenants/${id}`);
    },
};