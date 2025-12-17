import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {sessionFromDTO, sessionsPagedFromDTO} from "@app/features/auth/sessions/converters";
import {ISessionInDTO, ISessionsPagedResponseDTO} from "@app/features/auth/sessions/dto";
import {ISession, ISessionsPaged} from "@app/features/auth/sessions/models";

export const AuthSessionsService = {
    async search(req?: ListResourceParams): Promise<ISessionsPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<ISessionsPagedResponseDTO>(
            "/auth/sessions/search", params
        );

        return sessionsPagedFromDTO(response.data);
    },

    async get(id: string): Promise<ISession> {
        const response = await getApi().get<ISessionInDTO>(`/auth/sessions/${id}`);
        return sessionFromDTO(response.data);
    },

    async remove(id: string): Promise<void> {
        await getApi().delete(`/auth/sessions/${id}`);
    },
};