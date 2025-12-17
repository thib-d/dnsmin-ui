import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {settingFromDTO, settingsPagedFromDTO, settingToDTO} from "@app/features/settings/converters";
import {ISettingInDTO, ISettingsPagedResponseDTO} from "@app/features/settings/dto";
import {ISetting, ISettingsPaged} from "@app/features/settings/models";

export const SettingsService = {
    async list(req?: ListResourceParams): Promise<ISettingsPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<ISettingsPagedResponseDTO>(
            "/settings", params
        );

        return settingsPagedFromDTO(response.data);
    },

    async get(key: string): Promise<ISetting> {
        const response = await getApi().get<ISettingInDTO>(`/settings/${key}`);
        return settingFromDTO(response.data);
    },

    async create(payload: Omit<ISetting, "id">): Promise<ISetting> {
        const dtoPayload = settingToDTO(payload as ISetting);
        const response = await getApi().post<ISettingInDTO>("/settings/create", dtoPayload);
        return settingFromDTO(response.data);
    },

    async update(key: string, payload: Partial<ISetting>): Promise<ISetting> {
        const dtoPayload = settingToDTO(payload as ISetting);
        const response = await getApi().put<ISettingInDTO>(`/settings/${key}`, dtoPayload);
        return settingFromDTO(response.data);
    },

    async remove(key: string): Promise<void> {
        await getApi().delete(`/settings/${key}`);
    },
};