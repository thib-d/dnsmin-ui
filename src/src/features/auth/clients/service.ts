import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {clientFromDTO, clientsPagedFromDTO, clientToDTO} from "@app/features/auth/clients/converters";
import {IClientInDTO, IClientsPagedResponseDTO} from "@app/features/auth/clients/dto";
import {IClient, IClientsPaged} from "@app/features/auth/clients/models";

export const AuthClientsService = {
    async search(req?: ListResourceParams): Promise<IClientsPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<IClientsPagedResponseDTO>(
            "/auth/clients/search", params
        );

        return clientsPagedFromDTO(response.data);
    },

    async get(id: string): Promise<IClient> {
        const response = await getApi().get<IClientInDTO>(`/auth/clients/${id}`);
        return clientFromDTO(response.data);
    },

    async create(payload: Omit<IClient, "id">): Promise<IClient> {
        const dtoPayload = clientToDTO(payload as IClient);
        const response = await getApi().post<IClientInDTO>("/auth/clients", dtoPayload);
        return clientFromDTO(response.data);
    },

    async update(id: string, payload: Partial<IClient>): Promise<IClient> {
        const dtoPayload = clientToDTO(payload as IClient);
        const response = await getApi().put<IClientInDTO>(`/auth/clients/${id}`, dtoPayload);
        return clientFromDTO(response.data);
    },

    async remove(id: string): Promise<void> {
        await getApi().delete(`/auth/clients/${id}`);
    },
};