import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {roleFromDTO, rolesPagedFromDTO, roleToDTO} from "@app/features/acl/roles/converters";
import {IAclRoleInDTO, IAclRolesPagedResponseDTO} from "@app/features/acl/roles/dto";
import {IAclRole, IAclRolesPaged} from "@app/features/acl/roles/models";

export const AclRolesService = {
    async list(req?: ListResourceParams): Promise<IAclRolesPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<IAclRolesPagedResponseDTO>(
            "/acl/roles", params
        );

        return rolesPagedFromDTO(response.data);
    },

    async get(id: string): Promise<IAclRole> {
        const response = await getApi().get<IAclRoleInDTO>(`/acl/roles/${id}`);
        return roleFromDTO(response.data);
    },

    async create(payload: Omit<IAclRole, "id">): Promise<IAclRole> {
        const dtoPayload = roleToDTO(payload as IAclRole);
        const response = await getApi().post<IAclRoleInDTO>("/acl/roles/create", dtoPayload);
        return roleFromDTO(response.data);
    },

    async update(id: string, payload: Partial<IAclRole>): Promise<IAclRole> {
        const dtoPayload = roleToDTO(payload as IAclRole);
        const response = await getApi().put<IAclRoleInDTO>(`/acl/roles/${id}`, dtoPayload);
        return roleFromDTO(response.data);
    },

    async remove(id: string): Promise<void> {
        await getApi().delete(`/acl/roles/${id}`);
    },
};