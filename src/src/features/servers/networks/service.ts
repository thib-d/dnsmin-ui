import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {networkFromDTO, networksPagedFromDTO, networkToDTO} from "@app/features/servers/networks/converters";
import {IServerNetworkInDTO, IServerNetworksPagedResponseDTO} from "@app/features/servers/networks/dto";
import {IServerNetwork, IServerNetworksPaged} from "@app/features/servers/networks/models";

export const ServerNetworksService = {
    async search(serverId: string, req?: ListResourceParams): Promise<IServerNetworksPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<IServerNetworksPagedResponseDTO>(
            `/servers/${serverId}/networks/search`, params
        );

        return networksPagedFromDTO(response.data);
    },

    async get(serverId: string, id: string): Promise<IServerNetwork> {
        const response = await getApi().get<IServerNetworkInDTO>(`/servers/${serverId}/networks/${id}`);
        return networkFromDTO(response.data);
    },

    async create(serverId: string, payload: Omit<IServerNetwork, "id">): Promise<IServerNetwork> {
        const dtoPayload = networkToDTO(payload as IServerNetwork);
        const response = await getApi().post<IServerNetworkInDTO>(`/servers/${serverId}/networks`, dtoPayload);
        return networkFromDTO(response.data);
    },

    async update(serverId: string, id: string, payload: Partial<IServerNetwork>): Promise<IServerNetwork> {
        const dtoPayload = networkToDTO(payload as IServerNetwork);
        const response = await getApi().put<IServerNetworkInDTO>(`/servers/${serverId}/networks/${id}`, dtoPayload);
        return networkFromDTO(response.data);
    },

    async remove(serverId: string, id: string): Promise<void> {
        await getApi().delete(`/servers/${serverId}/networks/${id}`);
    },
};