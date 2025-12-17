import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {userFromDTO, usersPagedFromDTO, userToDTO} from "@app/features/auth/users/converters";
import {IUserInDTO, IUsersPagedResponseDTO} from "@app/features/auth/users/dto";
import {IUser, IUsersPaged} from "@app/features/auth/users/models";

export const AuthUsersService = {
    async search(req?: ListResourceParams): Promise<IUsersPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<IUsersPagedResponseDTO>(
            "/auth/users/search", params
        );

        return usersPagedFromDTO(response.data);
    },

    async get(id: string): Promise<IUser> {
        const response = await getApi().get<IUserInDTO>(`/auth/users/${id}`);
        return userFromDTO(response.data);
    },

    async create(payload: Omit<IUser, "id">): Promise<IUser> {
        const dtoPayload = userToDTO(payload as IUser);
        const response = await getApi().post<IUserInDTO>("/auth/users", dtoPayload);
        return userFromDTO(response.data);
    },

    async update(id: string, payload: Partial<IUser>): Promise<IUser> {
        const dtoPayload = userToDTO(payload as IUser);
        const response = await getApi().put<IUserInDTO>(`/auth/users/${id}`, dtoPayload);
        return userFromDTO(response.data);
    },

    async remove(id: string): Promise<void> {
        await getApi().delete(`/auth/users/${id}`);
    },
};