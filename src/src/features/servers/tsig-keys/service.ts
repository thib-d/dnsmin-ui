import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {tsigKeyFromDTO, tsigKeysPagedFromDTO, tsigKeyToDTO} from "@app/features/servers/tsig-keys/converters";
import {IServerTsigKeyInDTO, IServerTsigKeysPagedResponseDTO} from "@app/features/servers/tsig-keys/dto";
import {IServerTsigKey, IServerTsigKeysPaged} from "@app/features/servers/tsig-keys/models";

export const ServerTsigKeysService = {
    async search(serverId: string, req?: ListResourceParams): Promise<IServerTsigKeysPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<IServerTsigKeysPagedResponseDTO>(
            `/servers/${serverId}/tsig-keys/search`, params
        );

        return tsigKeysPagedFromDTO(response.data);
    },

    async get(serverId: string, id: string): Promise<IServerTsigKey> {
        const response = await getApi().get<IServerTsigKeyInDTO>(`/servers/${serverId}/tsig-keys/${id}`);
        return tsigKeyFromDTO(response.data);
    },

    async create(serverId: string, payload: Omit<IServerTsigKey, "id">): Promise<IServerTsigKey> {
        const dtoPayload = tsigKeyToDTO(payload as IServerTsigKey);
        const response = await getApi().post<IServerTsigKeyInDTO>(`/servers/${serverId}/tsig-keys`, dtoPayload);
        return tsigKeyFromDTO(response.data);
    },

    async update(serverId: string, id: string, payload: Partial<IServerTsigKey>): Promise<IServerTsigKey> {
        const dtoPayload = tsigKeyToDTO(payload as IServerTsigKey);
        const response = await getApi().put<IServerTsigKeyInDTO>(`/servers/${serverId}/tsig-keys/${id}`, dtoPayload);
        return tsigKeyFromDTO(response.data);
    },

    async remove(serverId: string, id: string): Promise<void> {
        await getApi().delete(`/servers/${serverId}/tsig-keys/${id}`);
    },
};