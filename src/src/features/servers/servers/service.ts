import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {serverFromDTO, serversPagedFromDTO, serverToDTO} from "@app/features/servers/servers/converters";
import {IServerInDTO, IServersPagedResponseDTO} from "@app/features/servers/servers/dto";
import {IServer, IServersPaged} from "@app/features/servers/servers/models";

export const ServersService = {
    async search(req?: ListResourceParams): Promise<IServersPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<IServersPagedResponseDTO>(
            `/servers/search`, params
        );

        return serversPagedFromDTO(response.data);
    },

    async get(id: string): Promise<IServer> {
        const response = await getApi().get<IServerInDTO>(`/servers/${id}`);
        return serverFromDTO(response.data);
    },

    async create(payload: Omit<IServer, "id">): Promise<IServer> {
        const dtoPayload = serverToDTO(payload as IServer);
        const response = await getApi().post<IServerInDTO>(`/servers`, dtoPayload);
        return serverFromDTO(response.data);
    },

    async update(id: string, payload: Partial<IServer>): Promise<IServer> {
        const dtoPayload = serverToDTO(payload as IServer);
        const response = await getApi().put<IServerInDTO>(`/servers/${id}`, dtoPayload);
        return serverFromDTO(response.data);
    },

    async remove(id: string): Promise<void> {
        await getApi().delete(`/servers/${id}`);
    },
};