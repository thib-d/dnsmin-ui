import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {policyFromDTO, policiesPagedFromDTO, policyToDTO} from "@app/features/acl/policies/converters";
import {IAclPolicyInDTO, IAclPoliciesPagedResponseDTO} from "@app/features/acl/policies/dto";
import {IAclPolicy, IAclPoliciesPaged} from "@app/features/acl/policies/models";

export const AclPoliciesService = {
    async list(req?: ListResourceParams): Promise<IAclPoliciesPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<IAclPoliciesPagedResponseDTO>(
            "/acl/policies", params
        );

        return policiesPagedFromDTO(response.data);
    },

    async get(id: string): Promise<IAclPolicy> {
        const response = await getApi().get<IAclPolicyInDTO>(`/acl/policies/${id}`);
        return policyFromDTO(response.data);
    },

    async create(payload: Omit<IAclPolicy, "id">): Promise<IAclPolicy> {
        const dtoPayload = policyToDTO(payload as IAclPolicy);
        const response = await getApi().post<IAclPolicyInDTO>("/acl/policies/create", dtoPayload);
        return policyFromDTO(response.data);
    },

    async update(id: string, payload: Partial<IAclPolicy>): Promise<IAclPolicy> {
        const dtoPayload = policyToDTO(payload as IAclPolicy);
        const response = await getApi().put<IAclPolicyInDTO>(`/acl/policies/${id}`, dtoPayload);
        return policyFromDTO(response.data);
    },

    async remove(id: string): Promise<void> {
        await getApi().delete(`/acl/policies/${id}`);
    },
};